const router = require("express").Router()
const verifytoken = require("../middlewares/verifytoken")
const Wishlist = require("../models/Wishlist")

router.post("/wishlist", verifytoken, async (req, res) => {
    try {
        const data = req.body
        const existingapplicant = await Wishlist.findOne({ userId: data.userId, jobId: data.jobId })
        if (existingapplicant) {
            return res.status(201).json({ success: "Added to wislist" })
        }
        if (data) {
            const result = await Wishlist.create(data)
            if (result) {
              return  res.status(201).json({ success: "Added to wishlist", data: result })
            } else {
              return  res.status(400).json({ error: "Couldnt create data" })
            }
        } else {
           return res.status(400).json({ error: "didnt recieve the data" })
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
})

router.delete("/wishlist", verifytoken, async (req, res) => {
    try {
        const { userId, jobId } = req.body
        if (!userId || !jobId) {
            return res.status(400).json({ error: "User id or Job id invalid" })
        }
        const result = await Wishlist.deleteOne({ userId, jobId })
        if (result.deletedCount > 0) {
            return res.status(201).json({ success: "Wishlist deleted" })
        } else {
            return res.status(404).json({ error: "Wishlist not found" });
        }

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
})

router.post("/getwishlist", verifytoken, async (req, res) => {
    try {
        const data = req.body
        if (!data) {
            return res.status(400).json({ error: "Data not received" })
        }
        const result = await Wishlist.find({ userId: data.userId })
        if (!result) {
            return res.status(400).json({ error: "Wishlist not found" })
        }
        if (result.length > 0) {
            return res.status(201).json({ success: "Wishlist found", result})
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
})

module.exports = router