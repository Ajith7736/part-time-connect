import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"
import Loading from './Loading'
import { useEffect } from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { clearwishlist } from '../src/redux/wishlistSlice'
import { clearappliedjobs } from '../src/redux/appliedJobSlice'
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm()

  const dispatch = useDispatch()
  const [Formdata, setFormdata] = useState(null)
  const navigate = useNavigate()
  const userlog = localStorage.getItem("user")
  const userdata = localStorage.getItem("userdata") && JSON.parse(localStorage.getItem("userdata"))

  useEffect(() => {
    if(userlog == "Loggedin"){
      navigate("/dashboard")
    }
  }, [])
  

  // calling the signuser function

  useEffect(() => {
    if (Formdata) {
      signuser()
    }
  }, [Formdata])


  // fetch user from the database having the specified Email and Password

  const signuser = async () => {
    try {
      let res = await fetch(`${BASE_URL}/api/Login`, {
        method: "POST", headers: {
          "Content-Type": "application/json"
        }, body: JSON.stringify(Formdata)
      })
      const data = await res.json();
      const user = data.result
      if (res.status == 201) {
        toast.success(data.success)
        localStorage.setItem("user", "Loggedin")
        localStorage.setItem("userdata", JSON.stringify(user))
        localStorage.setItem("token", data.token)
        navigate("/")
      }
      if (res.status == 400 || res.status == 500) {
        toast.error(data.error)
      }
    } catch (err) {
      console.error("Error occured during fetch")

    }
  }

  // custom delay for submit

  const delay = (d) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, d * 1000);
    })
  }

  // submit the form data

  const onSubmit = async (data) => {
    await delay(1)
    setFormdata(data)
  }

  return (
    <div className='h-[90vh] bg-gray-100 flex justify-center items-center'>
      {isSubmitting && <div className='text-center fixed w-full'><Loading /></div>} <>
        <div className='bg-white shadow-lg w-[100vw] h-[90vh] md:h-[80vh] md:w-[80vw] lg:w-[50vw]  rounded-2xl px-4 flex flex-col gap-10 justify-center'>
          <h1 className='text-center text-4xl logo text-purple-600'>LOGIN</h1>
          <form action="" className='flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="Email" className='font-medium text-xl'>Email</label>
            <input {...register("Email", { required: { value: true, message: "This field is required" } })} type="email" name='Email' placeholder='Enter Your Email' className='bg-gray-100 p-3 rounded-lg focus:outline-none' />
            {errors.Email && <div className='text-red-500'>{errors.Email.message}</div>}
            <label htmlFor="password" className='font-medium text-xl'>Password</label>
            <input {...register("Password", { required: true })} type="password" name='Password' placeholder='Enter Your Password' className='bg-gray-100 p-3 rounded-lg focus:outline-none' />
            {errors.Password && <div className='text-red-500'>This field is required</div>}
            <input disabled={isSubmitting} type="submit" value="Login" className='bg-purple-500 p-3 rounded-lg text-lg font-bold text-white md:text-2xl logo hover:bg-purple-600 cursor-pointer disabled:bg-gray-300' />
          </form>
          <div className='flex flex-col gap-3'>
            <div className='text-center'>Dont have an account ? <Link to={'/Signup'} className='text-red-600 hover:underline'>Signup</Link></div>
            {/* <div className='text-center'>Forgot Password ? <Link to={'/Signup'} className='text-red-600 hover:underline'>Reset Password</Link></div> */}
            <div className='text-center'>Sign up as Company ? <Link to={'/company'} className='bg-purple-500 text-white font-bold logo p-2 rounded-md hover:bg-purple-600 ml-2'>Company</Link></div>

          </div>
        </div>
      </>
    </div>
  )
}

export default Login
