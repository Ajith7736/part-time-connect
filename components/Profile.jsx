import React from 'react'
import { useParams } from 'react-router-dom'
import Notfoundpage from './Notfoundpage'
import { FiEdit } from "react-icons/fi";
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useRef } from 'react';
import { IoMdClose } from "react-icons/io";
import toast from 'react-hot-toast';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Profile() {
    const navigate = useNavigate()
    const { username } = useParams()
    const [file, setfile] = useState(null)
    const [image, setimage] = useState(null)
    let user = localStorage.getItem("user")
    const token = localStorage.getItem("token")
    const [userdata, setuserdata] = useState(localStorage.getItem("userdata") ? JSON.parse(localStorage.getItem("userdata")) : "")
    const [newuserdata, setnewuserdata] = useState(null)
    const editbox = useRef()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm()

    const handlesubmit = (data) => {
        setnewuserdata(data)
    }

    useEffect(() => {
        if (newuserdata) {
            updateuser()
        }
    }, [newuserdata])

    
    // update the userdata

    useEffect(() => {
        if (image) {
            const updateddata = { ...userdata, Profilepic: image }
            localStorage.setItem("userdata", JSON.stringify(updateddata))
            window.location.reload()
        }
    }, [image])


    // read the image and store it as url

    const handleprofilepic = (e) => {
        let selectedfile = e.target.files[0];
        if (selectedfile) {
            setfile(selectedfile)
            const reader = new FileReader();
            reader.onloadend = () => {
                setimage(reader.result)
            };
            reader.readAsDataURL(selectedfile)
        }
    }

    const handlechange = () => {
        editbox.current.style = "display : block;"
    }

    const handleblur = () => {
        editbox.current.style = "display : none;"
    }

    // update the user details

    const updateuser = async () => {
        try {
            const res = await fetch(`${BASE_URL}/api/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ ...newuserdata, id: userdata.id })
            })
            const data = await res.json()
            if (res.status === 200) {
                toast.success(data.success)
                let update = data.user
                const updatedata = { ...userdata, Address: update.Address, Phonenumber: update.Phonenumber, Username: update.Username }
                await setuserdata(updatedata)
                await localStorage.setItem("userdata", JSON.stringify(updatedata))
                navigate(`/${updatedata.Username}`)
            }
            if (res.status === 400) {
                toast.error(data.error)
            }
        } catch (err) {
            console.error(err)
        }
    }

    const handleedit = (e) => {
        setuserdata({...userdata,[e.target.id] : e.target.value})
    }




    return (
        <div className='px-3 flex flex-col items-center'>
            {user == "Loggedin" && userdata.Username == username ? <>
                <div className="rounded-t-3xl h-[40vh] lg:h-[50vh] w-full overflow-hidden flex justify-center">
                    <img src="banner.jpg" className="object-cover object-top md:object-bottom w-full h-full " alt="Gojo from Jujutsu Kaisen" />
                    <label htmlFor="profilepic" className='absolute top-[43vh]'>
                        <img src={userdata.Profilepic} className='w-30 h-30 lg:w-50 lg:h-50  outline-purple-500 outline-4 rounded-full shadow-lg' alt="" />
                        <div className='bg-purple-500 absolute bottom-0 right-0 p-2 rounded-full'><FiEdit className='text-white size-5' /></div>
                    </label>

                    <input type="file" className='hidden' id='profilepic' name='profilepic' onChange={handleprofilepic} />
                </div>
                <div className='text-center mt-20'>
                    <div className='font-bold text-xl md:text-2xl lg:text-3xl logo'>{username}</div>
                    <div className='font-medium text-lg'>{userdata.Email}</div>
                    <div className='text-lg font-medium '>{userdata.Phonenumber}</div>
                    <div className='text-lg font-medium '>{userdata.Address}</div>
                    <button className='bg-gray-800 cursor-pointer hover:bg-gray-700 text-white py-2 px-4 rounded-3xl mt-5' onClick={handlechange} >Edit profile</button>
                </div>
                <div ref={editbox} className='hidden h-auto w-[60vw] bg-gray-100 my-10 p-5 rounded-2xl shadow-lg '>
                    <form action="" className='flex flex-col gap-2' onSubmit={handleSubmit(handlesubmit)} >
                        <div className='text-xl logo flex items-center justify-between'>
                            <div>Edit Profile</div>
                            <div className='cursor-pointer hover:text-blue-500' onClick={handleblur}><IoMdClose /></div>
                        </div>

                        <label htmlFor="Username" className='text-lg font-medium'>Username</label>
                        <input type="text" {...register("Username",{required : { value : true , message : "This field is required"}})} id='Username' className='bg-white px-2 py-2 rounded-xl focus:outline-none' />
                        {errors.Username && <div className='text-red-500 '>{errors.Username.message}</div>}
                        <label htmlFor="Phonenumber" className='text-lg font-medium'>Phonenumber</label>
                        <input type="number" {...register("Phonenumber",{required : { value : true , message : "This field is required"}})} id='Phonenumber' className='bg-white px-2 py-2 rounded-xl focus:outline-none' value={userdata.Phonenumber} onChange={handleedit} />
                        {errors.Phonenumber && <div className='text-red-500 '>{errors.Phonenumber.message}</div>}
                        <label htmlFor="Address" className='text-lg font-medium'>Address</label>
                        <textarea name="" id="Address" {...register("Address",{required : { value : true , message : "This field is required"}})} className='bg-white px-2 py-2 rounded-xl focus:outline-none h-[100px]' value={userdata.Address} onChange={handleedit}></textarea>
                        {errors.Address && <div className='text-red-500 '>{errors.Address.message}</div>}
                        <input type="submit" className='cursor-pointer hover:bg-gray-700 bg-gray-800 text-white font-bold p-2 rounded-lg my-3' />
                    </form>
                </div>
            </> : <><Notfoundpage /></>}

        </div>
    )
}

export default Profile
