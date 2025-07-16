import React from 'react'
import { MdDashboard } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import { MdPostAdd } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import { IoPerson } from "react-icons/io5";

function Companypanel() {
     const company = localStorage.getItem("companydata") && JSON.parse(localStorage.getItem("companydata"))
    return (
        <div>
            <div className='bg-gray-950 h-[100%] w-[15vw] md:w-[9vw] lg:w-[20vw] xl:w-[18vw] flex flex-col gap-6 xl:gap-8 items-center pt-20 lg:pt-10'>
                <div className='text-white font-bold hidden lg:block text-xl xl:text-2xl logo'>Company Panel</div>
                <NavLink to={'/company/dashboard'} className={e => {return e.isActive ? "text-white" : "text-gray-400"}}><div className=' font-bold flex lg:w-[14vw] xl:w-[17vw] bg-gray-900 p-3 xl:py-2 xl:px-9 rounded-full lg:rounded-xl items-center hover:bg-gray-800 gap-2 xl:gap-4 '><MdDashboard size={30} /><div className='hidden lg:block lg:text-md xl:text-xl'>Dashboard</div></div></NavLink>
                <NavLink to={'/company/applicants'} className={e => {return e.isActive ? "text-white" : "text-gray-400"}}><div className=' font-bold flex lg:w-[14vw] xl:w-[17vw] bg-gray-900 p-3 xl:py-2 xl:px-9 rounded-full lg:rounded-xl items-center  hover:bg-gray-800 gap-2 xl:gap-4 '><FaClipboardList size={30}  /><div className='hidden lg:block lg:text-md xl:text-xl'>Applicants</div></div></NavLink>
                <NavLink to={'/company/postjob'} className={e => {return e.isActive ? "text-white" : "text-gray-400"}}><div className=' font-bold flex lg:w-[14vw] xl:w-[17vw] bg-gray-900 p-3 xl:py-2 xl:px-9 rounded-full lg:rounded-xl items-center  hover:bg-gray-800 gap-2 xl:gap-4 '><MdPostAdd size={32} /><div className='hidden lg:block lg:text-md xl:text-xl'>Post job</div></div></NavLink>
                <NavLink to={`/company/${company.Companyname}`} className={e => {return e.isActive ? "text-white" : "text-gray-400"}}><div className=' font-bold flex lg:w-[14vw] xl:w-[17vw] bg-gray-900 p-3 xl:py-2 xl:px-9 rounded-full items-center lg:rounded-xl  hover:bg-gray-800 gap-3 xl:gap-5 '><IoPerson size={29}/><div className='hidden lg:block lg:text-md xl:text-xl'>Profile</div></div></NavLink>   
            </div>
        </div>
    )
}

export default Companypanel
