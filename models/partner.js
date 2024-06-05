const mongoose = require('mongoose')

const partnerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'pending'],
        default: 'pending',
      },
});

const Partner = mongoose.model('Partner', partnerSchema);
module.exports = Partner;
