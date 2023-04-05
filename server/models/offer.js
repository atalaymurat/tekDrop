const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const offerSchema = new Schema({
  offerType: String,
  offerDate: Date,
  offerValidity: Date,
  itemNo: String,
  customer: String,
  works: [
    {
      typeOfwork: String,
      gloss: String,
      color: String,
      thickness: Number,
      unit: String,
      price: { val: Number, cur: String  },
      code: String,
      dimensions: [
        {
          length: Number,
          width: Number,
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
