import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useMemo } from 'react'
import Jobscard from '../Jobscard'

function Applicants() {
  const companytoken = localStorage.getItem("companytoken")
  const applicants = useSelector(state => state.appliedjob.jobs)
  const [dbapplicants, setdbapplicants] = useState([])
  const [jobs, setjobs] = useState([])
  const [isloading, setisloading] = useState(false)
  const [userdata, setuserdata] = useState([])
  const company = localStorage.getItem("companydata") && JSON.parse(localStorage.getItem("companydata"));
  const navigate = useNavigate()



  useEffect(() => {
    fetchjobs()
    getapplicants()
  }, [])



  const convertto12hours = (time) => {
    const [hourstr, minutes] = time.split(":")
    let hour = parseInt(hourstr)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    hour = hour % 12 || 12;
    return `${hour}:${minutes} ${ampm}`
  }

  const fetchjobs = async () => {
    let res = await fetch("http://localhost:3000/api/company/getjobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${companytoken}`
      },
      body: JSON.stringify({ id: company.companyid })
    })
    let data = await res.json()
    if (res.status == 200) {
      setjobs(data.jobs)
    }
    if (res.status == 400 || res.status == 500) {
      setisloading(false)
    }
    if (res.status == 401) {
      toast.error(data.error)
      localStorage.setItem("company", "Loggedout")
      navigate("/company/login")
    }
  }


  const getapplicants = async (jobid) => {
    let res = await fetch("http://localhost:3000/api/getapplicants",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${companytoken}`
        },
        body: JSON.stringify({ id: company.companyid })
      }
    )
    let data = await res.json()
    if (res.status == 201) {
      setuserdata(data.user)

    } else if (res.status == 401) {
      toast.error(data.error)
      localStorage.setItem("company", "Loggedout")
      navigate("/company/login")
    } else {
      console.log(data.error)
    }
  }



  return (
    <>
      <div className='flex flex-col gap-10  my-10  lg:flex-row lg:wrap-normal  w-full lg:items-start items-center'>
        {jobs.map((job, index) => {
          return <div key={index} >
            <div className='text-3xl font-bold logo text-center  lg:text-4xl'>{job.title}</div>
            <div className='bg-white m-3 rounded-lg py-4 px-6 flex flex-col gap-2'>
              <div className='font-medium '>Description : {job.Description}</div>
              <div className='font-medium '>Salary : {job.Salary}</div>
              <div className='font-medium '>Date Posted : {job.Postedon.split("T")[0]}</div>
              <div className='font-medium '>Date of work : {job.Date.split("T")[0]}</div>
              <div className='font-medium '>Time of work : {convertto12hours(job.startTime)} to {convertto12hours(job.endTime)}</div>
              <div className='font-medium '>Total Workers : {job.WorkersCount}</div>
              <div className='font-medium '>Location : {job.Location} {job.District}</div>
            </div>
            <div className='font-medium logo pl-3 text-xl lg:text-2xl'>Applicants</div>
            <div className='text-xl text-center font-medium hidden'>There are no applicants</div>
            {userdata?.length == 0 && <div className='text-xl text-center font-medium'>There are no applicants</div>}
            {userdata?.map((item, index) => {
              return item.jobid === job._id && <div key={index} className='bg-white m-3 rounded-lg py-4 px-6 lg:px-15 flex justify-between items-center gap-2'>
                <div>
                  <div className='font-medium '>Name : {item.Name}</div>
                  <div className='font-medium '>Email : {item.Email}</div>
                  <div className='font-medium '>Phonenumber : {item.Phonenumber}</div>
                </div>
                <button className='bg-blue-400 text-white font-bold rounded-lg p-2 hover:bg-blue-500'>View Profile</button>
              </div>
            })}
          </div>
        })}
      </div>
    </>

  )
}


export default Applicants
