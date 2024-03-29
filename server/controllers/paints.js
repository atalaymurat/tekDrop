const Paint = require("../models/paint")
const translit = require("transliteration")

module.exports = {
  index: async (req, res, next) => {
    try {
      const paints = await Paint.find()
      res.status(200).json(paints)
    } catch (err) {
      console.log(err)
      res.status(400).json({ success: false, message: err.message })
    }
  },
  edit: async (req, res, next) => {
    try {
      const paint = await Paint.findById(req.params.id)
      res.status(200).json(paint)
    } catch (err) {
      console.log(err)
      res.status(400).json({ success: false, msg: err.message })
    }
  },
  update: async (req, res) => {
    try {
      console.log("UPDATE PAINT")
      const { id } = req.params
      const data = req.body
      const dataWithKgPrice = calUnitPrice(data)
      const normalizedData = normalizeFields(dataWithKgPrice)

      const doc = await Paint.findById(id)
      doc.set(normalizedData)
      await doc.save()

      res.status(200).json({ msg: "success", doc })
    } catch (err) {
      console.log(err)
      res.status(400).json({ success: false, message: err.message })
    }
  },
  create: async (req, res, next) => {
    try {
      let data = req.body

      // Normalize specified fields
      const dataWithKgPrice = calUnitPrice(data)
      const normalizedData = normalizeFields(dataWithKgPrice)

      // CREATE PAINT
      let paint = new Paint(normalizedData)
      await paint.save()
      res.status(200).json({ success: true, paint })
    } catch (err) {
      console.log("ERR CREATE PAINTS ::::", err)
    }
  },

  destroy: async (req,res, next) => {
    try {
      let id = req.params.id
      const doc = await Paint.findByIdAndDelete(id)
      res.status(200).json({ success: true, doc })
    } catch (err) {
      res.status(400).json({
        success: false,
        msg: err,
      })
    }

  },
  enums: async (req, res, next) => {
    try {
      const { enumValue } = req.body
      // console.log(enumValue)
      // if enum value is not exist in schema path then return error
      if (!Paint.schema.path(enumValue)) {
        return res.status(400).json({ error: "Enum value is not exist" })
      }
      // Make enums to object array with label and value
      const enums = await Paint.schema.path(enumValue).enumValues.map((e) => {
        return { label: e, value: e }
      })
      // Zaten modelden geliyor şu an
      const concatEnums = [{ label: "seçiniz...", value: "" }, ...enums]

      res.status(200).json(concatEnums)
    } catch (err) {
      console.log("ENUM ERROR ", err)
    }
  },
}

// Calculate unit price
const calUnitPrice = (data) => {
  // want to calculate price per total kg ( mainQ, compenat01Q, compenant02Q, compenant03Q... per kg)
  // create a new field "kgPrice" TL and add to data

  // Initialize total weight and unit price
  let totalKg = 0
  let unitPriceTL = data.netPriceTL

  // Iterate through all fields in the data
  for (const key in data) {
    if (key.endsWith("Q")) {
      const quantity = data[key].value
      const unit = data[key].unit

      // Determine the correct conversion factor based on the unit
      let conversionFactor = 1 // Default to 1 (Kg to Kg)

      if (unit === "Lt") {
        // Adjust the conversion factor if the unit is "Lt"
        conversionFactor = 0.85 // Adjust the conversion factor based on your specific substance's density
      }

      // Convert the quantity to Kg using the appropriate conversion factor
      const quantityInKg = quantity * conversionFactor

      // Skip updating 'totalQ' field itself
      if (key !== "totalQ") {
        // Update the total weight and unit price
        totalKg += quantityInKg
        unitPriceTL = data.netPriceTL / totalKg
      }
    }
  }

  // Add the "kgPriceTl" field to the data
  data.kgPriceTl = parseFloat(unitPriceTL.toFixed(2))

  // Calculate and add the "totalQ" field
  data.totalQ = { value: totalKg, unit: "Kg" }

  // Return the updated data
  return data
}

// Normalize specified fields
const normalizeFields = (data) => {
  const normalizedData = { ...data }
  const fields = ["name", "desc"]

  fields.forEach((field) => {
    const normalizedValue = data[field]
      ? translit.transliterate(data[field]).toLowerCase()
      : ""
    normalizedData[
      `normalized${field.charAt(0).toUpperCase()}${field.slice(1)}`
    ] = normalizedValue
  })

  return normalizedData
}
