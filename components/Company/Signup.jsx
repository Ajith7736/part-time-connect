import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Loading from './Loading'
import Companyotp from './Companyotp'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useEffect } from 'react'
import { IoEye } from 'react-icons/io5'
import { IoMdEyeOff } from 'react-icons/io'
import { useRef } from 'react'
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function CompanySignup() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm()

    const [Formdata, setFormdata] = useState(null)
    const [showotp, setshowotp] = useState(false)
    const [isloading, setisloading] = useState(false)
    const [eyevisible, seteyevisible] = useState(false)
    const passref = useRef()
    useEffect(() => {
        if (Formdata) {
            submitdata()
        }
    }, [Formdata])


    const submitdata = async () => {
        setisloading(true)
        let res = await fetch(`${BASE_URL}/api/company/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, body: JSON.stringify(Formdata)
        })
        let data = await res.json()
        if (res.status == 200) {
            toast.success(data.success)
            setshowotp(true)
            setisloading(false)
        }
        if (res.status == 400) {
            toast.error(data.error)
            setisloading(false)
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

    const handleeye = () =>{
        seteyevisible(!eyevisible)
    }
    return (
        <>
            {isloading && <> <div className='text-center fixed w-full h-[90vh]'><Loading /></div></>}
            {showotp && !isSubmitting && <div className='bg-white/50 fixed w-full h-[90vh] flex justify-center items-center'><Companyotp Email={Formdata?.Email} /></div>}
            {isSubmitting && <div className='text-center fixed w-full h-[90vh]'><Loading /></div>}
            <div className='w-full h-screen bg-gray-100 flex  justify-center items-center select-none'>
                <div className='bg-white w-[100vw] h-screen lg:w-[40vw] md:w-[60vw] md:h-auto md:shadow-xl p-4 pt-15 pb-4 rounded-xl'>
                    <div className='text-center text-3xl md:text-4xl text-purple-500 font-bold logo'>Register Company</div>
                    <form action="" onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3 md:gap-2 mt-10'>
                        <label htmlFor="Companyname" className='font-medium  text-lg md:text-xl '>Company Name</label>
                        <input {...register("Companyname", { required: { value: true, message: "This field is required !" } })} type="text" name="Companyname" id="Companyname" className='bg-gray-100 px-2 py-3 rounded-lg placeholder:text-gray-700 focus:outline-none' placeholder='Enter Company Name' />
                        {errors.Companyname && <div className='text-red-500'>{errors.Companyname.message}</div>}
                        <label htmlFor="Email" className='font-medium  text-lg md:text-xl mt-2'>Email</label>
                        <input {...register("Email", { required: { value: true, message: "This field is required !" } })} type="email" name="Email" id="Email" className='bg-gray-100 px-2 py-3 rounded-lg placeholder:text-gray-700 focus:outline-none' placeholder='Enter your Email' />
                        {errors.Email && <div className='text-red-500'>{errors.Email.message}</div>}
                        <label htmlFor="Password" className='font-medium  text-lg md:text-xl mt-2'>Password</label>
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
                        <label htmlFor="Address" className='font-medium  text-lg md:text-xl mt-2'>Address</label>
                        <input {...register("Address", { required: { value: true, message: "This field is required !" } })} type="text" name="Address" id="Address" className='bg-gray-100 px-2 py-3 rounded-lg placeholder:text-gray-700 focus:outline-none' placeholder='Enter your Address' />
                        {errors.Address && <div className='text-red-500'>{errors.Address.message}</div>}
                        <label htmlFor="Phonenumber" className='font-medium  text-lg md:text-xl mt-2'>Phone Number</label>
                        <input {...register("Phonenumber", { required: { value: true, message: "This field is required !" } })} type="Number" name="Phonenumber" id="Phonenumber" className='bg-gray-100 px-2 py-3 rounded-lg placeholder:text-gray-700 focus:outline-none' placeholder='Enter your Phone number' />
                        {errors.Phonenumber && <div className='text-red-500'>{errors.Phonenumber.message}</div>}
                        <input type="submit" value="Register" disabled={isSubmitting} className='bg-purple-500 text-white font-bold logo p-2 mt-3 rounded-lg disabled:bg-gray-300 lg:text-xl' />
                        <Link to={"/company/login"}><p className='text-center mt-1 lg:text-lg'>Already have an account ? <span className='text-red-500 hover:underline cursor-pointer'>Login</span></p></Link>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CompanySignup
