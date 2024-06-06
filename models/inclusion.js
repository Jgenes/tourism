const mongoose = require('mongoose')

const rateSchema = new mongoose.Schema({
  startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
 
    tour: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour' } 
})

const Rates = mongoose.model('Rates', rateSchema);
module.exports = Rates;
