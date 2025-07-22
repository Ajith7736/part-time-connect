import React from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { FaRegHeart } from "react-icons/fa";
import { BsSuitcaseLg } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { clearappliedjobs } from '../src/redux/appliedJobSlice';
import { clearwishlist } from '../src/redux/wishlistSlice';
import { useDispatch } from 'react-redux';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Navbar() {
    const hamburger = useRef()
    let navigate = useNavigate()
    const [drop, setdrop] = useState(true)
    let user = localStorage.getItem("user")
    const userdata = localStorage.getItem("userdata") ? JSON.parse(localStorage.getItem("userdata")) : null
    const totalwish = useSelector(state => state.wishlist.total)
    const totaljobs = useSelector(state => state.appliedjob.total)
    const dispatch = useDispatch()

    // hamburger hide and unhide

    const handlehamburger = (e) => {
        if (drop) {
            hamburger.current.style = "top : 80px; transition:all .4s ease-out"
            setdrop(false)
        } else {
            hamburger.current.style = "top :-50; transition:all .4s ease-out"
            setdrop(true)
        }
    }

    const dropup = () => {
        hamburger.current.style = "top :-50; transition:all .4s ease-out"
        setdrop(!drop)
    }

    // delete all the applied jobs when the user loggedout

    const deleteapplicants = async () => {
        try {
            let res = await fetch(`${BASE_URL}/api/deleteallapplicants`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: userdata?.id })
            })
            let data = await res.json();
            if (res.status === 200) {
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Server error" });
        }
    }

    // logout the user when the user clicks the logout button

    const handlelogout = async () => {
        await deleteapplicants()
        localStorage.setItem("user", "Loggedout")
        dispatch(clearappliedjobs())
        dispatch(clearwishlist())
        localStorage.removeItem("userdata")
        hamburger.current.style = "top :-50; transition:all .4s ease-out"
        setdrop(!drop)
        window.location.reload();
    }


    return (
        <>
            <div className='sticky top-0 select-none z-10'>
                <div className='relative flex justify-between p-4 items-center bg-white/60 backdrop-blur-md z-10 h-[10vh]'>
                    <div className='logo max-[365px]:text-sm max-[450px]:text-base text-xl font-extrabold text-purple-500 lg:text-3xl'><NavLink to={'/'}>PART-TIME CONNECT</NavLink></div>
                    <div className=' gap-8 font-bold items-center hidden md:flex lg:text-xl'>
                        <NavLink to={"/"} className={(e) => { return e.isActive ? 'text-purple-500' : 'text-black' }} >Home</NavLink>
                        <NavLink to={"/about"} className={(e) => { return e.isActive ? 'text-purple-500' : 'text-black' }} >About</NavLink>
                        {user === "Loggedin" ? <><div className='flex items-center gap-4'>
                            <div className='flex gap-5 px-3 items-center'>
                                <NavLink to={"/favourite"} className={(e) => { return e.isActive ? "text-purple-600 relative" : "text=black relative" }}><FaRegHeart size={28} /><div className='absolute  font-bold -top-3 left-4 text-purple-600 bg-purple-200 rounded-full px-1'>{totalwish == 0 ? "" : totalwish}</div></NavLink>
                                <NavLink to={"/jobs"} className={(e) => { return e.isActive ? "text-purple-600 relative" : "text=black relative" }}><BsSuitcaseLg size={28} /><div className='absolute bg-purple-200 -top-3 left-5 text-purple-600 text-center rounded-full px-1 font-bold '>{totaljobs == 0 ? "" : totaljobs}</div></NavLink>
                            </div>
                            <NavLink to={`/${userdata.Username}`} className={(e) => { return e.isActive ? "outline-3 outline-purple-500 rounded-full" : "outline-none" }}><img className="w-10 h-10 rounded-full object-cover " src={userdata?.Profilepic === "man.png" ? `/${userdata?.Profilepic}` : `${userdata?.Profilepic}` } alt="Rounded avatar" /></NavLink>

                        </div>
                            <NavLink to={'/login'}><button className='bg-purple-500 px-2 py-1 text-white rounded-lg cursor-pointer' onClick={handlelogout}>Logout</button></NavLink></>
                            : <><NavLink to={"/login"} ><button className='bg-purple-500 px-2 py-1 text-white rounded-lg cursor-pointer border-none outline-none'>Login</button></NavLink>
                                <NavLink to={"/signup"} ><button className='bg-purple-500 px-2 py-1 text-white rounded-lg cursor-pointer'>SignUp</button></NavLink></>}
                    </div>
                    <div className='flex gap-5 md:hidden items-center'>
                        {user === "Loggedin" && <><div className='flex items-center gap-4'>
                            <div className='flex gap-5 mx-2 items-center'>
                                <NavLink to={"/favourite"} className={(e) => { return e.isActive ? "text-purple-600 relative" : "text-black relative" }}><FaRegHeart size={23} className='max-[450px]:size-5' /><div className='absolute  font-bold -top-3 left-3 text-purple-600 bg-purple-200 rounded-full px-1'>{totalwish == 0 ? "" : totalwish}</div></NavLink>
                                <NavLink to={"/jobs"} className={(e) => { return e.isActive ? "text-purple-600 relative" : "text-black relative" }}><BsSuitcaseLg size={23} className='max-[450px]:size-5' /><div className='absolute bg-purple-200 -top-3 left-4 text-purple-600 text-center rounded-full px-1 font-bold '>{totaljobs == 0 ? "" : totaljobs}</div></NavLink>
                            </div>
                            <NavLink to={`/${userdata.Username}`} className={(e) => { return e.isActive ? "outline-3 outline-purple-500 rounded-full" : "outline-none" }}><img className="w-6 h-6 rounded-full object-cover " src={userdata?.Profilepic === "man.png" ? `/${userdata?.Profilepic}` : `${userdata?.Profilepic}` } alt="Rounded avatar" /></NavLink>
                        </div></>}
                        <div className='block md:hidden cursor-pointer' onClick={handlehamburger}>{drop ? <GiHamburgerMenu className='size-6' /> : <IoMdClose className='size-6' />}</div>
                    </div>
                </div>
                <div className='absolute w-[98vw] shadow-md flex flex-col items-center gap-5 py-5 font-bold bg-gray-100 -top-60 left-2 select-none text-lg rounded-b-2xl ' ref={hamburger}>
                    <NavLink to={"/"} className={(e) => { return e.isActive ? 'text-purple-500' : 'text-black' }} onClick={dropup}>Home</NavLink>
                    <NavLink to={"/about"} className={(e) => { return e.isActive ? 'text-purple-500' : 'text-black' }} onClick={dropup}>About</NavLink>
                    {user === "Loggedin" ? <NavLink to={'/login'}><button className='bg-purple-500 px-2 py-1 text-white rounded-lg cursor-pointer' onClick={handlelogout}>Logout</button></NavLink>
                        : <><NavLink to={"/login"} ><button className='bg-purple-500 px-2 py-1 text-white rounded-lg cursor-pointer' onClick={dropup}>Login</button></NavLink>
                            <NavLink to={"/signup"} ><button className='bg-purple-500 px-2 py-1 text-white rounded-lg cursor-pointer' onClick={dropup}>SignUp</button></NavLink></>}
                </div>
            </div>
        </>
    )
}

export default Navbar
