const router = require("express").Router()
const Admin = require("../models/Admin")
const Users = require("../models/Users")
const Company = require("../models/company")

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
        if(result){
            return res.status(200).json({ success : "Admin Created Successfully "})
        }
        

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" })
    }
})

router.post("/admin/getusers",async (req,res)=>{
    try{
        let users = await Users.find({})
        if(!users){
            return res.status(400).json({error : "There are no users"})
        }
        users = users.map((item)=>{
            return {
                Email : item.Email,
                Name : item.Fullname,
                Phonenumber : item.Phonenumber,
                Address : item.Address
            }
        })
        res.status(200).json({success : true,users})
    }catch(err){
        console.error(err);
        res.status(500).json({error : "Server Error"})
    }
})

router.post("/admin/getcompanies",async (req,res)=>{
    try{
        let companies = await Company.find({})
        if(!companies){
            return res.status(400).json({error : "There are no users"})
        }
        companies = companies.map((item)=>{
            return {
                Email : item.Email,
                Name : item.Companyname,
                Phonenumber : item.Phonenumber,
                Address : item.Address
            }
        })
        res.status(200).json({success : true,companies})
    }catch(err){
        console.error(err);
        res.status(500).json({error : "Server Error"})
    }
})



module.exports = router;