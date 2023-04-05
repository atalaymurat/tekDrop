import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { localeDate } from "../../lib/helpers"

function Show() {
  const [offer, setOffer] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`http://localhost:3001/offers/${id}`)
      setOffer(data)
    }
    console.log("Use Effect Work")
    getData()
  }, [id])

  if (!offer) return <div>Loading..</div>

  if (offer)
    return (
      <div className="max-w-4xl mx-auto flex flex-col">
        <h1 className="mx-auto font-extrabold text-xl">Sipariş Formu</h1>
        <div className="ml-auto text-sm">{localeDate(offer.createdAt)}</div>
        <Customer offer={offer} />
        <PriceTable works={offer.works} offer={offer} />
        <Work works={offer.works} />

        <pre className="p-4 my-4 hidden">{JSON.stringify(offer, null, 4)}</pre>
      </div>
    )
}

export default Show

const calcM2 = (en, boy) => {
  let a = (en * boy) / 1000000
  return parseFloat(a).toFixed(3)
}

const calcDimTotalUnit = (unit, dimensions) => {
  switch (unit) {
    case "m2": {
      let total = []
      dimensions.map((d) => {
        let a = calcM2(d.length, d.width)
        let a2 = a * d.quanty
        return total.push(a2)
      })
      let arrTotal = total.reduce((a, b) => a + b, 0).toFixed(2)
      return parseFloat(arrTotal)
    }
    case "m": {
      // code block
      let total = []
      dimensions.map((d) => total.push((d.length / 1000) * d.quanty))
      let arrTotal = total.reduce((a, b) => a + b, 0).toFixed(2)
      return parseFloat(arrTotal)
    }
    case "adet": {
      // code block
      let total = []
      dimensions.map((d) => {
        return total.push(d.quanty)
      })
      let arrTotal = total.reduce((a, b) => a + b, 0).toFixed(2)
      return parseInt(arrTotal)
    }
    default:
      return "Not any Value--"
  }
}

const calcTotalQuanty = (dim) => {
  let total = []
  dim.map((d) => {
    return total.push(d.quanty)
  })
  let arrTotal = total.reduce((a, b) => a + b, 0).toFixed(2)
  return parseInt(arrTotal)
}

const colsData = [
  { title: "Yetkili", text: "" },
  { title: "Email", text: "" },
  { title: "Tel", text: "" },
  { title: "Adres", text: "" },
]

const Work = ({ works }) => {
  if (!works) {
    return <div>Loading...</div>
  }
  return (
    <div>
      {works.map((w, i) => (
        <div
          className="flex flex-col my-10 text-sm"
          key={"works-" + i}
        >
          <div className="grid grid-cols-6 gap-2 content-center bg-stone-100  px-2 border rounded-md shadow-md">
            <div className="border font-semibold">İş Tipi</div>
            <div className="col-span-5 border">{w.typeOfwork}</div>

            <div className="grid grid-cols-2 gap-1 col-span-2">
              <div className="border font-semibold">Renk</div>
              <div className="border">{w.color}</div>
            </div>

            <div className="grid grid-cols-2 gap-1 col-span-2">
              <div className="border font-semibold text-center">Gloss</div>
              <div className="border text-left">{w.gloss}</div>
            </div>

            <div className="grid grid-cols-2 gap-1 col-span-2">
              <div className="border font-semibold text-center">Kalınlık</div>
              <div className="border text-left">{w.thickness}</div>
            </div>
            <Dimensions dimensions={w.dimensions} unit={w.unit} />
            <div className="col-span-6 grid grid-cols-2 gap-1">
              <div></div>
              <div className="grid grid-cols-4 gap-1">
                {w.unit === "adet" ? (
                  <div className="ml-auto grid grid-cols-2 gap-1 col-span-4">
                    <div className="text-sm">Toplam Adet</div>
                    <div className="text-center font-bold">
                      {calcTotalQuanty(w.dimensions)}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="text-sm">Toplam Adet</div>
                    <div className="text-center font-bold">
                      {calcTotalQuanty(w.dimensions)}
                    </div>
                    <div>Toplam</div>
                    <div className="text-center font-bold">
                      {calcDimTotalUnit(w.unit, w.dimensions)}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

const Dimensions = ({ dimensions, unit }) => {
  if (!dimensions || !unit) {
    return <div>Loading Dims or no unit</div>
  }
  return (
    <>
      <div className="grid grid-cols-11 gap-1 col-span-6 bg-stone-500">
        {["No", "Boy", "En", "Adet", "Açıklama", unit, "Toplam"].map((t, i) => (
          <div
            key={"headers-" + i}
            className={`
            ${t === "Açıklama" ? "col-span-3" : null} 
            ${t === "Boy" ? "col-span-2" : null} 
            ${t === "Toplam" ? "text-center" : null} 
            ${t === unit ? "capitalize text-center" : null} 
            ${
              t === "En" ? " col-span-2" : null
            } text-white font-medium px-2 text-sm`}
          >
            {t}
          </div>
        ))}
      </div>

      <div className="col-span-6 text-sm">
        {dimensions.map((dim, i) => {
          return (
            <div className="grid grid-cols-11 gap-1" key={"dim-headers-" + i}>
              {[
                String(i + 1).padStart(2, "0"),
                dim.length,
                dim.width,
                dim.quanty,
                dim.desc,
                unitSel(unit, dim),
                totSel(unit, dim),
              ].map((d, i) => (
                <div
                  key={"dims-" + i}
                  className={`
            ${i === 4 ? "col-span-3 " : null} 
            ${i === 2 ? "col-span-2 " : null} 
            ${i === 5 || i === 6 ? "text-center" : null} 
            ${i === 1 ? " col-span-2" : null}
             border capitalize px-2`}
                >
                  {d}
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </>
  )
}

const unitSel = (unit, dim) => {
  if (unit === "m2") {
    return square(dim)
  }
  if (unit === "m") {
    return meterLen(dim).toFixed(2)
  }
  if (unit === "adet") {
    return dim.quanty
  }
}
const totSel = (unit, dim) => {
  if (unit === "m2") {
    return totalSquare(dim).toFixed(2)
  }
  if (unit === "m") {
    return totalMeter(dim).toFixed(2)
  }
  if (unit === "adet") {
    return dim.quanty
  }
}
const meterLen = (dim) => dim.length / 1000
const square = (dim) => calcM2(dim.length, dim.width)
const totalSquare = (dim) => square(dim) * dim.quanty
const totalMeter = (dim) => meterLen(dim) * dim.quanty

const Customer = ({ offer }) => {
  if (!offer) {
    return <div>Loading offer</div>
  }
  return (
    <div className="grid grid-cols-5 gap-4 content-center">
      <img
        src={process.env.PUBLIC_URL + "/dropLogo.jpeg"}
        alt="logo"
        className="object-cover h-[120px]"
      />
      <div className="grid grid-cols-2 gap-2 col-span-4 content-center">
        <div className="grid grid-cols-6 col-span-2 gap-1 content-center">
          <div className="px-1 border font-semibold">Firma:</div>
          <div className="px-1 col-span-5 border capitalize">
            {offer.customer}
          </div>
        </div>
        {colsData.map((dd, i) => (
          <div
            key={"data-" + i}
            className="grid grid-cols-3 gap-1 content-center"
          >
            <div className="px-1 border font-semibold">{dd.title}:</div>
            <div className="px-1 col-span-2 border capitalize">{dd.text}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

const PriceTable = ({ works, offer }) => {
  if (!works) {
    return <div>Loading works</div>
  }
  return (
    <div className="flex flex-col border mb-20 w-full my-6  shadow-lg rounded px-2 break-inside-avoid">
      <h1 className="mx-auto py-2 text-center font-semibold text-xl">
        Fiyatlandırma
      </h1>
      <div className="grid grid-cols-7 gap-1 bg-stone-500 text-white font-medium text-sm">
        <div className="grid grid-cols-4 gap-1">
          <div className="text-center">No</div>
          <div className="col-span-3 text-center">Kod</div>
        </div>
        <div className="col-span-2">Açıklama</div>
        <div className="col-span-2 grid grid-cols-2 gap-1">
          <div className="text-center">Birim Fiyat</div>
          <div className="grid grid-cols-3 gap-1">
            <div className="col-span-2 text-center">Miktar</div>
            <div className=""></div>
          </div>
        </div>
        <div className="grid grid-cols-3 col-span-2 gap-1">
          <div className="col-span-3 text-center">Toplam Fiyat</div>
        </div>
      </div>
      {works.map((w, i) => (
        <div key={"pw-" + i}>
          <div className="grid grid-cols-7 gap-1 text-sm">
            <div className="grid grid-cols-4 gap-1 border">
              <div className="border text-center">
                {String(i + 1).padStart(2, "0")}{" "}
              </div>
              <div className="col-span-3 border text-center">--</div>
            </div>
            <div className="border col-span-2">{w.typeOfwork}</div>
            <div className="border col-span-2 grid grid-cols-2 gap-1">
              <div className="border text-center">
                {formNumber(w.price.val)}
              </div>
              <div className="grid grid-cols-3 gap-1">
                <div className="border col-span-2 text-center">
                  {calcDimTotalUnit(w.unit, w.dimensions)}
                </div>
                <div className="border">{w.unit}</div>
              </div>
            </div>
            <div className="grid grid-cols-3 col-span-2 gap-1 border ">
              <div className="border col-span-2 text-right font-semibold">
                {formNumber(calTotalPrice(w))}
              </div>
              <div className="border text-gray-500">{w.price.cur}</div>
            </div>
          </div>
        </div>
      ))}
      <GrandTotalTable works={works} offer={offer} />
    </div>
  )
}

const GrandTotalTable = ({ works, offer }) => {
  if (!works || !offer)
    return <div className="bg-green-500">Loading works...</div>

  return (
    <div className="grid grid-cols-3 gap-1 mt-4 border my-4 py-2">
      <div className=""></div>
      <div className=""></div>
      <div className="">
        {(offer.kdv > 0 || offer.discount > 0) && (
          <div className="grid grid-cols-6 gap-1">
            <div className="col-span-2 font-semibold">Toplam</div>
            <div className="col-span-3 text-right font-semibold">
              {formNumber(calcGrandTotal(works, works[0].price.cur))}
            </div>
            <div>{works[0].price.cur}</div>
          </div>
        )}
        {offer.discount > 0 && (
          <div className="grid grid-cols-6 gap-1">
            <div className="col-span-2">
              İndirim
              <span className="text-xs text-gray-600"> %{offer.discount}</span>
            </div>
            <div className="col-span-3 text-right">
              {formNumber(calcDiscount(works, offer.discount))}
            </div>
            <div>{works[0].price.cur}</div>
          </div>
        )}
        {offer.discount > 0 && offer.kdv > 0 && (
          <div className="grid grid-cols-6 gap-1 mt-2">
            <div className="col-span-2">Net Toplam</div>
            <div className="col-span-3 text-right">
              {formNumber(discountedTotal(works, offer.discount))}
            </div>
            <div>{works[0].price.cur}</div>
          </div>
        )}
        {offer.kdv > 0 && (
          <div className="grid grid-cols-6 gap-1 text-sm">
            <div className="col-span-2">KDV %{offer.kdv}</div>
            <div className="col-span-3 text-right">
              {formNumber(calcKDV(offer))}
            </div>
            <div>{works[0].price.cur}</div>
          </div>
        )}
        <div className="grid grid-cols-6 gap-1 mt-2 font-bold">
          <div className="col-span-2">Toplam</div>
          <div className="col-span-3 text-right">
            {formNumber(calcLastTotal(offer))}
          </div>
          <div>{works[0].price.cur}</div>
        </div>
      </div>
    </div>
  )
}

const calcLastTotal = (offer) => {
  let total = calcGrandTotal(offer.works, offer.works[0].price.cur)
  let discount = calcDiscount(offer.works, offer.discount)
  let kdv = calcKDV(offer)
  let sum = total - discount + kdv

  return sum.toFixed(2)
}

const calcKDV = (offer) => {
  let disTotal = discountedTotal(offer.works, offer.discount)
  let kdv = (disTotal * offer.kdv) / 100
  return kdv
}

const calcGrandTotal = (works, currency) => {
  let worksArray = []
  works.map((w) =>
    worksArray.push({ price: Number(calTotalPrice(w)), cur: w.price.cur })
  )
  // ARR GRUPLANMIS HALE DONUSTUR
  const curGroup = groupBy(worksArray, (work) => work.cur)

  let sum = 0
  // KUR CINSINE GORE GRUPLA
  curGroup.get(currency).forEach((el) => (sum += el.price))

  return sum
}
const discountedTotal = (works, discount) => {
  let total = calcGrandTotal(works, works[0].price.cur)
  let discountAmount = calcDiscount(works, discount)

  return total - discountAmount
}

const calcDiscount = (works, disRatio) => {
  let totalPrice = calcGrandTotal(works, works[0].price.cur)
  let discountAmount = (totalPrice * disRatio) / 100
  return discountAmount
}

const calTotalPrice = (work) => {
  let tprice = calcDimTotalUnit(work.unit, work.dimensions) * work.price.val
  return tprice
}

const groupBy = (list, keyGetter) => {
  const map = new Map()
  list.forEach((item) => {
    const key = keyGetter(item)
    const collection = map.get(key)
    if (!collection) {
      map.set(key, [item])
    } else {
      collection.push(item)
    }
  })
  return map
}

const formNumber = (number) => {
  return new Intl.NumberFormat("tr-TR").format(number)
}
