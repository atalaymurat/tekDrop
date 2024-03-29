const express = require("express")
const router = express.Router()
const offersController = require("../controllers/offers")

router
  .get("/", offersController.index)
  .get("/chart", offersController.chartData)
  .get("/works/:id", offersController.works)
  .get("/edit/:id", offersController.edit)
  .get("/:id", offersController.show)
  .get("/:id/csv", offersController.csv)
  .post("/", offersController.create)
  .post("/email", offersController.isEmailUnique)
  .patch("/:id", offersController.update)
  .delete("/:id", offersController.destroy)

module.exports = router
