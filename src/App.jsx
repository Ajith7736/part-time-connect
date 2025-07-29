import Home from '../components/User/Home'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from '../components/User/Navbar'
import About from '../components/User/About'
import Login from '../components/User/Login'
import Signup from '../components/User/Signup'
import Profile from '../components/User/Profile'
import Favourites from '../components/User/Favourites'
import Jobs from '../components/User/Jobs'
import Dashboard from '../components/User/Dashboard'
import CompanySignup from '../components/Company/Signup'
import CompanyLogin from '../components/Company/Login'
import CompanyLayout from '../components/Company/CompanyLayout'
import Companydashboard from '../components/Company/Companydashboard'
import UserLayout from '../components/User/Userlayout'
import Applicants from '../components/Company/Applicants'
import Postjob from '../components/Company/Postjob'
import Companyprofile from '../components/Company/Companyprofile'
import Jobdetails from '../components/User/Jobdetails'
import AdminLayout from '../components/Admin/AdminLayout'
import Adminlogin from '../components/Admin/Adminlogin'
import Admindashboard from '../components/Admin/Admindashboard'
import Adminusers from '../components/Admin/Adminusers'
import Admincompany from '../components/Admin/Admincompany'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
          <Route path=':username' element={<Profile />} />
          <Route path='favourite' element={<Favourites />} />
          <Route path='jobs' element={<Jobs />} />
          <Route path='dashboard' element={<Dashboard />}/>
          <Route path='dashboard/:jobid' element={<Jobdetails/>}/>
        </Route>


        <Route path='/company' element={<><CompanySignup /></>} />
        <Route path='/company/login' element={<><CompanyLogin /></>} />

        <Route path='/company' element={<><CompanyLayout /></>}>
          <Route path="dashboard" element={<><Companydashboard /></>} />
          <Route path="applicants" element={<><Applicants /></>} />
          <Route path="postjob" element={<><Postjob /></>} />
          <Route path=":companyname" element={<><Companyprofile /></>} />
        </Route>

        <Route path='/admin' element={<><Adminlogin/></>}/>

        <Route path='/admin' element={<><AdminLayout/></>}>
            <Route path='dashboard' element={<><Admindashboard/></>}/>
            <Route path='users' element={<><Adminusers/></>}/>
            <Route path='company' element={<><Admincompany/></>}/>
          </Route>
      </Routes>
    </>
  )
}

export default App
