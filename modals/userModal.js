const mongoose = require('mongoose');


const User = mongoose.model('User', {
    username: String,
    email: String,
    contact: String,
    password: String
});


module.exports = User