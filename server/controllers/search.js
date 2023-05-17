const Offer = require("../models/offer")

module.exports = {
  index: async (req, res, next) => {
    try {
      let { search } = req.body
      const offer = await Offer.aggregate([
        {
          $match: {
            $or: [
              { customer: { $regex: search, $options: "i" } },
              { person: { $regex: search, $options: "i" } },
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
}
