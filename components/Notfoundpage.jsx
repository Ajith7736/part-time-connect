import React from 'react'
import { NavLink } from 'react-router-dom'

// Not found page

function Notfoundpage() {
    return (
        <div>
            <section className="">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                    <div className="mx-auto h-[68vh] max-w-screen-sm text-center items-center flex flex-col  justify-center">
                        <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">404</h1>
                        <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">Something's missing.</p>
                        <p className="mb-4 text-lg font-light text-gray-500">Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
                        <NavLink to={"/"} className="text-white font-bold  bg-red-400  focus:outline-none rounded-lg text-lg logo px-5 py-2.5 my-4">Back to Homepage</NavLink>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Notfoundpage
