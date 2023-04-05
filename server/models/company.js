const mongoose = require('mongoose')
const Schema = mongoose.Schema


const companySchema = new Schema({
  name: String,
  itemCode: String,
  Phone: String,
  email: String,
  vd: String,
  vatNo: String,
  address: {
    line1: String,
    line2: String,
    district: String,
    city: String,
    zip: String
  }
}
)
offerSchema.set('timestamps', true)

const company = mongoose.model('company', offerSchema)

module.exports = Company