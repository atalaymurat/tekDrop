const mongoose = require("mongoose")
const Schema = mongoose.Schema

const companySchema = new Schema({
  title: String,
  normalizedTitle: String,
  vatTitle: String,
  normalizedVatTitle: String,
  itemCode: String,
  phone: String,
  email: String,
  vd: String,
  vatNo: String,
  tcNo: String,
  addresses: [
    {
      title: String,
      normalizedTitle: String,
      line1: String,
      normalizedLine1: String,
      line2: String,
      normalizedLine2: String,
      district: String,
      normalizedDistrict: String,
      city: String,
      normalizedCity: String,
      country: String,
      normalizedCountry: String,
      zip: String,
    },
  ],
  offers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Offer" }], // array of works
})
companySchema.set("timestamps", true)

const Company = mongoose.model("Company", companySchema)

module.exports = Company
