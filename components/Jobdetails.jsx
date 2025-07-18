import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from './Loading'
import { useNavigate } from 'react-router-dom'
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Jobdetails() {
  const navigate = useNavigate()
  const { jobid } = useParams()
  const user = localStorage.getItem("userdata") ? localStorage.getItem("userdata") : ""
  const token = localStorage.getItem("token")
  const [jobdata, setjobdata] = useState({})
  const [isloading, setisloading] = useState(true)

  // timeout for loading

  useEffect(() => {
    setTimeout(() => {
      setisloading(!isloading)
    }, 300);
  }, [])



  // change the 24 hrs to AM & PM

  const timechange = (time) => {
    let [hour, minutes] = time.split(":")
    let hourtime = parseInt(hour)
    let ampm = hourtime >= 12 ? "PM" : "AM";
    let newtime = hourtime % 12 || 12
    return `${newtime}:${minutes} ${ampm}`
  }

  // get particular job

  useEffect(() => {
    if (jobid) {
      getjob()
    }
  }, [])

  // fetch the job from the db

  const getjob = async () => {
    let res = await fetch(`${BASE_URL}/api/getjobwithid`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ id: jobid })
    })
    let data = await res.json()
    if (res.status == 200) {
      const starttime = timechange(data.job.startTime)
      const endtime = timechange(data.job.endTime)
      return setjobdata({ ...data.job, startTime: starttime, endTime: endtime })
    }
    if (res.status == 400 || res.status == 500) {
      console.error(data.error)
    }
    if (res.status == 401) {
      localStorage.setItem("user", "Loggedout")
      navigate("/login")
    }
  }

  return (
    <>
      {isloading && <> <div className='text-center fixed w-full h-[90vh]'><Loading /></div></>}
      <div className='min-h-[90vh] max-h-auto bg-gray-100 p-5 flex flex-col items-center gap-8'>
        <div className='company bg-white w-[80vw] h-[40vh] shadow-lg p-5 rounded-2xl flex flex-col items-center gap-3 justify-center'>
          <img src="/man.png" className='w-25 h-25  outline-purple-500 outline-4 rounded-full shadow-lg' alt="" />
          <h1 className='text-blue-500 logo text-2xl text-center'>{jobdata.Companyid?.Companyname}</h1>
          <h1 className='text-blue-500 font-medium text-lg text-center'>Email : {jobdata.Companyid?.Email}</h1>
          <h1 className='text-blue-500 font-medium text-lg'>Phone : {jobdata.Companyid?.Phonenumber}</h1>
          <h1 className='text-blue-500 font-medium text-lg'>Location : {jobdata.Companyid?.Address}</h1>
        </div>
        <div className="job bg-white w-[80vw] h-auto p-5 flex flex-col rounded-2xl shadow-lg">
          {Object.entries(jobdata).map(
            ([key, value]) =>
              key !== "Companyid" && key !== "_id" && key !== "Companyname" && key !== "__v" && (
                <div key={key}>
                  <div className='text-blue-500 logo text-2xl mb-1'>{key === "title" && value}</div>
                  {key !== "title" && <div className='font-medium text-blue-500'> {key} : {key === "Date" || key === "Postedon" ? value.split("T")[0] : value}</div>}
                </div>
              )
          )}

        </div>
      </div>
    </>
  )
}

export default Jobdetails
