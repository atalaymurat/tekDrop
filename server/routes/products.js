const express = require('express')
const router = express.Router()
const productsController = require('../controllers/products')


router
  .get('/', productsController.index)
  .post('/', productsController.create)
  .post('/enums', productsController.enums)
  .patch("/:id", productsController.update)
  .get("/edit/:id", productsController.edit)
  .delete("/:id", productsController.destroy)

module.exports = router