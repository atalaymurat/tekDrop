const mongoose = require("mongoose")
const Schema = mongoose.Schema

const offerSchema = new Schema({
  offerType: String,
  offerCode: String,
  offerDate: Date,
  offerValidity: Date,
  itemNo: String,
  customer: String,
  person: String,
  phone: String,
  email: String,
  adress: String,
  showTerms: Boolean,
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
      product: { type: Schema.Types.ObjectId, ref: "product" },
      gloss: String,
      color: String,
      side: String,
      thickness: Number,
      unit: String,
      totalUnit: Number,
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
        },
      ],
    },
  ],

  package: String,
  deliveryPlace: String,
  deliveryDate: String,
  payment: String,
  warranty: String,
  discount: Number,
  kdv: Number,
})
offerSchema.set("timestamps", true)
offerSchema.pre("save", function (next) {
  var offer = this
  var ofType = this.offerType
  const date = new Date()
  const year = date.getFullYear().toString().substr(-2)
  const day = date.getDate().toString().padStart(2, "0")
  const mounth = (date.getMonth() + 1).toString().padStart(2, "0")
  const custmr = offer.customer.slice(0, 3).toLocaleUpperCase("en-US") || ""

  this.offerCode = `${year}${mounth}${day}${ofType}${custmr}`
  next()
})

const Offer = mongoose.model("offer", offerSchema)

module.exports = Offer
