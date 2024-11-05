const mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
//const fetch = require('node-fetch');
const Travel = require("../models/travel")

// route Get pour récupérer tout les voyages dispo pour un départ et une arrivée donnée en fonction de la date
router.get("/travel/:departure/:arrival/:date", (req,res) => {
    const travelDep= req.params.departure
    const travelArr = req.params.arrival
    const dateDep = req.params.date
    Travel.find({
        departure:  { $regex: new RegExp(travelDep, 'i') },
        arrival: { $regex: new RegExp(travelArr, 'i') },
        date: dateDep
    }).then(tarvelsFound => {
        if (tarvelsFound){
            res.json({result: true, travels: tarvelsFound})
        }else {
            res.json({result: false, error: "No trip found."})
        }
    })
})

router.get("/", (req,res) => {
    Travel.find().then(data => {res.json({travels : data})})
})

module.exports = router;