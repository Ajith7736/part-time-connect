const mongoose = require("mongoose")

const CompanySchema = new mongoose.Schema({
    Companyname : {
        type : String,
        required : true
    },
    Email : {
        type : String,
        required : true
    },
    Password : {
        type : String,
        required : true
    },
    Address : {
        type : String,
        required : true
    },
    Phonenumber : {
        type : Number,
        required : true
    },
})

const Company = mongoose.model("Company",CompanySchema)

module.exports = Company;