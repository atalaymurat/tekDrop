const express = require('express')
const router = express.Router()
const companyController = require('../controllers/companies')


router
  .get('/', companyController.index)
  .post('/', companyController.create)
  .get('/labels', companyController.labels)
  .get('/:id', companyController.show)
  .get('/:id/offers', companyController.offers)
  .patch("/:id", companyController.update)

module.exports = router