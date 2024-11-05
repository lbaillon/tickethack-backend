const mongoose = require("mongoose");
var express = require("express");
var router = express.Router();
//const fetch = require('node-fetch');
const Travel = require("../models/travel");
var moment = require("moment");


// route Get pour récupérer tout les voyages dispo pour un départ et une arrivée donnée en fonction de la date
router.get("/:departure/:arrival/:date", (req, res) => {
  const travelDep = req.params.departure;
  const travelArr = req.params.arrival;
  const travelDate = moment(req.params.date).format("YYYY-MM-DD"); //formatage de la date passée en paramètre
  Travel.find({
    //pour ressortir un tableau de tout les travels avec départ et arrivée passé en paramètre
    departure: { $regex: new RegExp(travelDep, "i") },
    arrival: { $regex: new RegExp(travelArr, "i") },
  }).then((tarvelsFound) => {
    if (tarvelsFound.length === 0) {
      res.json({ result: false, error: "No trip found." });
    } else {
      //filtre du tableau avec la date passée en paramètre : formatage de la date dans les travels trouvés
      const travelsOnDate = tarvelsFound.filter(
        (travel) => moment(travel.date).format("YYYY-MM-DD") === travelDate
      );
      res.json({ result: true, travels: travelsOnDate });
    }
  });
});


// route GET pour récupérer tout les voyages
router.get("/", (req, res) => {
  Travel.find().then((data) => {
    res.json({ travels: data });
  });
});


// route put pour passer booking à true si cart = true
router.put("/booking/:id", (req, res) => {
    Travel.updateOne(
        { _id: req.params.id},
        { booking: true }
       ).then((data) => {
        res.json({ travelBooked: data });
        });
    })





// route put pour passer booking à true si cart = true
router.put("/booking/:id", (req, res) => {
    Travel.updateOne(
        { _id: req.params.id},
        { booking: true }
       ).then((data) => {
        res.json({ travelBooked: data });
        });
    })




// route pour la cart True
router.put("/cartTrue/:id", (req,res) => {
    Travel.updateOne(
        { _id: req.params.id},
        { cart: true }
       ).then((data) => {
        res.json({ travelInCart: data });
        });
       
       });

// route pour la cart False
router.put("/cartFalse/:id", (req,res) => {
    Travel.updateOne(
        { _id: req.params.id},
        { cart: false }
       ).then((data) => {
        res.json({ travelInCart: data });
        });
       
       });

module.exports = router;
