var express = require('express');
var router = express.Router();
//const fetch = require('node-fetch');cd
const Travel = require("../models/travel")


router.post('/', (req, res) => {
    const newTravel = new Travel ({
      departure: req.body.departure,
      arrival: req.body.arrival,
      date: req.body.date,
      price: req.body.price,
      cart: req.body.cart,
    })
    newTravel.save().then(data => res.json({ allTravels: [data] }));
    });


module.exports = router;