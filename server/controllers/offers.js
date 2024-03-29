const Offer = require(`../models/offer`)
const Company = require("../models/company")
const mongoose = require("mongoose")

const {
  calcWorkDimData,
  writeCode,
  generateOfferCode,
} = require("../lib/calculations.js")
const Papa = require("papaparse")

module.exports = {
  show: async (req, res, next) => {
    try {
      const offer = await Offer.findById(req.params.id).populate([
        { path: "works.product" },
        { path: "company" },
      ])
      res.status(200).json(offer)
    } catch (err) {
      res.status(404).send({ error: `there is an error occured` })
    }
  },

  edit: async (req, res, next) => {
    try {
      const offer = await Offer.findById(req.params.id)
      res.status(200).json(offer)
    } catch (err) {
      res.status(404).send({ error: `there is an error occured` })
    }
  },

  index: async (req, res, next) => {
    try {
      const offers = await Offer.find()
        .populate([{ path: "company" }])
        .sort({ createdAt: -1 })
      res.status(200).json(offers)
    } catch (err) {
      res.status(400).json({ success: false })
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params
      const data = req.body

      if (!data.company) {
        delete data["company"]
      }
      // filter same lengths of dimension array
      const filteredData = filterLengths(data)

      // Normalize specified fields
      const normalizedData = normalizeFields(filteredData)

      // CALCULATING TOTAL UNITS  //
      calcWorkDimData(normalizedData)
      // WRITE PRODUCT CODES
      const dataWithCode = await writeCode(normalizedData)
      // Offer code var ise kodu değiştirme
      if (!dataWithCode.offerCode) {
        const offerCode = await generateOfferCode(dataWithCode) // Yeni belge için offerCode oluşturulur
        dataWithCode.offerCode = offerCode
      }
      const doc = await Offer.findById(id)

      if (!doc) {
        return res
          .status(404)
          .json({ success: false, message: "Document not found" })
      }

      if (!doc.offerCode) {
        const offerCode = generateOfferCode(normalizedData) // existing document is used to generate the offerCode
        doc.offerCode = offerCode
      }

      doc.set(dataWithCode)
      await doc.save()

      res.status(200).json({ success: true, doc })
    } catch (err) {
      console.log(err)
      res.status(400).json({ success: false })
    }
  },
  create: async (req, res, next) => {
    try {
      let data = req.body
      if (!data.company) {
        delete data["company"]
      }

      // filter same length
      const filteredData = filterLengths(data)

      // Normalize specified fields
      const normalizedData = normalizeFields(filteredData)
      // Calculate total units
      calcWorkDimData(normalizedData)
      const dataWithCode = await writeCode(normalizedData)

      const offerCode = await generateOfferCode(dataWithCode) // Yeni belge için offerCode oluşturulur
      dataWithCode.offerCode = offerCode

      const offer = new Offer(dataWithCode)
      await offer.save()
      res.status(200).json({ success: true, offer })
    } catch (err) {
      res.status(400).json({
        success: false,
        error: err,
      })
      console.log("ERR CONTROLLER CREATE ::", err)
    }
  },
  destroy: async (req, res, next) => {
    try {
      let id = req.params.id
      const doc = await Offer.findByIdAndDelete(id)
      res.status(200).json({ success: true, doc })
    } catch (err) {
      res.status(400).json({
        success: false,
        error: err,
      })
    }
  },
  csv: async (req, res, next) => {
    try {
      const id = req.params.id
      const offer = await Offer.findById(id).populate({ path: "works.product" })
      const dims = []

      offer.works.map((w, i) => {
        if (w.machineData) {
          w.dimensions.map((d, i) => {
            let dim = {
              customer: offer.customer
                .trToEn()
                .toLocaleUpperCase("en-US")
                .replace(/\s+/g, ""),
              code: w.code + "-" + (i + 1).toString().padStart(2, "0"),
              typeOfwork: w.product
                ? w.product.name
                    .trToEn()
                    .toLocaleUpperCase("en-US")
                    .replace(/\s+/g, "")
                : "NOMODEL",
              color: w.color
                .trToEn()
                .toLocaleUpperCase("en-US")
                .replace(/\s+/g, ""),
              gloss: w.gloss.toLocaleUpperCase("en-US").replace(/\s+/g, ""),
              width: d.width,
              length: d.length,
              quanty: d.quanty,
              side:
                (w.side === "TY" && 1) ||
                (w.side === "CY" && 2) ||
                (w.side === "TYA" && 0),
            }
            dims.push(dim)
            return
          })
          return
        } else {
          return
        }
      })

      // console.log("CSV CTRL ::::", offer.works)
      res.status(200).json(dims)
    } catch (err) {
      console.log(err)
      res.status(400).json({
        success: false,
        error: err,
      })
    }
  },
  chartData: async (req, res) => {
    const mm = (date) => {
      let d = new Date(date)
      let day = d.getDate()
      let month = d.getMonth() + 1
      let year = d.getFullYear().toString().substr(-2) // Yılın son iki rakamını alır
      return `${day < 10 ? "0" + day : day}/${
        month < 10 ? "0" + month : month
      }/${year}`
    }

    async function getMonthlyChartData() {
      try {
        const monthlyData = {
          labels: [],
          datasets: [],
        }

        const startDate = new Date(2023, 2, 1) // Başlangıç tarihi, örneğin 1 Ocak 2023
        const endDate = new Date() // Şu anki tarih

        let currentDate = startDate

        while (currentDate <= endDate) {
          const nextMonthStartDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            1
          )
          const nextMonthEndDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            0
          )

          const result = await Offer.aggregate([
            {
              $match: {
                createdAt: { $gte: nextMonthStartDate, $lte: nextMonthEndDate },
                offerType: "SV",
              },
            },
            {
              $group: {
                _id: null,
                total: { $sum: "$offerNetTotalPrice.TL" },
              },
            },
            {
              $project: {
                _id: 0,
                total: 1,
              },
            },
          ])

          // Chart.js veri formatına dönüşüm
          const chartData = {
            label: `${mm(currentDate)}`,
            data: result.length > 0 ? [result[0].total] : [0], // Eğer veri yoksa "0" değeri kullanılır
          }

          monthlyData.labels.push(`${mm(currentDate)}`)
          monthlyData.datasets.push(chartData)

          currentDate.setMonth(currentDate.getMonth() + 1) // Sonraki ayın başlangıç tarihine geçiş yapılır
        }

        return monthlyData
      } catch (err) {
        console.log(err)
        throw err
      }
    }

    try {
      // Fonksiyonu çağırarak Chart.js için uygun veri formatını elde edebilirsiniz
      let chartData = await getMonthlyChartData()
      res.status(200).json(chartData)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: true })
    }
  },
  works: async (req, res, next) => {
    // get works of an offer and calculate total unit quantity
    try {
      const id = req.params.id
      const offer = await Offer.findById(id)

      offerTotalM2 = await Offer.aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(id) },
        },
        {
          $unwind: "$works",
        },
        {
          $match: {
            $or: [{ "works.unit": "m2" }, { "works.unit": "m" }],
          },
        },
        {
          $group: {
            _id: { unit: "$works.unit", side: "$works.side" },
            total: {
              $sum: {
                $cond: {
                  if: { $eq: ["$works.unit", "m"] },
                  then: {
                    $cond: {
                      if: { $eq: ["$works.side", "CY"] },
                      then: { $multiply: ["$works.totalM_M2", 2] },
                      else: "$works.totalM_M2",
                    },
                  },
                  else: {
                    $cond: {
                      if: { $eq: ["$works.side", "CY"] },
                      then: { $multiply: ["$works.totalUnit", 2] },
                      else: "$works.totalUnit",
                    },
                  },
                },
              },
            },
          },
        },
      ])

      // Get total sum of m2
      let totalSumM2 = 0
      for (let i = 0; i < offerTotalM2.length; i++) {
        totalSumM2 += offerTotalM2[i].total
      }

      res.status(200).json({
        msg: "OK",
        worksTotalArr: offerTotalM2,
        totalSumM2: totalSumM2,
      })
    } catch (err) {
      console.log(err)
      res.status(400).json({
        success: false,
        error: err,
      })
    }
  },
  isEmailUnique: async (req, res, next) => {
    const email = req.body.email
    const result = await Company.findOne({ email: email })
    if (!result) {
      res.status(200).json({ isUnique: true })
    } else {
      res.status(200).json({ isUnique: false, ...result._doc })
    }
  },
}

// HELPER FUNCTIONS -----
String.prototype.trToEn = function () {
  return this.replace("Ğ", "g")
    .replaceAll("Ü", "u")
    .replaceAll("Ş", "s")
    .replaceAll("I", "i")
    .replaceAll("İ", "i")
    .replaceAll("Ö", "o")
    .replaceAll("Ç", "c")
    .replaceAll("ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("ş", "s")
    .replaceAll("ı", "i")
    .replaceAll("ö", "o")
    .replaceAll("ç", "c")
}

// Function to normalize specified fields
const translit = require("transliteration")
const normalizeFields = (data) => {
  const normalizedData = { ...data }
  const fields = ["customer", "person", "adress"]

  fields.forEach((field) => {
    const normalizedValue = data[field]
      ? translit.transliterate(data[field]).toLowerCase()
      : ""
    normalizedData[
      `normalized${field.charAt(0).toUpperCase()}${field.slice(1)}`
    ] = normalizedValue
  })

  return normalizedData
}

const filterLengths = (data) => {
  data.works.forEach((w) => {
    const uniqueEntries = {}

    w.dimensions.forEach((entry) => {
      const { length, width, quanty, ...rest } = entry

      // Check if interchangeability should be considered
      const useInterchangeable =
        w.interChangeable && length !== "" && width !== ""

      // Convert length and width to numbers and sort if interchangeability is considered
      const sortedDimensions = useInterchangeable
        ? [parseFloat(length), parseFloat(width)].sort((a, b) => a - b)
        : [parseFloat(length), parseFloat(width)]

      // Check if the dimensions are valid numbers
      const validDimensions = sortedDimensions.every((dim) => !isNaN(dim))

      if (!validDimensions) {
        console.error(`Invalid dimensions in work with ID ${w._id}: `, entry)
        return
      }

      // Use a string representation of sorted length and width as a key
      const key = sortedDimensions.join("-")

      // If the key is not in uniqueEntries, add it with the quantity as the value
      if (!uniqueEntries[key]) {
        uniqueEntries[key] = {
          quanty: parseInt(quanty, 10) || 0,
          ...rest,
        }
      } else {
        // If the key is already in uniqueEntries, add the quantity to the existing value
        uniqueEntries[key].quanty += parseInt(quanty, 10) || 0
        // Add any other properties you want to include here
      }
    })

    // Create the filtered array with the unique length and width combinations and
    // their total quantities
    const filteredArray = Object.entries(uniqueEntries).map(([key, values]) => {
      const [length, width] = key.split("-").map(Number)
      return {
        length,
        width,
        quanty: values.quanty,
        ...values, // Include other props from values
      }
    })
    w.dimensions = filteredArray

    // Calculate totalQuanty based on filteredArray
    w.totalQuanty = filteredArray.reduce(
      (total, entry) => total + entry.quanty,
      0
    )
  })

  return data
}
