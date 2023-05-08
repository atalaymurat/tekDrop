const _ = require("lodash")

const calcWorkDimData = (data) => {
  const { works } = data
  works.map((w, i) => {
    // m2 CALCULATION
    if (w.unit === "m2") {
      let sumDim = 0
      let sumQuanty = 0

      w.dimensions.map((d, n) => {
        let dm2 = ((Number(d.length) || 0 ) * (Number(d.width) || 0) ) / 1000000
        totalM2 = dm2 * (Number(d.quanty) || 0)
        sumDim += formNumber(totalM2)
        sumQuanty += Number(d.quanty)
        works[i].dimensions[n].m2 = formNumber(dm2)
        works[i].dimensions[n].tm2 = formNumber(totalM2)
      })
      // Number to float truncate
      let sumDimF3 = formNumber(sumDim)
      works[i].totalUnit = sumDimF3
      works[i].totalQuanty = sumQuanty
      let totalPrice = sumDimF3 * Number(w.price.val)
      works[i].workTotalPrice = {
        val: formPrice(totalPrice),
        cur: w.price.cur,
      }
      return
    }
    // metre/tül CALCULATION
    if (w.unit === "m") {
      let sumM = 0
      let sumQuanty = 0

      w.dimensions.map((d, n) => {
        let dmL = Number(d.length) / 1000
        let tLength = formNumber(dmL * Number(d.quanty))
        sumM += Number(tLength)
        sumQuanty += Number(d.quanty)
        works[i].dimensions[n].tLength = tLength
        // Buraya toplam m2 hesabı sonra ekle
      })
      works[i].totalUnit = formNumber(sumM)
      works[i].totalQuanty = Number(sumQuanty)
      let totalPrice = sumM * Number(w.price.val)
      works[i].workTotalPrice = {
        val: formPrice(totalPrice),
        cur: w.price.cur,
      }
      return
    }
    // adet ve takım CALCULATION
    if (w.unit === "adet" || w.unit === "takım") {
      let sum = 0
      w.dimensions.map((d) => {
        sum += Number(d.quanty)
      })
      works[i].totalUnit = sum
      works[i].totalQuanty = sum
      let totalPrice = sum * Number(w.price.val)
      works[i].workTotalPrice = {
        val: formPrice(totalPrice),
        cur: w.price.cur,
      }
      return
    }
    // End
  })

  calcOfferTotal(data)
  calcDiscount(data)
  calcNetTotalPrice(data)
  calcKDV(data)
  calcGrandTotal(data)
  return data
}

const calcNetTotalPrice = (data) => {
  const { works } = data
  let netTotalTL = 0
  let netTotalUSD = 0
  let netTotalEUR = 0
  netTotalTL = data.offerTotalPrice.TL - data.offerDiscountPrice.TL
  netTotalUSD = data.offerTotalPrice.USD - data.offerDiscountPrice.USD
  netTotalEUR = data.offerTotalPrice.EUR - data.offerDiscountPrice.EUR
  data.offerNetTotalPrice = {
    TL: netTotalTL,
    USD: netTotalUSD,
    EUR: netTotalEUR,
  }
  return
}

const calcKDV = (data) => {
  const { works, kdv } = data
  if (kdv > 0) {
    let kdvTL = 0
    kdvTL = (data.offerNetTotalPrice.TL * kdv) / 100
    data.offerKdvPrice = { TL: formPrice(kdvTL), USD: 0, EUR: 0 }
    return
  }
  data.offerKdvPrice = { TL: 0, USD: 0, EUR: 0 }
  return
}

const calcGrandTotal = (data) => {
  const { offerNetTotalPrice, offerKdvPrice } = data
  let gTotalTL = 0
  let gTotalUSD = 0
  let gTotalEUR = 0

  gTotalTL = Number(offerNetTotalPrice.TL) + offerKdvPrice.TL
  gTotalUSD = offerNetTotalPrice.USD + offerKdvPrice.USD
  gTotalEUR = offerNetTotalPrice.EUR + offerKdvPrice.EUR

  data.offerGrandTotalPrice = {
    TL: formPrice(gTotalTL),
    USD: formPrice(gTotalUSD),
    EUR: formPrice(gTotalEUR),
  }
  return
}

const calcDiscount = (data) => {
  const { works, discount } = data
  let disTL = 0
  let disUSD = 0
  let disEUR = 0
  if (discount > 0) {
    disTL = (Number(data.offerTotalPrice.TL) * discount) / 100
    disUSD = (Number(data.offerTotalPrice.USD) * discount) / 100
    disEUR = (Number(data.offerTotalPrice.EUR) * discount) / 100

    data.offerDiscountPrice = {
      TL: formPrice(disTL),
      USD: formPrice(disUSD),
      EUR: formPrice(disEUR),
    }
    return
  }
  data.offerDiscountPrice = { TL: 0, EUR: 0, USD: 0 }
  return
}

const calcOfferTotal = (data) => {
  const { works } = data
  let sumArray = []
  works.map((w, i) => {
    sumArray.push(w.workTotalPrice)
  })

  const groupTotal = (arr) => {
    let sumTRY = 0
    let sumUSD = 0
    let sumEUR = 0

    arr.forEach((e) => {
      if (e.cur === "TL") {
        sumTRY += Number(e.val)
        return
      }
      if (e.cur === "USD") {
        sumUSD += Number(e.val)
        return
      }
      if (e.cur === "EUR") {
        sumEUR += Number(e.val)
        return
      }
      return
    })
    return {
      TL: sumTRY,
      USD: sumUSD,
      EUR: sumEUR,
    }
  }

  data.offerTotalPrice = groupTotal(sumArray)
  return
}

const formNumber = (number) => {
  let m = Math.trunc(number * 10000) / 10000
  let n = Number(m)
  return n
}
const formPrice = (number) => {
  let m = Math.trunc(number * 100) / 100
  let n = Number(m)
  return n
}

module.exports = { calcWorkDimData }
