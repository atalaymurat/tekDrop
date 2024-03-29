const express = require("express")
const router = express.Router()
const formulasController = require("../controllers/formulas")

router
  .get("/", formulasController.index)
  .get("/edit/:id", formulasController.edit)
  .get("/:id", formulasController.show)
  .post("/", formulasController.create)
  .patch("/:id", formulasController.update)
  .post('/enums', formulasController.enums)
  .delete("/:id", formulasController.destroy)

module.exports = router
