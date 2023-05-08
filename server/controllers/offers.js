const Offer = require(`../models/offer`)
const Product = require("../models/product")

const { calcWorkDimData } = require("../lib/calculations.js")
const Papa = require("papaparse")

module.exports = {
  show: async (req, res, next) => {
    try {
      const offer = await Offer.findById(req.params.id).populate({
        path: "works.product",
      })
      res.status(200).json(offer)
    } catch (err) {
      console.log("ERROR------------------------------")
      res.status(404).send({ error: `there is an error occured` })
    }
  },
  index: async (req, res, next) => {
    try {
      const offers = await Offer.find()
      res.status(200).json(offers)
    } catch (err) {
      res.status(400).json({ success: false })
    }
  },
  update: async (req, res, next) => {
    try {
      const id = req.params.id
      const data = req.body
      // CALCULATING TOTAL UNITS  //
      calcWorkDimData(data)
      const dataWithCode = await writeCode(data)
      console.log("UPDATE CTRL BEFORE SAVE", dataWithCode)
      const doc = await Offer.findByIdAndUpdate(id, dataWithCode)
      res.status(200).json({ success: true, doc })
    } catch (err) {
      console.log(err)
      res.status(400).json({ success: false })
    }
  },
  create: async (req, res, next) => {
    try {
      let data = req.body
      calcWorkDimData(data)
      data = await writeCode(data)
      let ofr = new Offer(data)
      await ofr.save()
      res.status(200).json({ success: true, ofr })
    } catch (err) {
      res.status(400).json({
        success: false,
        error: err,
      })
    }
  },
  destroy: async (req, res, next) => {
    try {
      let id = req.params.id
      const doc = await Offer.findByIdAndDelete(id)
      res.status(200).json({ success: true, doc })
    } catch (err) {
      res.status(400).json({
        success: false,
        error: err,
      })
    }
  },
  csv: async (req, res, next) => {
    try {
      const id = req.params.id
      const offer = await Offer.findById(id).populate({ path: "works.product" })
      const dims = []

      offer.works.map((w, i) => {
        if (w.machineData) {
          w.dimensions.map((d, i) => {
            let dim = {
              customer: offer.customer
                .trToEn()
                .toLocaleUpperCase("en-US")
                .replace(/\s+/g, ""),
              code: w.code + "-" + (i + 1).toString().padStart(2, "0"),
              typeOfwork: w.product
                ? w.product.name
                    .trToEn()
                    .toLocaleUpperCase("en-US")
                    .replace(/\s+/g, "")
                : "NOMODEL",
              color: w.color
                .trToEn()
                .toLocaleUpperCase("en-US")
                .replace(/\s+/g, ""),
              gloss: w.gloss.toLocaleUpperCase("en-US").replace(/\s+/g, ""),
              width: d.width,
              length: d.length,
              quanty: d.quanty,
              side:
                (w.side === "TY" && 1) ||
                (w.side === "CY" && 2) ||
                (w.side === "TYA" && 0),
            }
            dims.push(dim)
            return
          })
          return
        } else {
          return
        }
      })

      // console.log("CSV CTRL ::::", offer.works)
      res.status(200).json(dims)

      /* SENDING CSV FILE FROM API
      let options = {
        quotes: false, //or array of booleans
        quoteChar: "",
        escapeChar: "",
        delimiter: ";",
        header: false,
        newline: "\r\n",
        skipEmptyLines: false, //other option is 'greedy', meaning skip delimiters, quotes, and whitespace.
        columns: null, //or array of strings
      }
      if (dims.length === null) {
        let csv = Papa.unparse(dims, options)
        res
          .set({
            "Content-Type": "text/csv",
            "Content-Disposition": `attachment; filename=${offer.offerCode}."csv"`,
          })
          .send(csv)
      }
      */
    } catch (err) {
      console.log(err)
      res.status(400).json({
        success: false,
        error: err,
      })
    }
  },
}

const writeCode = (data) => {
  return new Promise(async (res, rej) => {
    try {
      const date = new Date()
      const year = date.getFullYear().toString().substr(-2)
      const day = date.getDate().toString().padStart(2, "0")
      const mounth = (date.getMonth() + 1).toString().padStart(2, "0")

      const promiseArray = async () => {
        await Promise.all(
          data.works.map(async (w, i) => {
            console.log("1--", i)
            let model = ""
            const custmr =
              data.customer.slice(0, 3).toLocaleUpperCase("en-US").trim() ||
              "NOCUSTOMER"
            if (w.product) {
              const product = await Product.findById(w.product)
              console.log("2--", i)
              model = product.name.toLocaleUpperCase("en-US")
            }
            if (!w.product && w.typeOfwork) {
              console.log("No PRoduct -", !w.product)

              model = w.typeOfwork
            }
            data.works[i].code =
              custmr + model.slice(0, 3) + (i + 1).toString().padStart(2, "0")
          })
        )
      }
      await promiseArray()

      res(data)
    } catch (err) {
      rej(err)
    }
  })
}

String.prototype.trToEn = function () {
  return this.replace("Ğ", "g")
    .replaceAll("Ü", "u")
    .replaceAll("Ş", "s")
    .replaceAll("I", "i")
    .replaceAll("İ", "i")
    .replaceAll("Ö", "o")
    .replaceAll("Ç", "c")
    .replaceAll("ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("ş", "s")
    .replaceAll("ı", "i")
    .replaceAll("ö", "o")
    .replaceAll("ç", "c")
}
