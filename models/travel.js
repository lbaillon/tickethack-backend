const mongoose = require('mongoose');
const travelSchema = mongoose.Schema({
    departure: String,
    arrival: String,
    date: String,
    price: Number,
    cart: Boolean,
   });
   
   const Travel = mongoose.model('travel', travelSchema);

module.exports = Travel;