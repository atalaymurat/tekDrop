const Product = require("../models/product")

module.exports = {
  index: async (req, res, next) => {
    try {
      const products = await Product.find()
      res.status(200).json(products)
    } catch (err) {
      console.log(err)
    }
  },
  create: async (req, res, next) => {
    try {
      let data = req.body
      console.log("Model Names CTR REQ BODY ****", data)
      const date = new Date()
      const year = date.getFullYear().toString().substr(-2)
      const nameCod = data.name.toLocaleUpperCase("en-US").slice(0, 3)
      const noCod = ( await Product.countDocuments({}) + 1 )
        .toString()
        .padStart(3, "0")

      const code = `${nameCod}${year}${noCod}`
      const dataWithCode = { ...data, code }
      let product = new Product(dataWithCode)
      await product.save()
      res.status(200).json({ success: true, product })
    } catch (err) {}
  },
}
