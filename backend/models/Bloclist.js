const mongoose = require("mongoose")

let BlocklistSchema = new mongoose.Schema({
    Email : {
        required : true,
        type : String
    }
})

const Blocklist = mongoose.model('Blocklist',BlocklistSchema)

module.exports = Blocklist;