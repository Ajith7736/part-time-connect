const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    Fullname: {
        type: String,
        required: true
    }
    , Email: {
        type: String,
        required: true
    }
    , Password: {
        type: String,
        required: true
    }
    , Age : {
        type:Number
    }
    , Gender: {
        type: String
    }
    , Idproof: {
        type: String,
    }
    , Username: {
        type: String,
        required: true
    }
    , dob: {
        type: Date,
    }
    , Phonenumber: {
        type: Number,
    }
    , Address : {
        type: String,
    }
    , Profilepic : {
        type : String,
    }
})

const User = mongoose.model('user', UserSchema);

module.exports = User