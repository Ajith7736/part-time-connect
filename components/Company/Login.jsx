import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"
import Loading from '../Loading'
import { useEffect } from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function CompanyLogin() {
   const {
    register,
    handleSubmit,
    watch,
    formState: { errors,isSubmitting },
  } = useForm()

  const [Formdata, setFormdata] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if(Formdata){
      signcompany()
    }
  }, [Formdata])
  
  const signcompany = async ()=>{
    // console.log(Formdata)
    try {
        let res = await fetch(`http://localhost:3000/api/company/Login`, {
          method: "POST", 
          headers: {
            "Content-Type": "application/json"
          },
          body : JSON.stringify(Formdata)
        })
        const data = await res.json();
        const user = await data.result;
        if(res.status == 201){
          toast.success(data.success)
          localStorage.setItem("company","Loggedin")
          localStorage.setItem("companydata",JSON.stringify(user))
          localStorage.setItem("companytoken",data.token)
          navigate("/company/dashboard")
        }
        if(res.status == 400 || res.status == 500){
          toast.error(data.error)
        }
      } catch (err) {
        console.log("Error occured during fetch")
      }
  }

  const delay = (d)=>{
    return new Promise((resolve,reject)=>{
      setTimeout(() => {
        resolve()
      }, d * 1000);
    })
  }

  const onSubmit = async (data) =>{
    await delay(1)
    setFormdata(data)
  }

  return (
    <div className='h-screen bg-gray-100 flex justify-center items-center'>
     {isSubmitting && <div className='text-center fixed w-full'><Loading/></div>} <>
     <div className='bg-white shadow-lg w-[100vw] h-[100vh] md:h-[80vh] md:w-[80vw] lg:w-[40vw]  rounded-2xl px-4 flex flex-col gap-10 justify-center'>
        <h1 className='text-center text-4xl logo text-purple-600'>COMPANY <br /> LOGIN</h1>
        <form action="" className='flex flex-col gap-8 md:gap-5' onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="Email" className='font-medium text-xl'>Email</label>
          <input {...register("Email",{required : {value:true , message:"This field is required"}})} type="email" name='Email' placeholder='Enter Your Email' className='bg-gray-100 p-3 rounded-lg focus:outline-none' />
          {errors.Email && <div className='text-red-500'>{errors.Email.message}</div>}
          <label htmlFor="password" className='font-medium text-xl'>Password</label>
          <input {...register("Password",{required : true})} type="password" name='Password' placeholder='Enter Your Password' className='bg-gray-100 p-3 rounded-lg focus:outline-none' />
          {errors.Password && <div className='text-red-500'>This field is required</div>}
          <input disabled={isSubmitting} type="submit" value="Login" className='bg-purple-500 p-3 rounded-lg text-lg font-bold text-white md:text-2xl logo hover:bg-purple-600 cursor-pointer disabled:bg-gray-300'/>
        </form>
        <div className='flex flex-col gap-3'>
          <div className='text-center'>Sign up as Company ? <Link to={'/company'} className='text-red-500 hover:underline'>Company</Link></div>

        </div>
      </div>
     </> 
    </div>
  )
}

export default CompanyLogin

