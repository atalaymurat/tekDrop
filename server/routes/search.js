const express = require('express')
const router = express.Router()
const searchController = require('../controllers/search')


router
  .post('/', searchController.index)
  .post('/offer', searchController.offer)
  .post('/companies', searchController.companies)

module.exports = router