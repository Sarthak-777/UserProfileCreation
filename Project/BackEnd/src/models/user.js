const mongoose = require('mongoose');

const users = new mongoose.Schema({
    userName : {
        type: String,
        required: true
    },
    email: {
        type:String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

//now we create collection
const registerUser = new mongoose.model("Register",users);

module.exports = registerUser;