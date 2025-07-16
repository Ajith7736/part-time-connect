import React from 'react'
import { useState } from 'react'
import { useForm } from "react-hook-form"
import { useRef } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import Loading from './Loading'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { createWorker } from 'tesseract.js'
import Otp from './Otp'

function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm()

  const [Formdata, setFormdata] = useState(null)
  const [filename, setfilename] = useState("")
  const [eyevisible, seteyevisible] = useState(false)
  const passref = useRef()
  const navigate = useNavigate()
  const [finaltext, setfinaltext] = useState(null)
  const [Fullname, setFullname] = useState(null)
  const [Fulltext, setFulltext] = useState(null)
  const [showotp, setshowotp] = useState(false)
  const [isloading, setisloading] = useState(false)




  useEffect(() => {
    if (Formdata) {
      senduserdata()
    }
  }, [Formdata])


  // send the data to the db

  const senduserdata = async () => {
    setisloading(true)
    try {
      let res = await fetch("http://localhost:3000/api/Signup", {
        method: "POST", headers: {
          "Content-Type": "application/json"
        }, body: JSON.stringify(Formdata)
      })
      const data = await res.json();
      if (res.status == 200) {
        toast.success(data.success)
        setisloading(false)
        setshowotp(true)
      }
      if (res.status == 400 || res.status == 500) {
        toast.error(data.error)
        setisloading(false)
      }
    } catch (err) {
      console.error("Error occured during fetch")
      setisloading(false)
    }
  }

  // custom delay

  const delay = (d) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, d * 1000);
    })
  }

  // set the formdata and match the id card name with the specified Full name

  const onSubmit = async (data) => {
    if (Fullname == finaltext.name) {
      await delay(1)
      setFormdata({ ...data, Idproof: data.Idproof[0].name })
    } else {
      toast.error("Idproof and Full name does not match")
    }
  }

  function handleeye() {
    seteyevisible(!eyevisible)
  }

  // convert the image into text format

  const readTextFromImage = async (file) => {
    const worker = await createWorker("eng")
    const { data: { text } } = await worker.recognize(file)
    await worker.terminate()
    return text
  }

  // To check whether Fullname and image text matches when both the image text and full name changes accordingly

  useEffect(() => {
    if (Fullname && Fulltext) {
      const regex = new RegExp(Fullname);
      const match = Fulltext.match(regex)
      if (match) {
        setfinaltext({ name: match[0], matching: true })
      } else {
        setfinaltext({ matching: false })
      }
    }
  }, [Fullname, Fulltext])


  return (
    <>
      {showotp == false && isSubmitting && <div className='text-center fixed w-full h-[90vh]'><Loading /></div>}
      {isloading && <> <div className='text-center fixed w-full h-[90vh]'><Loading /></div></>}
      {showotp && !isSubmitting && <div className='bg-white/50 fixed w-full h-[90vh] flex justify-center items-center'><Otp Email={Formdata?.Email} /></div>}
      <div className=' bg-gray-100 flex justify-center items-center select-none'>
        <div className='bg-white shadow-lg w-full md:w-[80vw] lg:my-10 lg:w-[60vw]  rounded-2xl px-4 py-6 flex flex-col gap-10 justify-center'>
          <h1 className='text-center text-4xl logo text-purple-600'>USER REGISTRATION</h1>
          <form action="" className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-5 lg:flex-row lg:justify-evenly lg:gap-4'>
              <div className='section-1 flex flex-col gap-2 lg:w-1/2'>
                <label htmlFor="Fullname">Full Name</label>
                <input {...register("Fullname", {
                  required: { value: true, message: "This field is required" }, minLength: { value: 3, message: "Name is too short" }, onChange: (e) => {
                    setFullname(e.target.value)
                  }
                })} type="text" name='Fullname' id='Fullname' placeholder='Enter Your Full Name' className='bg-gray-100 p-2 rounded-lg focus:outline-none' />
                {errors.Fullname && <div className='text-red-500'>{errors.Fullname.message}</div>}
                <label htmlFor="Email">Email</label>
                <input {...register("Email", { required: { value: true, message: "This field is required" } })} type="email" name='Email' id='Email' placeholder='Enter Your Email' className='bg-gray-100 p-2 rounded-lg focus:outline-none' />
                {errors.Email && <div className='text-red-500'>{errors.Email.message}</div>}
                <label htmlFor="Password">Password</label>
                <div className='flex items-center gap-3 justify-between '>
                  <input ref={passref} {...register("Password", {
                    required: { value: true, message: "This field is required" },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                    }
                  })} type={eyevisible ? "text" : "password"} name='Password' id='Password' placeholder='Enter Your Password' className='bg-gray-100 p-2 rounded-lg focus:outline-none w-full' /><span className='bg-gray-200 p-3 rounded-full focus:outline-none' onClick={handleeye}>{eyevisible ? <IoEye /> : <IoMdEyeOff />}</span>
                </div>
                {errors.Password && <div className='text-red-500'>{errors.Password.message}</div>}
                <label htmlFor="Gender">Gender</label>
                <select {...register("Gender", { required: { value: true, message: "This field is required" } })} name="Gender" id="Gender" className=' outline outline-gray-200 rounded-md p-2'>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>
                {errors.Gender && <div className='text-red-500'>{errors.Gender.message}</div>}
                <label htmlFor="Age">Age</label>
                <input {...register("Age", { required: { value: true, message: "This field is required" }, min: { value: 17, message: "You must be 18 years old or above" } })} type="number" name='Age' id='Age' placeholder='Enter Your Age' className='bg-gray-100 p-2 rounded-lg focus:outline-none' />
                {errors.Age && <div className='text-red-500'>{errors.Age.message}</div>}
                <label htmlFor="Idproof">IdProof</label>
                <label htmlFor="Idproof" className='border-2 border-purple-500 border-dotted text-center p-5 text-purple-500 rounded-xl flex flex-col items-center gap-4'>
                  <div><img src="Upload.svg" className='size-10' alt="" /></div>
                  {filename ? <div className='font-bold text-lg'>{filename.name}</div> : <div className='font-bold text-lg'>Upload File</div>}
                </label>
                {errors.Idproof && <div className='text-red-500'>{errors.Idproof.message}</div>}
                <input {...register("Idproof", {
                  required: { value: true, message: "This field is required" }, onChange: async (e) => {
                    const file = e.target.files[0]
                    setfilename(file);
                    if (file) {
                      let text = await readTextFromImage(file)
                      text = text.replace(".", "")
                      setFulltext(text)
                    }
                  }
                })} type="file" name='Idproof' id='Idproof' className='hidden' />
              </div>
              <div className='section2 flex flex-col gap-2 lg:w-1/2'>
                <label htmlFor="Username">Username</label>
                <input {...register("Username", { required: { value: true, message: "This field is required" } })} type="text" name='Username' id='Username' placeholder='Enter Your Username' className='bg-gray-100 p-2 rounded-lg focus:outline-none' />
                {errors.Username && <div className='text-red-500'>{errors.Username.message}</div>}
                <label htmlFor="dob">Date of Birth</label>
                <input {...register("dob", { required: { value: true, message: "This field is required" } })} type="date" name='dob' id='dob' placeholder='Enter Your Email' className='border border-gray-200 p-2 rounded-lg focus:outline-none' />
                {errors.dob && <div className='text-red-500'>{errors.dob.message}</div>}
                <label htmlFor="Phonenumber">Phone Number</label>
                <input  {...register("Phonenumber", { required: { value: true, message: "This field is required" } })} type="number" name='Phonenumber' id='Phonenumber' placeholder='Enter Your Phone Number' className='bg-gray-100 p-2 rounded-lg focus:outline-none' />
                {errors.Phonenumber && <div className='text-red-500'>{errors.Phonenumber.message}</div>}
                <label htmlFor="Address">Address</label>
                <textarea  {...register("Address", { required: { value: true, message: "This field is required" } })} name="Address" id="Address" className='focus:outline-none bg-gray-100 h-[10vh] p-3 rounded-xl'></textarea>
                {errors.Address && <div className='text-red-500'>{errors.Address.message}</div>}
              </div>
            </div>
            <input disabled={isSubmitting} type="submit" value="Signup" className='bg-purple-500 p-3 rounded-lg text-lg font-bold text-white md:text-2xl logo hover:bg-purple-600 cursor-pointer disabled:bg-gray-200' />
          </form>
          <div className='flex flex-col gap-3'>
            <div className='text-center'>Already have an account ? <Link to={'/login'} className='text-red-600 hover:underline'>Login</Link></div>
            <div className='text-center'>Forgot Password ? <Link to={'/Signup'} className='text-red-600 hover:underline'>Reset Password</Link></div>
            <div className='text-center'>Sign up as Company ? <Link to={'/Signup'} className='text-red-600 hover:underline'>Company</Link></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup
