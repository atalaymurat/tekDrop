const mongoose = require("mongoose")
const Schema = mongoose.Schema

const paintSchema = new Schema({
  name: String,
  normalizedName: String,
  brand: String,
  mainCode: String,
  haveComp: Boolean,
  comp1Ratio: Number,
  comp2Ratio: Number,
  mainQ: { value: Number, unit: { type: String, enum: ["", "Kg", "Lt"] } },
  compenant01Code: String,
  compenant01Q: {
    value: Number,
    unit: { type: String, enum: ["", "Kg", "Lt"] },
  },
  compenant02Code: String,
  compenant02Q: {
    value: Number,
    unit: { type: String, enum: ["", "Kg", "Lt"] },
  },
  totalQ: { value: Number, unit: { type: String, enum: ["", "Kg", "Lt"] } },
  desc: String,
  gloss: String,
  normalizedDesc: String,
  materialGroup: {
    type: String,
    enum: ["", "tiner", "astar", "son kat", "renk", "dolgu", "katkı"],
  },
  baseType: {
    type: String,
    enum: ["", "PU", "ACR", "SZ", "PU AC", "PU EP", "EP", "WB", "PE"],
  },
  netPriceTL: Number,
  netPriceEUR: Number,
  kgPriceTl: Number,
  paymentTerm: String,
})

paintSchema.set("timestamps", true)

const Paint = mongoose.model("Paint", paintSchema)

module.exports = Paint
