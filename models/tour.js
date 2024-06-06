const mongoose = require('mongoose')

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    overview: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    users: {
        type: String,
        required: true
    }
})

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
