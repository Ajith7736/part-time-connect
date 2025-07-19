const router = require("express").Router()
const Company = require("../models/company")
const nodemailer = require("nodemailer")
const bcrypt = require("bcrypt")
require("dotenv").config()
let datatemp = {}


const transporter = nodemailer.createTransport({
  service: 'gmail', // or your email provider
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASS
  }
});


router.post("/company/signup", async (req, res) => {
  try {
    const data = req.body
    const existinguser = await Company.findOne({ Email: data.Email })
    if (existinguser) {
      return res.status(400).json({ error: "Company already exist" })
    }
    const otp = Math.floor(10000 + Math.random() * 90000)
    const bcryptpassword = await bcrypt.hash(data.Password, 10)
    datatemp[data.Email] = { otp, data: { ...data, Password: bcryptpassword } }

    const emailresult = await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: data.Email,
      subject: `Your OTP is ${otp}`,
      html: `<p>Your OTP is <strong>${otp}</strong> for verification</p>`
    });

    if (emailresult.accepted.length) {
      setTimeout(() => {
        if (datatemp[data.Email]) {
          datatemp[data.Email].otp = null
        }
      }, 120000);
      return res.status(200).json({ success: "otp sent !" })
    } else {
      return res.status(400).json({ error: "Couldnt sent otp !" })
    }



  } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
})

router.post("/company/verify-otp", async (req, res) => {
  try {
    const { otp, Email } = req.body
    if (!otp || !Email) {
      return res.status(400).json({ error: "Didnt recieve the data" })
    }

    if (datatemp[Email] && datatemp[Email].otp == otp) {
      const result = await Company.create(datatemp[Email].data)
      if (!result) {
        return res.status(400).json({ error: "Couldnt Register" })
      }
      delete datatemp[Email]
      return res.status(200).json({ success: "User created Successfully" })
    } else {
      return res.status(400).json({ error: "Otp doesnt match !" })
    }

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
})

router.post("/company/resend-otp", async (req, res) => {
  try {
    const { Email } = req.body
    const otp = Math.floor(10000 + Math.random() * 90000)
    datatemp[Email].otp = otp
    const emailresult = await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: Email,
      subject: `Your OTP is ${otp}`,
      html: `<p>Your OTP is <strong>${otp}</strong> for verification</p>`
    });
    if (emailresult.accepted.length > 0) {
      setTimeout(() => {
        if (datatemp[Email]) {
          datatemp[Email].otp = null
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

module.exports = router;