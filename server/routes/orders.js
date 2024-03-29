
const express = require("express")
const router = express.Router()
const ordersController = require("../controllers/orders")

router
  .get("/", ordersController.index)
  .get("/:id", ordersController.show)
  .post("/", ordersController.create)
  .post("/enums", ordersController.enums)
  .patch("/:id", ordersController.update)
  .get("/edit/:id", ordersController.edit)
  .delete("/:id", ordersController.destroy)

module.exports = router
