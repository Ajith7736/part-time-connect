const jwt = require("jsonwebtoken")
require("dotenv").config()
const JWT_SECRET = process.env.JWT_SECRET

const verifytoken = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(400).json({ error: "Access denied" })
    }


    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        const currentTime = Math.floor(Date.now() / 1000); // in seconds
        const remainingSeconds = decoded.exp - currentTime;
        const remainingMinutes = Math.floor(remainingSeconds / 60);
        console.log(`Token has ${remainingMinutes} minute(s) remaining.`);
        next();
    } catch (err) {
        res.status(401).json({ error: "Invalid or expired token" })
    }
};

module.exports = verifytoken;