const Offer = require(`../models/offer`)

module.exports = {
  show: async (req, res, next) => {
    try {
      const offer = await Offer.findById(req.params.id)
      res.status(200).json(offer)
    } catch (err) {
      console.log("ERROR------------------------------")
      res.status(404).send({ error: `there is an error occured` })
    }
  },
  index: async (req, res, next) => {
    try {
      const offers = await Offer.find()
      res.status(200).json(offers)
    } catch (err) {
      res.status(400).json({ success: false })
    }
  },
  update: async (req, res, next) => {
    try {
      const id = req.params.id
      const data = req.body
      const doc = await Offer.findByIdAndUpdate(id, data)
      console.log("ID TO UPDATE", doc)
      res.status(200).json({ success: true, doc })
    } catch (err) {
      res.status(400).json({ success: false })
    }
  },
  create: async (req, res, next) => {
    // const sessionUser = req.session.get('user')
    // if (!sessionUser) return res.status(403)
    console.log(req.body)

    try {
      let data = req.body
      let ofr = new Offer(data)
      console.log(ofr)
      await ofr.save()
      res.status(200).json({ success: true, ofr })
    } catch (err) {
      res.status(400).json({
        success: false,
        error: err,
      })
    }
  },
  destroy: async (req, res, next) => {
    try {
      let id = req.params.id
      const doc = await Offer.findByIdAndDelete(id)
      res.status(200).json({ success: true, doc })
    } catch (err) {
      res.status(400).json({
        success: false,
        error: err,
      })
    }
  },
}
