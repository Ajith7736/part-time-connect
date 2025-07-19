import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { deleteappliedjobs } from '../src/redux/appliedJobSlice'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { clearappliedjobs } from '../src/redux/appliedJobSlice'
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Jobs() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const appliedjobs = useSelector(state => state.appliedjob.jobs)
  const user = localStorage.getItem("userdata") ? localStorage.getItem("userdata") : ""
  const token = localStorage.getItem("token")
  const userlog = localStorage.getItem("user")


  // delete the job from applicants

  const deletejob = async (id) => {
        try {
            let res = await fetch(`${BASE_URL}/api/applicant`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }, body: JSON.stringify({ userId: user.id, jobId: id })
            })
            let data = await res.json()
            if (res.status == 200) {
                toast.success(data.success)
            }
            if (res.status == 400 || res.status == 500) {
                toast.error(data.error)
            }
            if(res.status == 401){
                localStorage.setItem("user","Loggedout")
                navigate("/login")
            }
        } catch (err) {
            console.log(err)
        }
    }

  // delete the job from appliedjobs

  const handlecancel = (e,id) => {
    dispatch(deleteappliedjobs(id))
    deletejob(id)
  }

  return (
    <div>
      <div className='p-4 h-[90vh] bg-gray-100'>
        <div className='text-2xl font-bold logo text-center'>Job History</div>
        <div className='jobs flex flex-col items-center'>
          {appliedjobs.length == 0 && <><div className='text-xl font-medium mt-10'>There is no applied jobs</div></>} 
          {appliedjobs.map((item,index) => {
            return <div key={index} className='bg-white w-full lg:w-[70vw] h-auto mt-5 rounded-md shadow-lg p-3 lg:p-4 flex flex-col gap-3 font-medium'>
              <div className='flex items-center justify-between'>
                <div className='flex gap-10 items-center'>
                  <div className='flex flex-col gap-2'>
                    <img src="man.png" className='w-15' alt="" />
                    <p className='text-sm lg:text-lg font-medium max-[450px]:text-xs'>{item.Companyname}</p>
                  </div>
                  <div>
                    <h1 className='text-lg lg:text-xl logo max-[450px]:text-xs'>{item.title}</h1>
                    <p className='text-sm lg:text-lg max-[450px]:text-xs'>{item.Date.split("T")[0]}</p>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <p className='text-red-500 text-sm lg:text-lg font-bold bg-red-100 px-2 py-1 rounded-full max-[450px]:text-sm cursor-pointer' onClick={(e)=> handlecancel(e,item._id)}>Cancel</p>
                </div>
              </div>
            </div>

          })}
        </div>
      </div>
    </div>

  )
}

export default Jobs
