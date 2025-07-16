const mongoose = require("mongoose")

let JobsSchema = new mongoose.Schema({
    Companyid: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Company"
    },
    Companyname : {
        type : String,
        required : true
    },
    title: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Location: {
        type: String,
        required: true
    },
    District: {
        type: String,
        required: true
    },
    Date: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    Salary: {
        type: Number,
        required: true
    },
    WorkersCount: {
        type: Number,
        required: true
    },
    Postedon : {
        type : Date,
        default : Date.now
    },
    status : {
        type : String,
        default : "Active"
    }
})

const Jobs = mongoose.model("Jobs", JobsSchema)

module.exports = Jobs