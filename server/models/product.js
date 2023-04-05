const mongoose = require('mongoose')
const Schema = mongoose.Schema


const productSchema = new Schema({
  code: String,
  desc: String,
  unit: String,
  price: {
    val: Number,
    currency: String
  }

}
)
productSchema.set('timestamps', true)

const product = mongoose.model('product', productSchema)

module.exports = Product