const Offer = require("../models/offer")
const Company = require("../models/company")
const translit = require("transliteration")

module.exports = {
  index: async (req, res, next) => {
    try {
      let { search } = req.body
      const normalizedSearch = translit.transliterate(search).toLowerCase()

      const offer = await Offer.aggregate([
        {
          $lookup: {
            from: "companies",
            localField: "company",
            foreignField: "_id",
            as: "company",
          },
        },
        // bunu ekledik customer fieldi array dönmesin diye
        {
          $addFields: {
            company: { $arrayElemAt: ["$company", 0] },
          },
        },

        {
          $match: {
            $or: [
              {
                "company.normalizedTitle": {
                  $regex: normalizedSearch,
                  $options: "i",
                },
              },
              {
                "company.addresses.normalizedCity": {
                  $regex: normalizedSearch,
                  $options: "i",
                },
              },
              {
                "company.addresses.normalizedDistrict": {
                  $regex: normalizedSearch,
                  $options: "i",
                },
              },
              {
                "company.addresses.normalizedCountry": {
                  $regex: normalizedSearch,
                  $options: "i",
                },
              },
              {
                "company.addresses.normalizedLine1": {
                  $regex: normalizedSearch,
                  $options: "i",
                },
              },
              {
                "company.addresses.normalizedLine2": {
                  $regex: normalizedSearch,
                  $options: "i",
                },
              },
              {
                normalizedCustomer: { $regex: normalizedSearch, $options: "i" },
              },
              { normalizedPerson: { $regex: normalizedSearch, $options: "i" } },
              { normalizedAdress: { $regex: normalizedSearch, $options: "i" } },
              // normalize edilmemiş aramalar eski datalar yüzünden
              { customer: { $regex: search, $options: "i" } },
              { person: { $regex: search, $options: "i" } },
              { status: { $regex: search, $options: "i" } },
              { adress: { $regex: search, $options: "i" } },
              {
                offerType: { $regex: search, $options: "i" },
              },
            ],
          },
        },
        {
          $sort: { createdAt: -1 },
        },
      ])
      res.status(200).json(offer)
    } catch (err) {
      res.json({ error: true })
      console.log(err)
    }
  },
  // Companies index company list search
  companies: async (req, res, next) => {
    let { search } = req.body
    const normalizedSearch = translit.transliterate(search).toLowerCase()
    try {
      const companies = await Company.aggregate([
        {
          $match: {
            $or: [
              {
                normalizedTitle: {
                  $regex: normalizedSearch,
                  $options: "i",
                },
              },
              {
                "addresses.normalizedCity": {
                  $regex: normalizedSearch,
                  $options: "i",
                },
              },
              {
                "addresses.normalizedDistrict": {
                  $regex: normalizedSearch,
                  $options: "i",
                },
              },
              {
                "addresses.normalizedLine1": {
                  $regex: normalizedSearch,
                  $options: "i",
                },
              },
              {
                "addresses.normalizedLine2": {
                  $regex: normalizedSearch,
                  $options: "i",
                },
              },
              {
                "addresses.normalizedCountry": {
                  $regex: normalizedSearch,
                  $options: "i",
                },
              },
            ],
          },
        },
        {
          $sort: { createdAt: -1 },
        },
      ])
      res.status(200).json(companies)
    } catch (err) {
      res.json({ error: true })
      console.log(err)
    }
  },
  offer: async (req, res, next) => {
    try {
      let { startDate, endDate } = req.body
      const mm = (date) => {
        let d = new Date(date)
        let form = d.getMonth() + 1 + "-" + d.getFullYear()
        return form
      }

      const offer = await Offer.aggregate([
        {
          $match: {
            createdAt: { $lt: new Date(endDate), $gte: new Date(startDate) },
            "offerNetTotalPrice.TL": { $exists: true },
          },
        },
        {
          $project: {
            customer: 1,
            createdAt: 1,
            amount: "$offerNetTotalPrice.TL",
            status: 1,
            offerType: 1,
            period: { $concat: [mm(startDate), " to ", mm(endDate)] },
          },
        },
        {
          $group: {
            _id: { offerType: "$offerType", period: "$period" },
            total: { $sum: "$amount" },
            max: { $max: "$amount" },
            count: { $sum: 1 },
          },
        },
      ])
      res.status(200).json(offer)
    } catch (err) {
      res.status(500).json({ error: true })
      console.log(err)
    }
  },
}
