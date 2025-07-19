import React from 'react'
import { useEffect, useState, useRef, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { addtowishlist, removefromwishlist } from '../src/redux/wishlistSlice'
import { FaHeart } from 'react-icons/fa'
import { FaRegHeart } from 'react-icons/fa'
import toast from 'react-hot-toast'
import { appliedjobadd } from '../src/redux/appliedJobSlice'
import { deleteappliedjobs } from '../src/redux/appliedJobSlice'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Jobscard({ item }) {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = localStorage.getItem("userdata") ? JSON.parse(localStorage.getItem("userdata")) : {}
    const wishlist = useSelector(state => state.wishlist.items)
    const appliedjobs = useSelector(state => state.appliedjob.jobs)
    const token = localStorage.getItem("token")
    // add the job to the wishlist when the wishlist icon is clickec

    const wishlistadd = async () => {
        let wishdata = { userId: user.id, jobId: item._id }
        try {
            let res = await fetch(`${BASE_URL}/api/wishlist`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(wishdata)
            })
            let data = await res.json()
            if (res.status == 200) {
                toast.success(data.success)
            }
            if (res.status == 400 || res.status == 500) {
                toast.error(data.error)
            }
            if (res.status == 401) {
                toast.errordata
                localStorage.setItem("user", "Loggedout")
                navigate("/login")
            }
        } catch (err) {
            console.log(err)
        }
    }

    // remove the job from the wishlist

    const removewishlist = async () => {
        try {
            let res = await fetch(`${BASE_URL}/api/wishlist`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }, body: JSON.stringify({ userId: user.id, jobId: item._id })
            })
            let data = await res.json()
            if (res.status == 200) {
                toast.success(data.success)
            }
            if (res.status == 400 || res.status == 500) {
                toast.error(data.error)
            }
            if (res.status == 401) {
                localStorage.setItem("user", "Loggedout")
                navigate("/login")
            }
        } catch (err) {
            console.log(err)
        }
    }

    // add job to the applied job

    const addjob = async () => {
        try {
            let res = await fetch(`${BASE_URL}/api/applicant`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }, body: JSON.stringify({ userId: user.id, jobId: item._id, companyId: item.Companyid })
            })
            let data = await res.json()
            if (res.status == 200) {
                toast.success(data.success)
            }
            if (res.status == 400 || res.status == 500) {
                toast.error(data.error)
            }
            if (res.status == 401) {
                localStorage.setItem("user", "Loggedout")
                navigate("/login")
            }
        } catch (err) {
            console.log(err)
        }
    }

    // delete job

    const deletejob = async () => {
        try {
            let res = await fetch(`${BASE_URL}/api/applicant`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }, body: JSON.stringify({ userId: user.id, jobId: item._id })
            })
            let data = await res.json()
            if (res.status == 200) {
                toast.success(data.success)
            }
            if (res.status == 400 || res.status == 500) {
                toast.error(data.error)
            }
            if (res.status == 401) {
                localStorage.setItem("user", "Loggedout")
                navigate("/login")
            }
        } catch (err) {
            console.log(err)
        }
    }

    // convert time into 12 hrs format with AM and PM

    const convertto12hours = (time) => {
        const [hourstr, minutes] = time.split(":")
        let hour = parseInt(hourstr)
        const ampm = hour >= 12 ? 'PM' : 'AM'
        hour = hour % 12 || 12;
        return `${hour}:${minutes} ${ampm}`
    }

    // to add the job to the wishlist and also remove it

    const handleheart = (e) => {
        if (!wishlist.find(list => list._id == item._id)) {
            dispatch(addtowishlist(item))
            wishlistadd(item._id)
        } else {
            dispatch(removefromwishlist(item._id))
            removewishlist(item._id)
        }
    }

    // to return true when the job is in the wishlist so that the icon colour changes to red

    const wishlistIds = useMemo(() => {
        return new Set(wishlist.map(list => list._id))
    }, [wishlist])

    // apply the job

    const handleapply = (e) => {
        if (!appliedjobs.find(list => list._id == item._id)) {
            dispatch(appliedjobadd({ ...item, userId: user.id }))
            addjob()
        }
    }

    // to know which all jobs are applied

    const appliedjobids = useMemo(() => {
        return new Set(appliedjobs.map(item => item._id))
    }, [appliedjobs])

    const handlecancel = (e) => {
        dispatch(deleteappliedjobs(item._id))
        deletejob()
    }

    return (
        <div>
            <div className='bg-white w-[90vw] lg:w-[70vw] h-auto mt-15 rounded-md shadow-lg p-4 lg:p-8 flex flex-col gap-3 font-medium'>
                <div className='flex items-center justify-between'>
                    <div className='flex gap-5 items-center'>
                        <img src="man.png" className='w-18' alt="" />
                        <div>
                            <h1 className='text-xl logo max-[450px]:text-md'>{item.title}</h1>
                            <p className='font-medium max-[450px]:text-sm'>{item.Companyname}</p>
                        </div>
                    </div>
                    {item.status === "Active" ? <p className='text-green-500 font-bold bg-green-100 px-2 rounded-full max-[450px]:text-sm'>{item.status}</p> : <p className='text-red-500 font-bold bg-red-100 px-2 rounded-full max-[450px]:text-sm'>{item.status}</p>}

                </div>
                <div>
                    <p className='text-lg max-[450px]:text-xs' >{item.Description}</p>
                </div>
                <div className='flex justify-between items-baseline max-[450px]:text-xs'>
                    <div className='flex gap-1'><img src="location.svg" className='w-5 max-[450px]:w-3' alt="" /> {item.District}</div>
                    <div className='text-blue-500 flex gap-1'><img src="sandclock.svg" className='w-4 max-[450px]:w-3' />{convertto12hours(item.startTime)} To {convertto12hours(item.endTime)}</div>
                    <div className='flex flex-col items-baseline'><div className='flex gap-1'><img src="Money.svg" className='w-5 max-[450px]:w-3' alt="" />₹ {item.Salary} </div><div> Openings : <span className='text-green-500'>{item.WorkersCount}</span></div></div>
                </div>
                <div className='flex justify-between items-center'>
                    <NavLink to={`/dashboard/${item._id}`}><div className='text-blue-500 cursor-pointer max-[450px]:text-xs select-none hover:underline'>View details</div></NavLink>
                    <div className='flex items-center gap-3 max-[450px]:text-xs'>
                        <div onClick={(e) => handleheart(e)} >{wishlistIds.has(item._id) ? <FaHeart className='size-6 max-[450px]:size-4 text-red-500' /> : <FaRegHeart className='size-6 max-[450px]:size-4' />}</div>
                        {appliedjobids.has(item._id) ? <div className='flex gap-3 items-center'><button className='bg-green-400 text-white px-3 py-1 rounded-sm hover:bg-green-500 font-bold select-none' onClick={handleapply}>Applied</button><button className='bg-red-200 text-red-500 px-2 py-1 rounded-md' onClick={handlecancel}>cancel</button></div> : <button className='bg-blue-400 text-white px-3 py-1 rounded-sm hover:bg-blue-500 font-bold select-none disabled:bg-gray-300' onClick={handleapply} disabled={item.status==="Closed"}>Apply</button>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Jobscard
