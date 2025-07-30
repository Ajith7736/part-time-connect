import React from 'react'
import { MdDashboard } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa";

function Sidebar() {
    return (
        <div className='bg-gray-950 min-h-screen h-auto w-[10vw] md:w-[15vw] lg:w-[20vw] pt-30 lg:pt-20 flex flex-col gap-6 lg:gap-8 items-center'>
            <div className='text-white hidden lg:block font-bold text-3xl'>Admin Panel</div>
            <div className='bg-gray-800 w-12 lg:w-[15vw] flex  p-2 rounded-full lg:rounded-md cursor-pointer justify-center'>
                <NavLink to={"/admin/dashboard"} className={e => { return e.isActive ? "text-white flex items-center lg:gap-5 lg:w-[80%]" : "text-gray-300 flex items-center lg:gap-5 lg:w-[80%]" }}> <div><MdDashboard size={35} /></div><div className='hidden lg:block text-xl font-bold'>Dasboard</div></NavLink>
            </div>
            <div className='bg-gray-800 w-12 lg:w-[15vw] flex  p-2 rounded-full lg:rounded-md cursor-pointer justify-center'>
                <NavLink to={"/admin/users"} className={e => { return e.isActive ? "text-white flex items-center lg:gap-7 lg:w-[80%]" : "text-gray-300 flex items-center lg:gap-7 lg:w-[80%]" }}><div> <FaUser size={28} /></div><div className='hidden lg:block text-xl font-bold'>Users</div></NavLink>
            </div>
            <div className='bg-gray-800 w-12 lg:w-[15vw] flex  p-2 rounded-full lg:rounded-md cursor-pointer justify-center'>
                <NavLink to={"/admin/company"} className={e => { return e.isActive ? "text-white flex items-center lg:gap-5 lg:w-[80%]" : "text-gray-300 flex items-center lg:gap-5 lg:w-[80%]" }}> <FaBuilding size={35} /><div className='hidden lg:block text-xl font-bold'>Companies</div></NavLink>
            </div>
        </div>
    )
}

export default Sidebar
