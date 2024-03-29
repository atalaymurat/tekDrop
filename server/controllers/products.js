const Product = require("../models/product")
const translit = require("transliteration")

module.exports = {
  index: async (req, res, next) => {
    try {
      const products = await Product.find()
      res.status(200).json(products)
    } catch (err) {
      console.log(err)
      res.status(400).json({ success: false, message: err.message })
    }
  },
  create: async (req, res, next) => {
    try {
      let data = req.body

      // Normalize specified fields
      const normalizedData = normalizeFields(data)


      // CREATE PRODUCT
      let product = new Product(normalizedData)
      await product.save()
      res.status(200).json({ success: true, product })
    } catch (err) {
      console.log(err)
      res.status(400).json({ success: false, message: err.message })
    }
  },
  edit: async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id)
      res.status(200).json(product)
    } catch (err) {
      console.log(err)
      res.status(400).json({ success: false, msg: err.message })
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params
      const data = req.body
      const normalizedData = normalizeFields(data)
      const updatedData = updateCode(normalizedData)

      console.log(JSON.stringify(updatedData, null, 4))

      const doc = await Product.findById(id)
      doc.set(updatedData)
      await doc.save()

      res.status(200).json({ msg: "success", doc })
    } catch (err) {
      console.log(err)
      res.status(400).json({ success: false, message: err.message })
    }
  },
  destroy: async (req, res, next) => {
    try {
      let id = req.params.id
      const doc = await Product.findByIdAndDelete(id)
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
      if (!Product.schema.path(enumValue)) {
        return res.status(400).json({ error: "Enum value is not exist" })
      }
      // Make enums to object array with label and value
      const enums = await Product.schema.path(enumValue).enumValues.map((e) => {
        return { label: e, value: e }
      })
      const concatEnums = [{ label: "seçiniz...", value: "" }, ...enums]

      res.status(200).json(concatEnums)
    } catch (err) {
      console.log("ENUM ERROR ", err)
    }
  },
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
// WRITE PRODUCT CODE
const updateCode = (data) => {
  const nameCod = data.name.toLocaleUpperCase("en-US").slice(0, 3)
  const noCod = data.recordNumber?.toString().padStart(3, "0")
  const code = `${nameCod}${noCod}`
  const dataWithCode = { ...data, code }
  return dataWithCode
}
