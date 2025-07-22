const router = require("express").Router()
const bcrypt = require("bcrypt")
const User = require("../models/Users.js")
const jwt = require("jsonwebtoken")
const verifytoken = require("../middlewares/verifytoken.js")
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET

router.post("/Login", async (req, res) => {
    try {
        const data = req.body

        const user = await User.findOne({ Email: data.Email })

        if (!user) {
            return res.status(400).json({ error: "Invalid Email or Password" });
        }

        const ismatch = await bcrypt.compare(data.Password, user.Password)
        if (!ismatch) {
            return res.status(400).json({ error: "Invalid Email or Password" });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" })

        return res.status(200).json({
            success: "Login Successfull",
            token,
            result:
            {
                id: user._id.toString(),
                Username: user.Username,
                Email: user.Email,
                Phonenumber: user.Phonenumber,
                Address: user.Address,
                Profilepic: user.Profilepic            }
        })
    }
    catch (err) {
        res.status(500).json({ error: "Signup error" })
        console.log(err)
    }
});

router.post("/getuser", verifytoken, async (req, res) => {
    try {
        let { Id } = req.body
        let user = await User.findOne({ _id: Id })
        if (user) {
            return res.status(200).json(
                {
                    data: {
                        Email: user.Email,
                        Name: user.Fullname,
                        Phonenumber: user.Phonenumber,
                        id: user._id
                    }
                })
        } else {
            return res.status(400).json({ error: "No user found" })
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
})

module.exports = router;