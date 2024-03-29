const Company = require("../models/company")
const Offer = require("../models/offer")
const translit = require("transliteration")
const mongoose = require("mongoose")

module.exports = {
  index: async (req, res, next) => {
    try {
      const companies = await Company.find(
        {},
        {
          // Bu fieldleri veri olarak gönderme
          normalizedTitle: 0,
          "addresses.normalizedTitle": 0,
          "addresses.normalizedLine1": 0,
          "addresses.normalizedLine2": 0,
          "addresses.normalizedDistrict": 0,
          "addresses.normalizedCity": 0,
          "addresses.normalizedCountry": 0,
          __v: 0,
        }
      )

      res.status(200).json(companies)
    } catch (err) {
      console.log(err)
    }
  },
  show: async (req, res, next) => {
    try {
      const { id } = req.params
      const company = await Company.findById(id)
      res.status(200).json(company)
    } catch (err) {
      console.log(err)
    }
  },
  update: async (req, res, next) => {
    try {
      const { id } = req.params
      const data = req.body
      const normalizedData = normalizeFields(data)
      const doc = await Company.findById(id)

      if (!doc) {
        return res
          .status(404)
          .json({ success: false, message: "Document not found" })
      }
      doc.set(normalizedData)
      await doc.save()
      res.status(200).json({ success: true, msg: "document updated", doc })
    } catch (err) {
      console.log(err)
    }
  },
  offers: async (req, res, next) => {
    // sent total sums of company offers to company show page
    try {
      const { id } = req.params
      const offers = await Offer.find({ company: id })

      const [offerTotal] = await Offer.aggregate([
        { $match: { company: mongoose.Types.ObjectId(id) , offerType: "SV"} },

        {
          $group: {
            _id: null,
            total: { $sum: "$offerGrandTotalPrice.TL" },
            kdvTotal: { $sum: "$offerKdvPrice.TL" },
            netTotal: { $sum: "$offerNetTotalPrice.TL" },
          },
        },
        { $project: { _id: 0, total: 1, kdvTotal: 1, netTotal: 1 } },
      ]).allowDiskUse(true)

      res.status(200).json({ offers, offerTotal })
    } catch (err) {
      console.log(err)
    }
  },

  create: async (req, res, next) => {
    try {
      const data = req.body
      const normalizedData = normalizeFields(data)
      const company = new Company(normalizedData)
      await company.save()
      console.log("CNTRL CREATE COMPANY", company)

      res.status(200).json({ success: true, doc: company })
    } catch (err) {
      console.log("CNTRL CREATE COMPANY", err)
    }
  },
  labels: async (req, res, next) => {
    // return { label: "title", value: "title" } for all companies
    try {
      const companies = await Company.find()
      const labels = companies.map((company) => {
        return { label: company.title, value: company._id }
      })

      res.status(200).json(labels)
    } catch (err) {
      console.log(err)
    }
  },
}

const normalizeFields = (data) => {
  const normalizedData = { ...data }

  // Normalize the main fields
  const fields = ["title"]
  fields.forEach((field) => {
    const normalizedValue = data[field]
      ? translit.transliterate(data[field]).toLowerCase()
      : ""
    normalizedData[
      `normalized${field.charAt(0).toUpperCase()}${field.slice(1)}`
    ] = normalizedValue
  })

  // Normalize the sub-fields
  const subFields = {
    addresses: ["title", "line1", "line2", "district", "city", "country", "vatTitle"],
  }
  for (const field in subFields) {
    if (data[field]) {
      const normalizedSubFields = data[field].map((subField) => {
        const normalizedSubField = {}
        for (const subFieldKey of subFields[field]) {
          const normalizedValue = subField[subFieldKey]
            ? translit.transliterate(subField[subFieldKey]).toLowerCase()
            : ""
          normalizedSubField[
            `normalized${subFieldKey
              .charAt(0)
              .toUpperCase()}${subFieldKey.slice(1)}`
          ] = normalizedValue
        }
        return {
          ...subField,
          ...normalizedSubField,
        }
      })
      normalizedData[field] = normalizedSubFields
    }
  }
  console.log("normalizedData", normalizedData)

  return normalizedData
}
