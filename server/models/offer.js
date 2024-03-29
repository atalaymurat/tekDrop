const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Order = require("./item.js")

const offerSchema = new Schema({
  offerType: String,
  offerCode: String,
  offerDate: Date,
  offerValidity: Date,
  itemNo: String,
  customer: String,
  company: { type:  Schema.Types.ObjectId, ref: "Company" },
  normalizedCustomer: String,
  person: String,
  normalizedPerson: String,
  phone: String,
  email: String,
  adress: String,
  normalizedAdress: String,
  showTerms: Boolean,
  noTotals: Boolean,
  offerTotalPrice: { EUR: Number, TL: Number, USD: Number },
  offerDiscountPrice: { EUR: Number, TL: Number, USD: Number },
  offerNetTotalPrice: { EUR: Number, TL: Number, USD: Number },
  offerKdvPrice: { EUR: Number, TL: Number, USD: Number },
  offerGrandTotalPrice: { EUR: Number, TL: Number, USD: Number },
  salesConditions: String,
  paymentTerms: String,
  deliveryDate: String,
  packaging: String,
  warranty: String,
  infos: String,
  works: [
    {
      typeOfwork: String,
      position: Number,
      product: { type:  Schema.Types.ObjectId, ref: "Product" },
      gloss: String,
      color: String,
      side: String,
      thickness: Number,
      unit: String,
      totalUnit: Number,
      totalM_M2: Number,   // m2 olmayan işler için kullanılacak
      totalQuanty: Number,
      price: { val: Number, cur: String },
      workTotalPrice: { val: Number, cur: String },
      code: { type: String },
      noList: Boolean,
      machineData: Boolean,
      dimensions: [
        {
          length: Number,
          width: Number,
          m2: Number,
          tm2: Number,
          tLength: Number,
          quanty: Number,
          desc: String,
          control: Boolean,
        },
      ],
    },
  ],
  // order work fieldin başka modele alınmış durumu

  package: String,
  deliveryPlace: String,
  payment: String,
  warranty: String,
  discount: Number,
  kdv: Number,
  status: String,
  startDate: Date,
  finishDate: Date,
})




offerSchema.set("timestamps", true)

// write a function automaticly save normalized data


const Offer = mongoose.model("Offer", offerSchema)

module.exports = Offer
