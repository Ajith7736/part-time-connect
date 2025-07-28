const mongoose = require("mongoose")

let AdminSchema = new mongoose.Schema({
    Email : {
        required : true,
        type : String
    },
    Password : {
        required : true,
        type : String
    }
})

const Admin = mongoose.model('Admin',AdminSchema)

module.exports = Admin