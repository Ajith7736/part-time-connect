import React from 'react'
import { useParams } from 'react-router-dom'
import Notfoundpage from '../Notfoundpage'
import { useForm } from 'react-hook-form'
import { IoMdClose } from "react-icons/io";
import { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading'
import { FiEdit } from 'react-icons/fi';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;


function Companyprofile() {
  const { companyname } = useParams()
  const navigate = useNavigate()
  const [company, setcompany] = useState(localStorage.getItem("companydata") && JSON.parse(localStorage.getItem("companydata")))
  const companylog = localStorage.getItem("company")
  const companytoken = localStorage.getItem("companytoken")
  const [newcompanydata, setnewcompanydata] = useState(null)
  const [image, setimage] = useState(null)
  const editbox = useRef()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm()

  useEffect(() => {
    if (newcompanydata) {
      updatecompany()
    }
  }, [newcompanydata])

  const delay = (n) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, n * 1000);
    })
  }


  const updatecompany = async () => {
    const res = await fetch(`${BASE_URL}/api/company/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${companytoken}`
      },
      body: JSON.stringify({ ...newcompanydata, id: company.companyid })
    })
    const data = await res.json()
    if (res.status === 200) {
      toast.success(data.success)
      console.log(data.user)
      const update = data.user
      const updateddata = { ...company, Address: update.Address, Phonenumber: update.Phonenumber, Companyname: update.Companyname }
      console.log(updateddata)
      await setcompany(updateddata)
      await localStorage.setItem("companydata", JSON.stringify(updateddata))
      navigate(`/company/${updateddata.Companyname}`)
    }
    if (res.status === 400 && res.status === 500) {
      toast.error(data.error)
    }
    if (res.status === 401) {
      toast.error(data.error)
      localStorage.setItem("company", "Loggedout")
      navigate("/company/login")
    }
  }

  const handlesubmit = async (data) => {
    await delay(2)
    setnewcompanydata(data)
  }

  const handleclick = () => {
    editbox.current.style = " display : block; "
  }

  const handleclose = () => {
    editbox.current.style = " display : hidden; "
  }

  const handlepic = (e) => {
    let selectedfile = e.target.files[0];
    if(selectedfile){
      const reader = new FileReader();
      reader.onloadend = () => {
        setimage(reader.result)
      }
      reader.readAsDataURL(selectedfile);
    }
  }

  useEffect(() => {
   if(image){
      const updateddata = {...company,Profilepic : image}
      localStorage.setItem("companydata",JSON.stringify(updateddata))
      navigate(`/company/${company.Companyname}`)
   }
  }, [image])

  const updatecompanydata = (e) => {
    setcompany({...company,[e.target.id] : e.target.value})
  }

  console.log(company)
  

  return (
    <>
      {isSubmitting && <div className='text-center fixed w-full'><Loading /></div>}
      <div className='w-[90vw]'>
        {companylog == "Loggedin" && companyname == company.Companyname ? <>
          <div className='flex flex-col gap-5 items-center'>
            <div className='w-full h-[40vh] mt-1 px-1 relative flex justify-center'>
              <img src="/banner.jpg" className='object-cover object-bottom-right w-full h-[40vh] rounded-t-3xl' alt="" />
              <div className='absolute w-35 h-35 -bottom-15 rounded-full'>
                <label htmlFor="Profilepic">
                  <img src={company.Profilepic !== "man.png" ? `${company.Profilepic}` : `/${company.Profilepic}`} className='w-35 h-35 object-cover shadow-lg rounded-full' alt="" />
                  <div className='bg-purple-500 absolute bottom-0 right-0 p-2 rounded-full cursor-pointer'><FiEdit className='text-white size-5' /></div></label>
                <input type="file" id='Profilepic' className='hidden' onChange={handlepic} />
              </div>
            </div>
            <div className='mt-20 text-center flex flex-col items-center gap-2'>
              <div className='text-2xl font-bold logo'>{company.Companyname}</div>
              <div className='text-xl font-medium'>{company.Email}</div>
              <div className='text-lg font-medium'>{company.Phonenumber}</div>
              <div className='text-lg font-medium'>{company.Address}</div>
              <button className='bg-gray-900 hover:bg-gray-800 mt-3 text-white p-2 rounded-lg font-bold cursor-pointer' onClick={handleclick}>Edit Profile</button>
            </div>

            <div ref={editbox} className='bg-white hidden h-auto w-[60vw] rounded-xl mb-10 shadow-lg '>
              <div className='flex justify-end p-2'>
                <IoMdClose size={25} className='cursor-pointer hover:text-blue-500' onClick={handleclose} /></div>
              <form action="" onSubmit={handleSubmit(handlesubmit)} className='flex flex-col p-4 gap-3'>
                <label htmlFor="Phonenumber" className='font-medium text-lg'>Phone number</label>
                <input type="number" className='focus:outline-none bg-gray-100 rounded-lg px-2 py-2' {...register("Phonenumber", { required: { value: true, message: "This field is required ! " } })} id='Phonenumber' value={company.Phonenumber} onChange={updatecompanydata}/>
                {errors.Phonenumber && <div className='text-red-500'>{errors.Phonenumber.message}</div>}
                <label htmlFor="Address" className='font-medium text-lg'>Address</label>
                <textarea type="text" className='focus:outline-none bg-gray-100 rounded-lg px-2 py-2' {...register("Address", { required: { value: true, message: "This field is required ! " } })} id='Address' value={company.Address} onChange={updatecompanydata}></textarea>
                {errors.Address && <div className='text-red-500'>{errors.Address.message}</div>}
                <input type="submit" className='bg-gray-900 text-white font-bold py-2 rounded-lg cursor-pointer disabled:bg-gray-400' disabled={isSubmitting} />
              </form>
            </div>
          </div>

        </> : <Notfoundpage />}
        <div>


        </div>
      </div>
    </>
  )
}

export default Companyprofile
