const router = require("express").Router()
const Admin = require("../models/Admin")
const Users = require("../models/Users")
const Company = require("../models/company")
const Blocklist = require("../models/Bloclist")
const User = require("../models/Users")
const Jobs = require("../models/Jobs")

router.post('/admin/login', async (req, res) => {
    try {
        const data = req.body
        if (!data) {
            return res.status(400).json({ error: "Didnt recieve the data" })
        }
        const result = await Admin.findOne({ Email: data.Email, Password: data.Password })
        if (!result) {
            return res.status(400).json({ error: "Invalid Username or Password" })
        }
        res.status(200).json({ success: "Login Successfull" })
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
})

router.post('/admin/addadmin', async (req, res) => {
    try {
        const data = req.body;
        if (!data) {
            return res.status(400).json({ error: "Didnt recieve the data" })
        }
        const alreadyuser = await Admin.findOne({ Email: data.Email })
        if (alreadyuser) {
            return res.status(400).json({ error: "Admin already exist" })
        }
        const result = await Admin.create(data)
        if (result) {
            return res.status(200).json({ success: "Admin Created Successfully " })
        }


    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" })
    }
})

router.post("/admin/getusers", async (req, res) => {
    try {
        let users = await Users.find({})
        if (!users) {
            return res.status(400).json({ error: "There are no users" })
        }
        users = users.map((item) => {
            return {
                Email: item.Email,
                Name: item.Fullname,
                Phonenumber: item.Phonenumber,
                Address: item.Address
            }
        })
        res.status(200).json({ success: true, users })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server Error" })
    }
})

router.post("/admin/getcompanies", async (req, res) => {
    try {
        let companies = await Company.find({})
        if (!companies) {
            return res.status(400).json({ error: "There are no users" })
        }
        companies = companies.map((item) => {
            return {
                Email: item.Email,
                Name: item.Companyname,
                Phonenumber: item.Phonenumber,
                Address: item.Address
            }
        })
        res.status(200).json({ success: true, companies })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server Error" })
    }
})


router.post("/admin/addblocklist", async (req, res) => {
    try {
        const { Email } = req.body;
        if (!Email) {
            return res.status(400).json({ error: "Didnt recieve the Email" })
        }
        const result = await Blocklist.create({ Email });
        if (result) {
            return res.status(200).json({ success: "Successfully blocked this user" })
        } else {
            return res.status(400).json({ error: "Couldnt add this user to blocklist" })
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server Error" })
    }
})

router.post("/admin/deleteuser", async (req, res) => {
    try {
        const { Email } = req.body;
        if (!Email) {
            return res.status(400).json({ error: true })
        }
        const result = await User.deleteOne({ Email })
        if (result.deletedCount > 0) {
            return res.status(200).json({ success: true })
        } else {
            return res.status(400).json({ error: true })
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server Error" });
    }
})

router.post("/admin/deletecompany", async (req, res) => {
    try {
        const { Email } = req.body;
        if (!Email) {
            return res.status(400).json({ error: true })
        }
        const result = await Company.deleteOne({ Email });
        if (result.deletedCount > 0) {
            return res.status(200).json({ success: true })
        } else {
            return res.status(400).json({ error: true })
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server Error" })
    }
})

router.post("/admin/getnumbers", async (req, res) => {
    try {
        const users = await User.countDocuments({});
        const companies = await Company.countDocuments({});
        const jobs = await Jobs.countDocuments({});
        const activejobs = await Jobs.countDocuments({ status: "Active" });
        const blocklist = await Blocklist.countDocuments({})
        const inactivejobs = await Jobs.countDocuments({ status: "Inactive" })
        res.status(200).json({users,companies,jobs,activejobs,blocklist,inactivejobs})
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server Error" })
    }
})



module.exports = router;