import React from 'react'
import { useForm } from 'react-hook-form'
import Loading from './Loading'
import toast from 'react-hot-toast'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Postjob() {
  const [Formdata, setFormdata] = useState(null)
  const navigate = useNavigate()
  const [todaydate, settodaydate] = useState('');
  const company = localStorage.getItem("companydata") && JSON.parse(localStorage.getItem("companydata"))
  const companytoken = localStorage.getItem("companytoken")
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm()

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]
    settodaydate(today)
  }, [])



  useEffect(() => {
    if (Formdata) {
      postjob()
    }
  }, [Formdata])


  const postjob = async () => {
    try {let res = await fetch(`${BASE_URL}/api/jobs`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${companytoken}`
        },
        body: JSON.stringify({ ...Formdata, Companyname: company.Companyname, Companyid: company.companyid })
      })
    let data = await res.json()
    if (res.status == 200) {
      navigate("/company/dashboard")
      return toast.success(data.success)
    }
    if (res.status == 400 || res.status == 500) {
      return toast.error(data.error)
    }
    if (res.status == 401) {
      localStorage.setItem("company", "Loggedout")
      navigate("/company/login")
      return toast.error(data.error)

    }
  }catch(err){
    console.error(err)
  }
  }

  const delay = (d) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, d * 1000);
    })
  }

  const onSubmit = async (data) => {
    await delay(1)
    setFormdata(data)
  }


  const validationRule = {
    required: { value: true, message: "This field is Required" }
  }

  return (
    <>
      {isSubmitting && <div className='text-center absolute w-full h-[100vh]'><Loading /></div>}
      <div className='w-full flex flex-col items-center'>
        <div className='text-center text-2xl font-bold logo mt-10 text-gray-900'>Post New Job</div>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col mt-10 w-[80vw] lg:w-[50vw] gap-3'>

          <input
            type="text"
            {...register("title", validationRule)}
            id='title'
            placeholder='Job Title'
            className='bg-gray-300 px-2 py-2 rounded-lg placeholder:text-gray-600 placeholder:font-medium focus:outline-none'
          />
          {errors.title && <span className="text-red-600 text-sm">{errors.title.message}</span>}

          <textarea
            {...register("Description", validationRule)}
            id="Description"
            placeholder='Description'
            className='bg-gray-300 px-2 py-2 rounded-lg placeholder:text-gray-600 placeholder:font-medium focus:outline-none h-[15vh]'
          />
          {errors.Description && <span className="text-red-600 text-sm">{errors.Description.message}</span>}

          <input
            type="text"
            {...register("Location", validationRule)}
            id='Location'
            placeholder='Location'
            className='bg-gray-300 px-2 py-2 rounded-lg placeholder:text-gray-600 placeholder:font-medium focus:outline-none'
          />
          {errors.Location && <span className="text-red-600 text-sm">{errors.Location.message}</span>}

          <select
            defaultValue=""
            id="District"
            {...register("District", validationRule)}
            className='bg-gray-300 px-2 py-2 rounded-lg text-gray-600 font-medium focus:outline-none'
          >
            <option value="" disabled hidden>Select District</option>
            <option value="Thiruvananthapuram">Thiruvananthapuram</option>
            <option value="Kollam">Kollam</option>
            <option value="Pathanamthitta">Pathanamthitta</option>
            <option value="Alappuzha">Alappuzha</option>
            <option value="Kottayam">Kottayam</option>
            <option value="Idukki">Idukki</option>
            <option value="Ernakulam">Ernakulam</option>
            <option value="Thrissur">Thrissur</option>
            <option value="Palakkad">Palakkad</option>
            <option value="Malappuram">Malappuram</option>
            <option value="Kozhikode">Kozhikode</option>
            <option value="Wayanad">Wayanad</option>
            <option value="Kannur">Kannur</option>
            <option value="Kasaragod">Kasaragod</option>
          </select>
          {errors.District && <span className="text-red-600 text-sm">{errors.District.message}</span>}

          <input
            type="date"
            {...register("Date", validationRule)}
            id='Date'
            min={todaydate}
            className='bg-gray-300 px-2 py-2 rounded-lg focus:outline-none'
          />
          {errors.Date && <span className="text-red-600 text-sm">{errors.Date.message}</span>}

          <label htmlFor="startTime" className='font-medium'>Start Time</label>
          <input
            type="time"
            {...register("startTime", validationRule)}
            id='startTime'
            className='bg-gray-300 px-2 py-2 rounded-lg focus:outline-none'
          />
          {errors.startTime && <span className="text-red-600 text-sm">{errors.startTime.message}</span>}

          <label htmlFor="endTime" className='font-medium'>End Time</label>
          <input
            type="time"
            {...register("endTime", validationRule)}
            id='endTime'
            className='bg-gray-300 px-2 py-2 rounded-lg focus:outline-none'
          />
          {errors.endTime && <span className="text-red-600 text-sm">{errors.endTime.message}</span>}

          <input
            type="text"
            {...register("Salary", validationRule)}
            id='Salary'
            placeholder='Salary'
            className='bg-gray-300 px-2 py-2 rounded-lg placeholder:text-gray-600 placeholder:font-medium focus:outline-none'
          />
          {errors.Salary && <span className="text-red-600 text-sm">{errors.Salary.message}</span>}

          <input
            type="text"
            {...register("WorkersCount", validationRule)}
            id='WorkersCount'
            placeholder='Workers Count'
            className='bg-gray-300 px-2 py-2 rounded-lg placeholder:text-gray-600 placeholder:font-medium focus:outline-none'
          />
          {errors.WorkersCount && <span className="text-red-600 text-sm">{errors.WorkersCount.message}</span>}

          <input
            type="submit"
            disabled={isSubmitting}
            value="Submit"
            className='bg-gray-900 text-white font-bold p-2 rounded-lg text-xl cursor-pointer disabled:bg-gray-500'
          />
        </form>
      </div>
    </>
  )
}

export default Postjob
