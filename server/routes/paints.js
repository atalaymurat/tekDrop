const express = require('express')
const router = express.Router()
const paintsController = require('../controllers/paints')


router
  .get('/', paintsController.index)
  .post('/', paintsController.create)
  .patch("/:id", paintsController.update)
  .get("/edit/:id", paintsController.edit)
  .delete("/:id", paintsController.destroy)

module.exports = router