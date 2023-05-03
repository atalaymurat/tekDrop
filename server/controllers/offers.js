const Offer = require(`../models/offer`);
const { calcWorkDimData }  = require("../lib/calculations.js")

module.exports = {
  show: async (req, res, next) => {
    try {
      const offer = await Offer.findById(req.params.id);
      res.status(200).json(offer);
    } catch (err) {
      console.log("ERROR------------------------------");
      res.status(404).send({ error: `there is an error occured` });
    }
  },
  index: async (req, res, next) => {
    try {
      const offers = await Offer.find();
      res.status(200).json(offers);
    } catch (err) {
      res.status(400).json({ success: false });
    }
  },
  update: async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = req.body;
      // CALCULATING TOTAL UNITS  //
      calcWorkDimData(data)
      const doc = await Offer.findByIdAndUpdate(id, data);
      res.status(200).json({ success: true, doc });
    } catch (err) {
      console.log(err);
      res.status(400).json({ success: false });
    }
  },
  create: async (req, res, next) => {
    // const sessionUser = req.session.get('user')
    // if (!sessionUser) return res.status(403)
    console.log(req.body);

    try {
      let data = req.body;
      calcWorkDimData(data)
      let ofr = new Offer(data);
      await ofr.save();
      res.status(200).json({ success: true, ofr });
    } catch (err) {
      res.status(400).json({
        success: false,
        error: err,
      });
    }
  },
  destroy: async (req, res, next) => {
    try {
      let id = req.params.id;
      const doc = await Offer.findByIdAndDelete(id);
      res.status(200).json({ success: true, doc });
    } catch (err) {
      res.status(400).json({
        success: false,
        error: err,
      });
    }
  },
};
