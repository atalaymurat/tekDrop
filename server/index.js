const express = require("express")
const app = express()
const port = 3001
const mongoose = require("mongoose")
const cors = require("cors")

mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error mongodb: "))
db.once("open", function () {
  console.log(`
	--------------------------------
	MongoDb connection status [OK]')
	--------------------------------
			`)
})

app.use(express.json())
// Middlewares
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
}

// cors middleware allow cross-origin requests
app.use(cors(corsOptions))

// Routes
app.use("/", require("./routes"))
app.use("/offers", require("./routes/offers"))
app.use("/products", require("./routes/products"))
app.use("/paints", require("./routes/paints"))
app.use("/formulas", require("./routes/formulas"))
app.use("/search", require("./routes/search"))
app.use("/companies", require("./routes/companies"))
app.use("/orders", require("./routes/orders"))

// 404 catch-all handler (middleware)
app.use((req, res, next) => {
  res.status(404).send("404 not Found")
})

app.listen(port, () => {
  console.log(`Express Server app start listening on port [ ${port} ]`)
})
