const mongoose = require("mongoose")
const Schema = mongoose.Schema
const mongooseSerial = require("mongoose-serial")

const itemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product" },
  desc: String,
  model: String,
  position: Number,
  gloss: String,
  color: String,
  side: String,
  turnable: Boolean,
  unit: String,
  length: Number,
  width: Number,
  thickness: Number,
  m2: Number,
  totalM2: Number,
  totalLengthM: Number,
  quanty: Number,
  code: String,
  recordNo: String,
  order: { type: Schema.Types.ObjectId, ref: "Order" },
})
itemSchema.plugin(mongooseSerial, {
  field: "recordNo",
  initCounter: "yearly",
  separator: "-",
  digits: 5,
  prefix: "IT",
})

itemSchema.pre("save", function (next) {
  // Calculate m2 and total square meter in tn m2 field for each dimension
  this.totalM2 = calculateM2(this.length, this.width, this.quanty)
  this.totalLengthM = calculateTotalLength(this.length, this.quanty)

  // Call the next middleware in the stack
  next()
})

// Helper function to calculate m2
function calculateM2(length, width, quanty) {
  // Convert length and width to meters (assuming they are in millimeters)
  const lengthInMeters = length / 1000
  const widthInMeters = width / 1000
  const m2 = lengthInMeters * widthInMeters
  const totalM2 = m2 * quanty
  const result = truncateNumber(totalM2)
  if (result <= 0.0) {
    return 0.01
  } else {

    // Calculate m2
    return result
  }
}

// Helper function to calculate Length in meter
function calculateTotalLength(length, quanty) {
  const lengthInMeters = length / 1000
  const total = lengthInMeters * quanty
  const truncatedNumber = truncateNumber(total)

  return truncatedNumber
}

const Item = mongoose.model("Item", itemSchema)

module.exports = Item

function truncateNumber(number, digits = 2) {
  const result = Number(number.toString().match(/^\d+(?:\.\d{0,2})?/))
  return result
}
