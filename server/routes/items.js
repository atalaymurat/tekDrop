const express = require("express")
const router = express.Router()
const itemsController = require("../controllers/items")

router
  .get("/", itemsController.index)
  .post("/", itemsController.create)
  .post("/enums", itemsController.enums)
  .patch("/:id", itemsController.update)
  .get("/edit/:id", itemsController.edit)
  .delete("/:id", itemsController.destroy)

module.exports = router
