const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
      gloss: String,
      color: String,
      side: String,
      thickness: Number,
      unit: String,
      totalUnit: Number,
      totalQuanty: Number, 
      price: { val: Number, cur: String  },
      workTotalPrice: { val: Number, cur: String },
      code: String,
      noList: Boolean, 
      dimensions: [
        {
          length: Number,
          width: Number,
          m2: Number,
          tm2:Number,
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
});
offerSchema.set("timestamps", true);

const Offer = mongoose.model("offer", offerSchema);

module.exports = Offer;
