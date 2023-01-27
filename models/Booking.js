const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
    membership: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    tel: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: false,
        default: null
    }
});

module.exports = mongoose.model('Booking', bookingSchema);