
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  try {
    return res.status(200).json({ success: true })
  } catch (err) {
    console.log(err)
    res.end()
  }
})

module.exports = router