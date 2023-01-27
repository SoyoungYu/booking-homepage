const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    userid: {
        type: String,
        required: true
    },
    userpw: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);