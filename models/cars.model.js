const mongoose = require('mongoose');

// schema for cars database
const CarsSchema = mongoose.Schema({
    model: {
       type: String,
       required: true 
    },
    make: {
        type: String,
        required: true 
     },
     color: {
        type: String,
        required: true 
     },
     reg_number: {
        type: String,
        required: true 
     },
     owner: {
        type: String,
        required: true 
     },
     address: {
        type: String,
        required: true 
     },
     section: {
        type: String,
        required: true 
     }
});

module.exports = mongoose.model('Cars', CarsSchema);