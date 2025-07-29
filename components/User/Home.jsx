import React from 'react'
import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
   const [user, setuser] = useState(localStorage.getItem("user"))
   const navigate = useNavigate()

   // To check whether the user is loggedin or not.
   
   useEffect(() => {
    if(user == "Loggedin"){
        navigate('/dashboard')
    }else{
        navigate('/')
    }
   }, [])
   

   
    return (
        <>
            <div className='h-[90vh] bg-[url(/wave.svg)] bg-no-repeat bg-cover md:bg-bottom flex flex-col justify-center items-center p-4 gap-10 select-none'>
                <div className='logo text-bold text-6xl max-[400px]:text-4xl lg:text-8xl'><span className='text-purple-600'>GET</span> YOUR <br /> <span className='text-purple-600'>PERFECT</span>  JOB</div>
                {user == "Loggedin" ?<NavLink to={"/dashboard"}><button className='bg-purple-600 hover:bg-purple-700 p-4 max-[400px]:text-sm text-xl font-bold text-white rounded-full cursor-pointer'>Search Jobs</button></NavLink>  : <NavLink to={'/login'}><button className='bg-purple-600 hover:bg-purple-700 p-4 max-[400px]:text-sm text-xl font-bold text-white rounded-full cursor-pointer'>Get Started</button></NavLink> }
            </div>
        </>
    )
}
