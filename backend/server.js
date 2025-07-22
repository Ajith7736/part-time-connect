const express =  require("express")
const connectdb = require('./connectdb.js')
const userroute = require("./routes/userroute.js")
const getuser = require("./routes/getuser.js")
const jobs = require("./routes/jobs.js")
const wishlists = require("./routes/wishlists.js")
const applicants = require("./routes/applicants.js")
const companyroute = require("./routes/companyroute.js");
const getcompany = require("./routes/getcompany.js")
const cors = require('cors');
require("dotenv").config()
const app = express()
const port = process.env.PORT || 5050

connectdb()

app.use(cors());

app.use(cors({
  origin: ['https://part-time-connect.vercel.app'], // or use "*" temporarily to test
  credentials: true, // only if you're using cookies
}));

app.options('*', cors()); // handles preflight


app.use(express.json());


app.use('/api',userroute)

app.use('/api',getuser)

app.use('/api',jobs)

app.use('/api',wishlists)

app.use('/api',applicants)

app.use('/api',companyroute);

app.use('/api',getcompany)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
