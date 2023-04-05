const express = require('express')
const router = express.Router()
const offersController = require('../controllers/offers')


router
  .get('/', offersController.index)
  .get("/:id", offersController.show)
  .post('/', offersController.create)
  .patch("/:id", offersController.update)
  .delete("/:id", offersController.destroy)

module.exports = router