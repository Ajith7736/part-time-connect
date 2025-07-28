import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;



function Adminlogin() {
    const navigate = useNavigate()
    const [admindata, setadmindata] = useState(null)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm()

    useEffect(() => {
        if(admindata){
            submitdata()
        }
    }, [admindata])
    

    const submitdata = async () => {
        let res = await fetch(`${BASE_URL}/api/admin/login`,{
            method : 'POST',
            headers : {
                'Content-Type' : "application/json"
            },
            body : JSON.stringify(admindata)
        });
        let data = await res.json()
        if(res.status === 200){
            toast.success(data.success)
            navigate('/admin/dashboard')
        }
        if(res.status === 400){
            toast.error(data.error)
        }
    }

    const delay = (t) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve()
            }, t * 1000);
        })
    }

    const handlesubmit = async (data) => {
        await delay(1)
        setadmindata(data)
    }


    return (
        <div className='h-screen flex flex-col justify-center items-center'>
            <div className='bg-gray-100 w-[100vw] h-[100vh] pt-30 md:pt-0 md:w-[60vw] md:h-[60vh] lg:w-[50vw] xl:w-[40vw] flex flex-col md:justify-center shadow-md'>
                <div className='logo text-3xl text-gray-800 text-center pt-10'>ADMIN LOGIN</div>
                <form action="" className='flex flex-col p-10 gap-5' onSubmit={handleSubmit(handlesubmit)}>
                    <label htmlFor="Email" className='text-lg font-medium'>Email</label>
                    <input type="Email" {...register('Email', { required: { value: true, message: "This field is required" } })} className='bg-white p-2 rounded-lg focus:outline-none' id='Email' />
                    {errors.Email && <div className='text-red-500'>{errors.Email.message}</div>}
                    <label htmlFor="Password" className='text-lg font-medium'>Password</label>
                    <input type="Password" {...register('Password', { required: { value: true, message: "This field is required" } })} className='bg-white p-2 rounded-lg focus:outline-none' id='Password' />
                    {errors.Password && <div className='text-red-500'>{errors.Password.message}</div>}
                    <input type="submit" className='bg-black text-white font-bold p-2 rounded-lg cursor-pointer' />
                    <input type="reset" className='border-1 border-red-600 cursor-pointer font-bold p-2 rounded-lg' />
                </form>
            </div>
        </div>
    )
}

export default Adminlogin
