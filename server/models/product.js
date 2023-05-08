const mongoose = require("mongoose")
const Schema = mongoose.Schema

const productSchema = new Schema({
  name: String,
  desc: String,
  image: String,
  priceGroup: String,
  code: String,
})


const Product = mongoose.model("product", productSchema)

module.exports = Product
