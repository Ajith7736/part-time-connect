const mongoose = require("mongoose")

let AdminSchema = new mongoose.Schema({
    Email : {
        required : true,
        type : String
    },
    Password : {
        required : true,
        type : String
    },
    Role : {
        type : String,
        default : "Admin"
    }
})

const Admin = mongoose.model('Admin',AdminSchema)

module.exports = Admin