import React from 'react'
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loading from './Loading';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Companydashboard() {
  const companytoken = localStorage.getItem("companytoken")
  // const totalapplicants = useSelector(state => state.appliedjob.total)
  const [applicants, setapplicants] = useState([])
  const [jobs, setjobs] = useState([])
  const [isloading, setisloading] = useState(false)
  const company = localStorage.getItem("companydata") && JSON.parse(localStorage.getItem("companydata"));
  const navigate = useNavigate()

  useEffect(() => {
    fetchjobs()
  }, [])




  const fetchjobs = async () => {

    try {
      let res = await fetch(`${BASE_URL}/api/company/getjobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${companytoken}`,
        },
        body: JSON.stringify({ id: company?.companyid }),
      })
      setisloading(false)
      let data = await res.json()
      if (res.status == 200) {
        setjobs(data.jobs)

      }
      else if (res.status == 401) {
        setisloading(false)
        toast.error(data.error)
        localStorage.setItem("company", "Loggedout")
        navigate("/company/login")
      }
      else if (res.status == 400 || res.status == 500) {
        setisloading(false)
        console.log(data.error)
      }
    } catch (err) {
      console.log(err)
    }
  }


  const activejob = useMemo(()=>{
    return jobs.map((item)=>{
      if(item.status === "Active"){
        return item
      }
    })
  },[jobs])

  return (
    <>
      {isloading && <div className='text-center absolute w-full h-[100vh]'><Loading /></div>}
      <div className='w-full overflow-auto'>
        <div className='flex flex-col gap-10 items-center w-full'>
          <div className=''><div className='text-2xl text-center logo mt-6'>{company?.Companyname} dashboard</div></div>
          <div className='flex flex-col gap-12 lg:flex-row lg:gap-4'>
            <div className='h-[15vh] w-[70vw] lg:w-[30vw] bg-white rounded-2xl shadow-lg flex flex-col '>
              <div className='text-center font-bold logo text-2xl mt-5'>Total Jobs Posted</div>
              <div className='text-center mt-4 text-3xl font-bold text-green-600'>{jobs.length}</div>
            </div>
            <div className='h-[15vh] w-[70vw] lg:w-[30vw] bg-white rounded-2xl shadow-lg flex flex-col'>
              <div className='text-center font-bold logo text-2xl mt-5'>Active Jobs</div>
              <div className='text-center mt-4 text-3xl font-bold text-green-600'>{activejob.length}</div>
            </div>
          </div>
          <div className='text-3xl font-bold logo'>Your Jobs</div>
          <div className='jobs flex flex-col gap-4 my-5'>
            {jobs?.map((item, index) => {
              return <div key={index} className='bg-white h-auto w-[70vw] rounded-xl shadow-lg p-3 flex flex-col gap-1 items-start'>
                <div className='text-blue-500 text-xl logo'>{item.title}</div>
                <div className='text-gray-600 font-medium'>Posted on  : {item.Postedon.split("T")[0]}</div>
                <div className='text-gray-600 font-medium '>Total Workers : <span className='text-green-500'>{item.WorkersCount}</span></div>
                <div className='text-gray-600 font-medium'>Location : {item.Location}</div>
                <div className='text-gray-600 font-medium'>Salary : <span className='text-green-500'>₹{item.Salary}</span></div>
                {item.status === "Active" ? <div className='font-bold text-green-500 bg-green-100  text-center rounded-full mt-1 px-2'>{item.status}</div> : <div className='font-bold text-red-500 bg-red-100  text-center rounded-full mt-1 px-2'>{item.status}</div>}
              </div>
            })}
          </div>
        </div>
      </div>


    </>
  )
}

export default Companydashboard
