const mongoose = require("mongoose")

let WishlistSchema = new mongoose.Schema({
    userId : {
        type : String,
        required : true
    },
    jobId : {
        type : String,
        required : true
    }
})

const Wishlist = mongoose.model("Wishlist",WishlistSchema)

module.exports = Wishlist