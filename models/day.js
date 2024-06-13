const mongoose = require('mongoose')

const daySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    tour: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour' } 
})

const Day = mongoose.model('Day', daySchema);
module.exports = Day;
