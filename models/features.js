const mongoose = require('mongoose')

const featureSchema = new mongoose.Schema({
   feature: {
        type: String,
        required: true
    },
 
    description: {
        type: String,
        required: true
    },
 
    tour: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour' } 
})

const Features = mongoose.model('Features', featureSchema);
module.exports = Features;
