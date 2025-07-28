import React from 'react'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Admincompany() {
    const [companydata, setcompanydata] = useState([])

    const fetchcompanies = async () => {
        const res = await fetch(`${BASE_URL}/api/admin/getcompanies`, {
            method: "POST"
        })
        const data = await res.json()
        if (res.status == 200) {
            setcompanydata(data.companies)
        }
        if (res.status == 400 || res.status == 500) {
            toast.error(data.error)
        }
    }

    useEffect(() => {
        fetchcompanies()
    }, [])

    console.log(companydata)

    return (
        <div className='w-[90vw]'>
            <div className='text-3xl logo text-center pt-10'>COMPANIES</div>
            <div>
                {companydata.map((item,index)=>{
                    return <div key={index} className='font-medium text-center mt-10'>
                        {item.Name}
                        </div>
                })}
            </div>
        </div>
    )
}

export default Admincompany
