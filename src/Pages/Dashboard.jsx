import React from 'react'
import Navbar from '../Componants/Navbar'
import '../assets/css/dashboard.css'
import Sidebar from '../Componants/Sidebar'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <>
    <Navbar/>
    <div className = "dashboard">
            <div className='sidebar-container'>
                <Sidebar/>
            </div>

            <div className='contact-container'>
                <Outlet/>

            </div>





    </div>
    
    
    
    
    </>
  )
}

export default Dashboard