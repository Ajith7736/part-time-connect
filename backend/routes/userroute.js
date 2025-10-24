const router = require("express").Router()
const User = require("../models/Users.js")
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const verifytoken = require("../middlewares/verifytoken.js");
const Blocklist = require("../models/Bloclist.js")
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASS
  }
});
const otptemp = {}

router.post("/Signup", async (req, res) => {
  try {
    const userdata = req.body
    const hashedPassword = await bcrypt.hash(userdata.Password, 10)
    const blockeduser = await Blocklist.findOne({ Email: userdata.Email })
    if(blockeduser){
      return res.status(400).json({error : "This Email has been Blocked"})
    }
    const email = await User.findOne({ Email: userdata.Email })
    if (email) {
      return res.status(400).json({ error: "Email Already Exist" })
    }
    const username = await User.findOne({ Username: userdata.Username })
    if (username) {
      return res.status(400).json({ error: "Username Already Exist" })
    }
    const otp = Math.floor(10000 + Math.random() * 90000)
    otptemp[userdata.Email] = { otp, data: { ...userdata, Password: hashedPassword } };
    const emailresult = await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: userdata.Email,
      subject: `Your OTP is ${otp}`,
      html: `<p>Your OTP is <strong>${otp}</strong> for verification</p>`
    });
    if (emailresult.accepted.length > 0) {
      setTimeout(() => {
        if (otptemp[userdata.Email]) {
          otptemp[userdata.Email].otp = null
        }
      }, 120000);
      return res.status(200).json({ success: "OTP Sent to your Email" })
    } else {
      return res.status(400).json({ error: "Something went wrong" })
    }


  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

router.post('/verify-otp', async (req, res) => {
  try {
    const { otp, Email } = req.body
    if (otptemp[Email] && otptemp[Email].otp == otp) {
      await User.create(otptemp[Email].data)
      delete otptemp[Email]
      return res.status(200).json({ success: "User created Successfully" })
    } else {
      return res.status(400).json({ error: "Otp doesnt match" })
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
})

router.post("/resend-otp", async (req, res) => {
  try {
    const { Email } = req.body
    const otp = Math.floor(10000 + Math.random() * 90000)
    otptemp[Email].otp = otp
    const emailresult = await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: Email,
      subject: `Your OTP is ${otp}`,
      html: `<p>Your OTP is <strong>${otp}</strong> for verification</p>`
    });
    if (emailresult.accepted.length > 0) {
      setTimeout(() => {
        if (otptemp[Email]) {
          otptemp[Email].otp = null
        }
      }, 120000);
      return res.status(200).json({ success: "New OTP is Sent" })
    } else {
      return res.status(400).json({ error: "Something went wrong" })
    }

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
})

router.put("/update", verifytoken, async (req, res) => {
  try {
    const { id, Username, Phonenumber, Address } = req.body
    const result = await User.findByIdAndUpdate(id, { Username, Phonenumber, Address }, { new: true })
    if (result) {
      return res.status(200).json({ success: "Updated Successfully", user: { Address: result.Address, Phonenumber: result.Phonenumber, Username: result.Username } })
    }
    return res.status(400).json({ error: "Couldnt update" })
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
})

router.put("/updatepic", verifytoken, async (req, res) => {
  try {
    const { id, data } = req.body;
    if (!data) {
      return res.status(400).json({ error: "Didnt recieve the data" })
    }
    const update = await User.findByIdAndUpdate(id, { Profilepic: data }, { new: true })
    if (update) {
      return res.status(200).json({ success: "Update Successfully" })
    }
    return res.status(400).json({ error: "Coudnt update the profilepic" })
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" })
  }
})

module.exports = router;