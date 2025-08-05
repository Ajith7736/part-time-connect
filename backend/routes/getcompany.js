const router = require("express").Router()
const bcrypt = require("bcrypt")
const Company = require("../models/company")
const jwt = require("jsonwebtoken")
const verifytoken = require("../middlewares/verifytoken")
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET

router.post("/company/Login", async (req, res) => {
  try {
    const data = req.body;

    const user = await Company.findOne({ Email: data.Email })

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
        companyid: user._id.toString(),
        Companyname: user.Companyname,
        Email: user.Email,
        Phonenumber: user.Phonenumber,
        Address: user.Address,
        Profilepic: user.Profilepic
      }
    })
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

router.put("/company/update", verifytoken, async (req, res) => {
  try {
    const { id, Companyname, Phonenumber, Address } = req.body
    const result = await Company.findByIdAndUpdate(id, { Companyname, Phonenumber, Address }, { new: true })
    if (result) {
      return res.status(200).json({ success: "Updated Successfully", user: { Address: result.Address, Phonenumber: result.Phonenumber, Companyname: result.Companyname } })
    }
    return res.status(400).json({ error: "Couldnt update" })
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
})

router.put("/company/updateprofilepic", verifytoken, async (req, res) => {
  try {
    const { image, id } = req.body;
    if (!image) {
      return res.status(400).json({ error: "Didnt recieve the data" })
    }
    const result = await Company.findByIdAndUpdate(id, { Profilepic: image }, { new: true })
    if (result) {
      return res.status(200).json({ success: "Updated Successfully" })
    } else {
      return res.status(400).json({ error: "Couldnt Update" })
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" })
  }
})

module.exports = router;