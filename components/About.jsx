import React from 'react'

function About() {
  return (

   // About Page

    <div className='flex flex-col gap-8 items-center py-8'>
      <div className='text-center text-4xl lg:text-6xl text-purple-500 font-bold'>About Us</div>
      <div className='text-center font-medium text-lg lg:text-xl'>We understand that being a student can be financially challenging Our mission is to help students find flexible Part-time job oppurtunities.</div>
      <div className="card flex flex-col gap-8 md:flex-row">
        <div className='bg-gray-100  max-w-[70vw] md:max-w-[28vw] p-4 flex flex-col gap-5 items-center rounded-2xl h-[30vh] md:h-[40vh] shadow-md'>
          <div className="logo"><img src="Graduation.svg" className='size-15 md:size-25 lg:size-35' alt="" /></div>
          <h1 className='text-xl font-bold text-purple-500 logo md:text-2xl lg:text-3xl text-center'>FOR STUDENTS</h1>
          <p className='text-center lg:text-lg'>Explore job oppurtunities tailored for students giving you the freedom to balance work and studies</p>
        </div>
        <div className='bg-gray-100  max-w-[70vw] md:max-w-[28vw] p-4 flex flex-col gap-5 items-center rounded-2xl h-[30vh] md:h-[40vh] shadow-md'>
          <div className="logo"><img src="Clock.svg" className='size-15 md:size-25 lg:size-35' alt="" /></div>
          <h1 className='text-xl font-bold text-purple-500 logo md:text-2xl lg:text-3xl text-center'>FLEXIBLE HOURS</h1>
          <p className='text-center lg:text-lg'>Explore job oppurtunities tailored for students giving you the freedom to balance work and studies</p>
        </div>
        <div className='bg-gray-100 max-w-[70vw] md:max-w-[28vw] p-4 flex flex-col gap-3 items-center rounded-2xl h-[30vh] md:h-[40vh] shadow-md'>
          <div className="logo"><img src="Money.svg" className='size-15 md:size-25 lg:size-35' alt="" /></div>
          <h1 className='text-xl font-bold text-purple-500 logo md:text-2xl lg:text-3xl text-center'>ACHIEVE FINANCIAL <br /> INDEPENDANCE</h1>
          <p className='text-center lg:text-base'>Explore job oppurtunities tailored for students giving you the freedom to balance work and studies</p>
        </div>
      </div>
    </div>
  )
}

export default About
