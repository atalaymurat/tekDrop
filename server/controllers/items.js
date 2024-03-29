const Item = require("../models/item")

module.exports = {
  index: async (req, res, next) => {
    try {
      // FIND ORDERS
      const docs = await Item.find()
      res.status(200).json(docs)
    } catch (err) {
      console.log(err)
      res.status(400).json({ success: false, msg: err.message })
    }
  },
}