const router = require("express").Router()
const Applicant = require("../models/Applicants")
const verifytoken = require("../middlewares/verifytoken")


router.post("/applicant", verifytoken, async (req, res) => {
    try {
        const data = req.body
        if (data) {
            const existingapplicant = await Applicant.findOne({ userId: data.userId, jobId: data.jobId, companyId: data.companyId })
            if (existingapplicant) {
                return res.status(201).json({ success: "Applied Successfully" })
            }
            const result = await Applicant.create(data)
            if (result) {
                return res.status(201).json({ success: "Applied successfully", data: result })
            } else {
                return res.status(400).json({ error: "Couldnt create data" })
            }
        } else {
            return res.status(400).json({ error: "didnt recieve the data" })
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
})

router.delete("/applicant", verifytoken, async (req, res) => {
    try {
        const data = req.body
        if (!data) {
            return res.status(400).json({ error: "didnt recieve the data" })
        }
        const result = await Applicant.deleteOne(data)
        if (result.deletedCount > 0) {
            return res.status(201).json({ success: "Application canceled" })
        } else {
            return res.status(400).json({ error: "Couldnt delete it" })
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
})

router.delete("/deleteallapplicants", async (req, res) => {
    try {
        const { id } = req.body
        if (!id) {
            return res.status(400).json({ error: "didnt recieve the data" })
        }
        const result = await Applicant.deleteMany({ userId: id })
        if (result.deletedCount >= 0) {
            return res.status(200).json({ success: "All the applicants deleted successfully" })
        } else {
            return res.status(400).json({ error: "Couldnt delete the applicants" })
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
})

router.post("/getapplicants", verifytoken, async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ error: "Didnt recieve the data" })
        }
        const result = await Applicant.find({ companyId: id }).populate("userId").populate("jobId").populate("companyId")
        if (!result) {
            return res.status(400).json({ error: "Couldnt find the data" })
        }
        if (result.length > 0) {
            let user = result.map(item =>
            ({
                id: item._id,
                Email: item.userId.Email,
                Phonenumber: item.userId.Phonenumber,
                jobid: item.jobId._id,
                Name: item.userId.Fullname,
                Companyid: item.companyId._id,
                Companyname: item.companyId.Companyname
            }))
            return res.status(201).json({ success: "found data successfully", user })
        }

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
})

module.exports = router;