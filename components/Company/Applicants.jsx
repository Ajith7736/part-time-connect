import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useMemo } from 'react'
import Jobscard from '../Jobscard'
import { CiEdit } from "react-icons/ci";
import { useRef } from 'react'

function Applicants() {
  const companytoken = localStorage.getItem("companytoken")
  const applicants = useSelector(state => state.appliedjob.jobs)
  const [dbapplicants, setdbapplicants] = useState([])
  const [jobs, setjobs] = useState([])
  const [isloading, setisloading] = useState(false)
  const [userdata, setuserdata] = useState([])
  const [todaydate, settodaydate] = useState("")
  const [edittingjobid, setedittingjobid] = useState(null)
  const company = localStorage.getItem("companydata") && JSON.parse(localStorage.getItem("companydata"));
  const navigate = useNavigate()
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchjobs()
    getapplicants()
    today()
  }, [])



  const convertto12hours = (time) => {
    const [hourstr, minutes] = time.split(":")
    let hour = parseInt(hourstr)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    hour = hour % 12 || 12;
    return `${hour}:${minutes} ${ampm}`
  }

  const fetchjobs = async () => {
    let res = await fetch(`${BASE_URL}/api/company/getjobs`, {
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

  const today = () => {
    const date = new Date().toISOString().split("T")[0]
    settodaydate(date)
  }


  const getapplicants = async (jobid) => {
    let res = await fetch(`${BASE_URL}/api/getapplicants`,
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

  const deletejob = async (id) => {
    let res = await fetch(`${BASE_URL}/api/company/deletejob`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${companytoken}`
      },
      body: JSON.stringify({ id })
    })
    let data = await res.json()
    if (res.status === 200) {
      window.location.reload()
      return toast.success(data.success)
    }
    if (res.status === 400 || res.status === 500) {
      return toast.error(data.error)
    }
    if (res.status === 401) {
      toast.error(data.error)
      localStorage.setItem("company", "Loggedout")
      navigate("/company/login")
    }
  }

  const updatejob = async (id) => {
    let job = jobs.find((item) => {
      if (item._id === id) {
        return item
      }
    })
    let res = await fetch(`${BASE_URL}/api/company/updatejob`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${companytoken}`
      },
      body: JSON.stringify({ id, job })
    })
    let data = await res.json()
    if (res.status === 200) {
      return toast.success(data.success)
    }
    if (res.status === 400 || res.status === 500) {
      return toast.error(data.error)
    }
    if (res.status === 401) {
      toast.error(data.error)
      localStorage.setItem("company", "Loggedout")
      navigate("/company/login")
    }
  }


  const handleinput = (e, id) => {
    if (edittingjobid === id) {
      setedittingjobid(null)
    } else {
      setedittingjobid(id)
    }
  }

  const handlechange = (e, id) => {
    const updatedjobs = jobs.map((item) => {
      if (item._id == id) {
        return {
          ...item,
          [e.target.id]: e.target.value
        }
      }
      return item;
    })
    setjobs(updatedjobs)
  }

  const normalizeTime = (time) => {
    if (!time) return "00:00"
    const [h, m] = time.split(":")
    const hour = h.padStart(2, "0")
    const minutes = m.padStart(2, "0")
    return `${hour}:${minutes}`
  }

  const handleupdate = (id) => {
    updatejob(id)
  }

  return (
    <>
      <div className='flex flex-col gap-10  my-10   lg:wrap-normal  w-full lg:items-center items-center'>
        {jobs.map((job, index) => {
          return <div key={index} >
            <div className='text-3xl font-bold logo text-center  lg:text-4xl'>{job.title}</div>
            <div id={job.title} className=' bg-white m-3 rounded-lg py-4 px-6 flex flex-col gap-2 w-[76vw] lg:w-[70vw] items-start'>
              <div className='font-medium flex gap-1 items-center'>
                <div className='flex items-center gap-4'>
                  Job title :<div>{edittingjobid === job._id ? <><input type="text" id='title' value={job.title} onChange={(e) => { handlechange(e, job._id) }} className='bg-gray-100 focus:outline-none p-1 rounded-lg' /></> : job.title}</div>
                </div>
              </div>
              <div className='font-medium flex gap-1 items-center'>
                <div className='max-w-[90%]'>
                  <div>Description : {edittingjobid === job._id ? <><textarea type="text" id='Description' value={job.Description} onChange={(e) => { handlechange(e, job._id) }} className='bg-gray-100 focus:outline-none p-1 rounded-lg w-[65vw] h-[12vh]' /></> : job.Description}</div>
                </div>
              </div>
              <div className='font-medium flex gap-1 items-center'>
                <div className='flex items-center gap-4'>
                  Salary :<div>{edittingjobid === job._id ? <><input type="text" id='Salary' value={job.Salary} onChange={(e) => { handlechange(e, job._id) }} className='bg-gray-100 focus:outline-none p-1 rounded-lg' /></> : job.Salary}</div>
                </div>
              </div>
              <div className='font-medium flex gap-1 items-center'>
                <div className='flex items-center gap-4'>
                  Posted Date :<div>{job.Postedon.split("T")[0]}</div>
                </div>
              </div>
              <div className='font-medium flex gap-1 items-center'>
                <div className='flex items-center gap-4'>
                  Date of Work :<div>{edittingjobid === job._id ? <><input type="date" id='Date' min={todaydate} value={job.Date.split("T")[0]} onChange={(e) => { handlechange(e, job._id) }} className='bg-gray-100 focus:outline-none p-1 rounded-lg' /></> : job.Date.split("T")[0]}</div>
                </div>
              </div>
              <div className='font-medium flex gap-1 items-center'>
                <div className='flex items-center gap-4'>
                  Start Time :<div>{edittingjobid === job._id ? <><input type="time" id='startTime' value={normalizeTime(job.startTime)} onChange={(e) => { handlechange(e, job._id) }} className='bg-gray-100 focus:outline-none p-1 rounded-lg' /></> : convertto12hours(job.startTime)}</div>
                </div>
              </div>
              <div className='font-medium flex gap-1 items-center'>
                <div className='flex items-center gap-4'>
                  End Time :<div>{edittingjobid === job._id ? <><input type="time" id='endTime' value={normalizeTime(job.endTime)} onChange={(e) => { handlechange(e, job._id) }} className='bg-gray-100 focus:outline-none p-1 rounded-lg' /></> : convertto12hours(job.endTime)}</div>
                </div>
              </div>
              <div className='font-medium flex gap-1 items-center'>
                <div className='flex items-center gap-4'>
                  Total Workers :<div>{edittingjobid === job._id ? <><input type="number" id='WorkersCount' value={job.WorkersCount} onChange={(e) => { handlechange(e, job._id) }} className='bg-gray-100 focus:outline-none p-1 rounded-lg' /></> : job.WorkersCount}</div>
                </div>
              </div>
              <div className='font-medium flex gap-1 items-center'>
                <div className='flex items-center gap-4'>
                  Location :<div>{edittingjobid === job._id ? <><input type="text" id='Location' value={job.Location} onChange={(e) => { handlechange(e, job._id) }} className='bg-gray-100 focus:outline-none p-1 rounded-lg' /></> : job.Location}</div>
                </div>
              </div>
              <div className='font-medium flex gap-1 items-center'>
                <div className='flex items-center gap-4'>
                  District : <div>{edittingjobid === job._id ? <><input type="text" id='Salary' value={job.District} onChange={(e) => { handlechange(e, job._id) }} className='bg-gray-100 focus:outline-none p-1 rounded-lg' /></> : job.District}</div>
                </div>
              </div>
              <div className='font-medium flex gap-1 items-center'>
                <div className='flex items-center gap-4'>
                  Status : <div>{edittingjobid === job._id ? <>
                    <select id='status' value={job.status} onChange={(e) => { handlechange(e, job._id) }} className='bg-gray-100 focus:outline-none p-1'>
                      <option value="Active">Active</option>
                      <option value="Closed">Closed</option>
                    </select></> : job.status}</div>
                </div>
              </div>
              <div className='flex gap-3'>
                <div onClick={(e) => handleinput(e, job._id)} className='flex cursor-pointer items-center justify-center gap-1 bg-gray-900 text-white font-bold px-2 py-1 rounded-lg'>
                  {edittingjobid === job._id ? <div className='px-2' onClick={() => handleupdate(job._id)}>Submit</div> : <>Edit job <CiEdit size={32} className=' font-bold rounded-lg p-1 cursor-pointer' /></>}
                </div>
                <button className='bg-gray-900 text-white font-bold px-2 py-1 rounded-lg' onClick={() => deletejob(job._id)}>Delete job</button>
              </div>
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
