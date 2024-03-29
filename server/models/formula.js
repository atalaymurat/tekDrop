const mongoose = require("mongoose")
const Schema = mongoose.Schema

const formulaSchema = new Schema({
  title: String,
  totM2: Number,
  totAdet: Number,
  totWeight: { value: Number, unit: { type: String, enum: ["", "Kg", "Lt"] } },
  kgToLt: Number,
  mainBase: { type: Schema.Types.ObjectId, ref: "Paint" },
  mat01: { type: Schema.Types.ObjectId, ref: "Paint" },
  mat01Qnty: {
    value: Number,
    unit: {
      type: String,
      enum: ["", "Kg", "Lt"],
    },
  },
  mat02: { type: Schema.Types.ObjectId, ref: "Paint" },
  mat02Qnty: {
    value: Number,
    unit: {
      type: String,
      enum: ["", "Kg", "Lt"],
    },
  },
  mat03: { type: Schema.Types.ObjectId, ref: "Paint" },
  mat03Qnty: {
    value: Number,
    unit: {
      type: String,
      enum: ["", "Kg", "Lt"],
    },
  },
  consuption: [
    {
      cover: {
        type: String,
        enum: [
          "",
          "kapak",
          "cnc kapak",
          "düz panel",
          "Kenarsız Panel",
          "kanat",
          "kasa",
          "pervaz",
          "profil",
        ],
      },
      unit: { type: String, enum: ["", "adet", "takım", "yüz", "m2", "m"] },
      value: Number,
      unitCostTl: Number,
      unitCostNetTl: Number,
    },
  ],
})

const Formula = mongoose.model("Formula", formulaSchema)

module.exports = Formula
