const mongoose = require("mongoose")

let ApplicantSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true
    },
    jobId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Jobs",
        required : true
    },
    companyId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Company",
        required : true
    }
})

const Applicant = mongoose.model("Applicant",ApplicantSchema)

module.exports = Applicant