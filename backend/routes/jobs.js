const router = require("express").Router()
const verifytoken = require("../middlewares/verifytoken")
const Jobs = require("../models/Jobs")

router.post("/jobs", verifytoken, async (req, res) => {
  try {
    const data = req.body
    if (data) {
      let result = await Jobs.create(data)
      if (result) {
        return res.status(200).json({ success: "Job posted successfully", data: result })
      } else {
        return res.status(400).json({ error: "Couldnt create the job" })
      }
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
})

router.post("/getjobs", verifytoken, async (req, res) => {
  try {
    let jobs = await Jobs.find({})
    if (jobs) {
      return res.status(200).json({ success: "jobs fetched successfully", jobs })
    } else {
      return res.status(400).json({ error: "Not found any jobs" })
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
})

router.post("/getjobwithid", verifytoken, async (req, res) => {
  try {
    let { id } = req.body
    if (!id) {
      return res.status(400).json({ error: "Didnt recieve the data" })
    }
    const job = await Jobs.findOne({ _id: id }).populate("Companyid")
    if (!job) {
      return res.status(400).json({ error: "Couldnt find the job " })
    }
    res.status(200).json({ success: true, job })
  } catch (Err) {
    console.log(Err)
  }
})

router.post("/company/getjobs", async (req, res) => {
  try {
    const { id } = req.body;
    const jobs = await Jobs.find({ Companyid: id });
    if (jobs.length > 0) {
      return res.status(200).json({ success: "jobs fetched successfully", jobs });
    } else {
      return res.status(400).json({ error: "No jobs found" });
    }
  } catch (err) {
    console.error("❌ Error in /getjobs:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

router.put("/company/updatejob", verifytoken, async (req, res) => {
  try {
    const { id } = req.body;
    const { job } = req.body;
    const result = await Jobs.findByIdAndUpdate(id, { ...job }, { new: true })
    if (result) {
      return res.status(200).json({ success: "Updated Successfully", result })
    } else {
      return res.status(400).json({ error: "Couldnt update the data" })
    }

  } catch (err) {
    console.error("❌ Error in /getjobs:", err);
    return res.status(500).json({ error: "Server error" });
  }
})

router.delete("/company/deletejob", verifytoken, async (req, res) => {
  try {
    const { id } = req.body
    const result = await Jobs.deleteOne({ _id: id })
    if (result.deletedCount > 0) {
      return res.status(200).json({ success: "Job deleted successfully" })
    } else {
      return res.status(400).json({ error: "Couldnt delete the job" })
    }

  } catch (err) {
    console.error("❌ Error in /getjobs:", err);
    return res.status(500).json({ error: "Server error" });
  }
})


module.exports = router