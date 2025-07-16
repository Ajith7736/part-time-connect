import React from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import Loading from '../Loading'
import { useNavigate } from 'react-router-dom'


function Companyotp(params) {

  const otp_count = 5
  const [Otparr, setOtparr] = useState(new Array(otp_count).fill(""))
  const inputref = useRef([])
  const [minutes, setminutes] = useState(1)
  const [seconds, setseconds] = useState(59)
  const [isloading, setisloading] = useState(false)
  const navigate = useNavigate()
  let timer = useRef()

  useEffect(() => {
    timer.current = setTimeout(() => {
      setseconds(seconds - 1)
      if (seconds == 0) {
        setseconds(59)
        setminutes(minutes - 1)
      }
    }, 1000);
    if (seconds === 0 && minutes === 0) {
      clearTimeout(timer.current)
    }
  }, [seconds, minutes])


  const handlechange = (value, i) => {
    if (isNaN(value)) return
    const newarr = [...Otparr]
    const newValue = value.trim()
    newarr[i] = newValue.slice(-1)
    setOtparr(newarr)
    newValue && i < 4 && inputref?.current[i + 1].focus()
    // newValue && inputref?.current[i].setSelectionRange(1, 1)
  }


  useEffect(() => {
    inputref?.current[0].focus()
  }, [])

  const handlekeydown = (e, index) => {
    if (e.key === "Backspace") {
      if (!e.target.value && index > 0) {
        inputref?.current[index - 1].focus();
      }
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault()
      if (index > 0) {
        inputref?.current[index - 1].focus()
      } else {
        inputref?.current[4].focus()
      }

    }
    if (e.key === "ArrowRight") {
      if (index < 4) {
        inputref?.current[index + 1].focus()
      } else {
        inputref?.current[0].focus()
      }
    }
  }


  let finalotp = Otparr.toString().replaceAll(",", "")

  const handlesubmit = async () => {
    let res = await fetch("http://localhost:3000/api/company/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }, body: JSON.stringify({ otp: finalotp, Email: params.Email })
    })
    let data = await res.json()
    if (res.status == 200) {
      toast.success(data.success)
      navigate('/company/login')
    }
    if (res.status == 400 || res.status == 500) {
      toast.error(data.error)
    }
  }

  const handleresend = async () => {
    setisloading(true)
    let res = await fetch("http://localhost:3000/api/company/resend-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }, body: JSON.stringify({ Email: params.Email })
    })
    let data = await res.json()
    if (res.status == 200) {
      toast.success(data.success)
      setisloading(false)
      clearTimeout(timer.current)
      setseconds(59)
      setminutes(1)
    }
    if (res.status == 400 || res.status == 500) {
      toast.error(data.error)
      setisloading(false)
    }
  }

  return (
    <>
    {isloading && <> <div className='text-center fixed w-full h-[90vh] z-20'><Loading /></div></>}
    <div className='bg-white fixed p-4 rounded-xl shadow-xl flex flex-col gap-4'>
      <h1 className='text-2xl font-bold text-center logo'>Validate OTP</h1>
      <div>
        {Otparr.map((item, index) => {
          return <input ref={(e) => inputref.current[index] = e} key={index} type="text" className='outline mt-4 h-12 w-12 m-3 font-bold focus:outline-blue-700 text-center text-2xl' value={Otparr[index]} onChange={(e) => handlechange(e.target.value, index)} onKeyDown={(e) => handlekeydown(e, index)} />
        })}
      </div>
      <p className='text-lg text-center'>A 5 digit OTP is sent to your Email</p>
      <div className='text-red-500 text-center '>{minutes < 10 ? "0" + minutes : minutes}:{seconds < 10 ? "0" + seconds : seconds}<button className='font-medium hover:underline ml-1' onClick={handleresend}>Resend OTP</button></div>
      <button className='bg-purple-600 rounded-md p-4 text-xl font-bold text-white hover:bg-purple-700 cursor-pointer' onClick={handlesubmit}>Verify OTP</button>
    </div>
    </>
  )
}

export default Companyotp
