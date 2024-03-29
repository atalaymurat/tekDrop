const mongoose = require("mongoose")
const Schema = mongoose.Schema

const productSchema = new Schema({
  recordNumber: { type: Number, unique: true },
  name: String,
  normalizedName: String,
  desc: String,
  normalizedDesc: String,
  unit: { type: String, enum: ["m", "m2", "adet", "takım"] },
  surfaceMaterial: {
    type: String,
    enum: ["pp", "mdf", "kaplama", "sunta", "kontraplak"],
  },
  productType: {
    type: String,
    enum: [
      "kapak",
      "panel",
      "profil",
      "supurgelik",
      "pervaz",
      "kasa",
      "kanat",
      "kapı",
      "kabin",
      "cerceve",
      "tac",
      "baza",
    ],
  },
  productionStyle: {type: String, enum: ["imalat", "boyama", "fason"]},
  surfaceShape: {
    type: String,
    enum: ["düz", "fuga", "country", "yivli", "havuzlu", "citali", "cnc", "j-kulp"],
  },

  finish: {
    type: String,
    enum: ["lake", "cila"],
  },
  baseLaqType: { type: String, enum: ["PU", "PE", "AC"] },
  finishLaqType: { type: String, enum: ["PU", "PE", "AC", "WB"] },
  finishPore: { type: String, enum: ["acik", "kapali"] },
  finishGloss: { type: String, enum: ["0", "10", "20", "30", "40", "100"] },
  finishSide: { type: String, enum: ["TY", "CY", "TYA"] },
  finishColor: { type: String, enum: ["acik", "koyu"] },
  image: String,
  code: String,
  thickness: Number,
  priceGroup: String,
  netPrice: { cur: String, val: Number },
  listPrice: { cur: String, val: Number },
})

const createCode = (name, recordNumber) => {
  const nameCod = name.toLocaleUpperCase("en-US").slice(0, 3);
  const noCod = recordNumber.toString().padStart(3, "0");
  const code = `${nameCod}${noCod}`;
  return code;
};

productSchema.pre("save", async function (next) {
  if (!this.recordNumber) {
    try {
      this.recordNumber = await generateUniqueNumber()
      this.code = createCode(this.name, this.recordNumber)
      next()
    } catch (err) {
      next(err)
    }
  } else {
    next()
  }
})

const Product = mongoose.model("Product", productSchema)

async function generateUniqueNumber() {
  try {
    const latestDocument = await Product.findOne(
      { recordNumber: { $exists: true } },
      {},
      { sort: { recordNumber: -1 } }
    )
    const latestNumber = latestDocument ? latestDocument.recordNumber : 0
    return latestNumber + 1
  } catch (err) {
    throw new Error("Error generating recordeNumber !!!")
  }
}



module.exports = Product
