const Formula = require("../models/formula")
const Paint = require("../models/paint")

module.exports = {
  index: async (req, res, next) => {
    console.log("FORMULA INDEX")
    try {
      const formulas = await Formula.find()
        .populate([{ path: "mainBase" }])
        .populate([{ path: "mat01" }])
        .populate([{ path: "mat02" }])
        .populate([{ path: "mat03" }])
      res.status(200).json(formulas)
    } catch (err) {
      console.log(err)
      res.status(400).json({ success: false, message: err.message })
    }
  },
  show: async (req, res, next) => {
    const formula = await Formula.findById(req.params.id).populate([
      { path: "mainBase" },
      { path: "mat01" },
      { path: "mat02" },
      { path: "mat03" },
    ])
    res.status(200).json(formula)
  },
  edit: async (req, res, next) => {
    const formula = await Formula.findById(req.params.id)
    res.status(200).json(formula)
  },
  update: async (req, res) => {
    try {
      console.log("UPDATE FORMULA")
      const { id } = req.params
      const data = req.body
      const doc = await Formula.findById(id)

      // Explicitly set fields to null if not present in the updated data
      const fieldsToCheck = [
        "mat01",
        "mat02",
        "mat03",
        "mat01Qnty",
        "mat02Qnty",
        "mat03Qnty",
      ]

      // Function to check if a value is an empty object
      const isEmptyObject = (value) => {
        return (
          value &&
          Object.keys(value).length === 0 &&
          value.constructor === Object
        )
      }

      fieldsToCheck.forEach((field) => {
        if (
          !data[field] ||
          isEmptyObject(data[field]) ||
          Object.keys(data[field]).length <= 1
        ) {
          doc.set({ [field]: null })
        }
      })

      doc.set(data)
      if (data.consuption && data.consuption.length > 0) {
        const dataWithUnitPrices = await calUnitPrices(data)
        doc.set(dataWithUnitPrices)
      }

      console.log("Data to  Update", data)
      console.log("Doc to Update", doc)

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
      const doc = await Formula.findByIdAndDelete(id)
      res.status(200).json({ success: true, doc })
    } catch (err) {
      res.status(400).json({
        success: false,
        msg: err,
      })
    }
  },
  create: async (req, res, next) => {
    const data = req.body
    if (data.consuption && data.consuption.length > 0) {
      const dataWithUnitPrices = await calUnitPrices(data)
      const formula = new Formula(dataWithUnitPrices)
      await formula.save()
      return res.status(200).json({ msg: "success", formula })
    } else {
      const formula = new Formula(data)
      await formula.save()
      return res.status(200).json({ msg: "success", formula })
    }
  },
  enums: async (req, res, next) => {
    try {
      const { enumValue } = req.body
      // console.log(enumValue)

      // if enum value is not exist in schema path then return error
      if (!Formula.schema.path(enumValue)) {
        return res.status(400).json({ error: "Enum value is not exist" })
      }
      // Make enums to object array with label and value
      const enums = await Formula.schema.path(enumValue).enumValues.map((e) => {
        return { label: e, value: e }
      })
      const concatEnums = [{ label: "seçiniz...", value: "" }, ...enums]

      res.status(200).json(concatEnums)
    } catch (err) {
      console.log("ENUM ERROR ", err)
    }
  },
}

const calUnitPrices = async (data) => {
  const fetchPaintDocument = async (paintId) => {
    return paintId ? await Paint.findById(paintId) : null
  }

  // Validation of the data structure
  if (!data || !data.mainBase || !data.consuption) {
    throw new Error("Invalid data structure. Missing required properties.")
  }

  try {
    const {
      mainBase,
      mat01,
      mat02,
      mat03,
      consuption,
      mat01Qnty,
      mat02Qnty,
      mat03Qnty,
    } = data
    console.log("Calculating Unit Prices...")
    const mainBaseDoc = await fetchPaintDocument(mainBase)
    const mat01Doc = await fetchPaintDocument(mat01)
    const mat02Doc = await fetchPaintDocument(mat02)
    const mat03Doc = await fetchPaintDocument(mat03)

    // Quanty value larının çek edilmesi hata olmaması için
    const getQuantityValue = (qnty) =>
      qnty && qnty.value !== null && qnty.value !== "" ? qnty.value : null
    const mat01QntyValue = getQuantityValue(mat01Qnty)
    const mat02QntyValue = getQuantityValue(mat02Qnty)
    const mat03QntyValue = getQuantityValue(mat03Qnty)

    // İlavelerin birim adet fiyatlarının toplamını almak
    const calMatCost = (mat, qnt) => {
      if (mat === null || qnt === null || qnt === "") return 0
      const result = qnt * mat.kgPriceTl
      return result
    }

    // birim maliyetini cover a yazdırmak
    const totalMatCostTL =
      mainBaseDoc.netPriceTL +
      calMatCost(mat01Doc, mat01QntyValue) +
      calMatCost(mat02Doc, mat02QntyValue) +
      calMatCost(mat03Doc, mat03QntyValue)
    console.log("Cover Total cost", totalMatCostTL)

    const newConsuption = consuption.map((c) => {
      // Division by zero check
      if (c.value === 0) {
        throw new Error("Division by zero error. Value in consuption is zero.")
      }
      const costPerUnit = totalMatCostTL / c.value
      c.unitCostTl = trimDecimal(costPerUnit)
      const unitCostNet = costPerUnit / 1.2
      c.unitCostNetTl = trimDecimal(unitCostNet)
      return c
    })

    data.consuption = newConsuption
    console.log("New Data", data)
    return data
  } catch (err) {
    console.log("Error Calc Unit Prices :", err.message || err)
  }
}

const trimDecimal = (number) => {
  return Math.floor(number * 100) / 100
}
