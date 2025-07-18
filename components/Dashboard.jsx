import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useRef } from 'react'
import { IoMdClose } from "react-icons/io";
import { useMemo } from 'react';
import Jobscard from './Jobscard';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addtowishlist } from '../src/redux/wishlistSlice';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Dashboard() {
    const dispatch = useDispatch()
    const [Search, setSearch] = useState("")
    const [Location, setLocation] = useState("")
    const [Time, setTime] = useState("")
    const token = localStorage.getItem("token")
    const filterref = useRef()
    const [isloading, setisloading] = useState(false)
    const navigate = useNavigate()
    const [jobs, setjobs] = useState([])
    const [wishlist, setwishlist] = useState([])
    const timeref = useRef(null)
    const locationref = useRef(null)
    const user = localStorage.getItem("userdata") ? JSON.parse(localStorage.getItem("userdata")) : {}

    // fetches job and wishlist on the first render

    useEffect(() => {
        fetchjobs()
        fetchwishlist()
    }, [])

    // add the job to wishlist

    useEffect(() => {
        wishlist.map(list => {
            let userjob = jobs.filter(item => {
                item._id === list.jobId
            }
            )
            if (userjob.length > 0) {
                userjob.map(item => {
                    dispatch(addtowishlist(item))
                })
            }
        })
    }, [wishlist, jobs])



    // fetch jobs from the backend

    const fetchjobs = async () => {
        setisloading(true)
        let res = await fetch(`${BASE_URL}/api/getjobs`, {
            method: "POST",
            headers: { "Authorization": `Bearer ${token}` }
        })
        let data = await res.json()
        if (res.status == 201) {
            setjobs(data.jobs)
            setisloading(false)
        } else {
            setisloading(false)
            if (res.status == 401) {
                localStorage.setItem("user", "Loggedout")
                navigate("/login")
            }
        }

    }

    // fetch wishlist from the backend

    const fetchwishlist = async () => {
        let res = await fetch(`${BASE_URL}/api/getwishlist`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ userId: user.id })
        })
        let data = await res.json()
        if (res.status == 201) {
            return setwishlist(data.result)
        }
    }

    // to check whether the filter time is equal to the start time of the job

    const checktime = (starttime, endtime, filtertime) => {
        let [time, ampm] = filtertime.split(" ");
        time = time.split(":")[0];
        const start = starttime.split(":")[0];
        // const end = endtime.split(":")[0];
        time = ampm == "pm" ? 12 + parseInt(time) : parseInt(time);
        if (time == start) {
            return true
        } else {
            return false
        }
    }


    // set the search value

    const handlesearch = (e) => {
        setSearch(e.target.value)
    }

    // Show the filter box

    const handlefilter = () => {
        filterref.current.style.left = "0";
        filterref.current.style.transition = "all .8s ease-in-out";

    }

    // hide the filter box

    const handleclose = () => {
        filterref.current.style.left = "-70vw";
        filterref.current.style.transition = "all .8s ease-in-out";
    }

    // clears all the filter

    const handleclear = () => {
        setSearch("")
        setLocation("")
        setTime("")
        timeref.current.value = "";
        locationref.current.value = "";
    }

    // set the location value

    const handlelocation = (e) => {
        setLocation(e.target.value)
    }

    // set the time value

    const handletime = (e) => {
        setTime(e.target.value)
    }


    // filters the job using useMemo and returns only the job which has true on all the filter

    const filteredJobs = useMemo(() => {
        return jobs.filter(job => {
            const matchTitle = Search ? job.title.toLowerCase().includes(Search.toLowerCase()) : true
            const matchLocation = Location ? job.District.toLowerCase().includes(Location.toLowerCase()) : true
            const matchTime = Time ? checktime(job.startTime, job.endTime, Time) : true;
            return matchTitle && matchLocation && matchTime
        })
    }, [Search, Location, jobs, Time])



    return (
        <>
            <div ref={filterref} className="filter fixed -left-[70vw] z-10 bg-white w-[70vw] lg:w-[30vw] min-h-[90vh] shadow-2xl p-4">
                <div className='font-bold text-xl text-purple-500 logo flex items-center justify-between'>
                    FILTER
                    <div onClick={handleclose} className='text-black hover:text-blue-500 hover:bg-blue-100 rounded-full p-1'><IoMdClose size={23} /></div>
                </div>
                <div>
                    <label htmlFor="location" className='text-blue-600 bg-white w-18  absolute top-12.5 left-8 text-center font-medium'>Location</label>
                    <select ref={locationref} name="location" id="location" defaultValue=""  onChange={handlelocation} className='w-full mt-5 outline outline-gray-300 p-4 rounded-md focus:outline-2 focus:outline-blue-400' >
                        <option value="" disabled hidden >Select District</option>
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
                </div>
                <div className='mt-5'>
                    <label htmlFor="location" className='text-blue-600 bg-white w-12  absolute top-36.5 left-9 text-center font-medium'>Time</label>
                    <select ref={timeref} name="time" id="time" defaultValue="" className='w-full mt-5 outline-1 outline-gray-300 p-4 rounded-md focus:outline-2 focus:outline-blue-400' onChange={handletime}>
                        <option value="" disabled hidden>Select Time</option>
                        <option value="9:00 am">9:00 AM</option>
                        <option value="10:00 am">10:00 AM</option>
                        <option value="2:00 pm">2:00 PM</option>
                        <option value="3:00 pm">3:00 PM</option>
                        <option value="4:00 pm">4:00 PM</option>
                        <option value="5:00 pm">5:00 PM</option>
                        <option value="6:00 pm">6:00 PM</option>
                    </select>
                </div>
            </div>
            <div className='bg-gray-100 min-h-[90vh] h-auto py-10 px-8 '>
                <div className='text-2xl font-bold logo text-center text-purple-600'>
                    JOB LISTINGS
                </div>
                <div className='flex justify-center mt-10 gap-5'>
                    <input type="text" className='py-1 w-1/2 border-b-3 focus:outline-none' placeholder='Search' value={Search} onChange={handlesearch} />
                    <button className='bg-purple-500 text-white py-1 px-4 font-bold logo hover:bg-purple-600 rounded-sm cursor-pointer' onClick={handlefilter}>FILTER</button>
                    <button className='bg-gray-800 hover:bg-black text-white py-1 px-4 font-bold logo  rounded-sm cursor-pointer' onClick={handleclear}>CLEAR</button>
                </div>
                <div className="jobs flex flex-col items-center w-full">
                    {filteredJobs.length > 0 ? filteredJobs.map((item, index) => {
                        return <Jobscard key={index} item={item} />
                    }) : isloading ? <div className="mt-20 flex justify-center items-center space-x-1 text-sm text-gray-700">

                        <svg className="w-8 h-8 animate-spin text-text-col" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
                            <path clipRule='evenodd'
                                d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
                                fill='currentColor' fillRule='evenodd' />
                        </svg>
                        <div className='text-text-col text-xl text-black'>Loading ...</div>
                    </div> : <p className='mt-20 text-2xl font-medium'>Couldnt find your job</p>}
                </div>
            </div>

        </>
    )
}

export default Dashboard
