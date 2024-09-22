import React, { useContext, useState } from 'react'
import '../assets/css/navbar.css'
import { Link } from 'react-router-dom'
import { UserContext } from '../App'



const Navbar = () => {



    const { user } = useContext(UserContext)
      
    return (
        <div className="navbar">
            <div className="navbar-left">

                <Link to="/" className="navbar-brand">

                    CONTACT Management System

                </Link>
            </div>

            <div className="navbar-right">

                <Link to="/about" className="navbar-link">About</Link>
                {
                    user ? <>

                        <Link to="/dashboard" className="navbar-link">Dashboard</Link>
                        <Link to="/dashboard/editprofile"  onClick={()=>setActiveLink(0)} className="navbar-link">{user.name}</Link>
                        <Link to="/logout" className="navbar-link">Logout</Link>


                    </> : <>
                        <Link to="/login" className="navbar-link">Login</Link>
                        <Link to="/register" className="navbar-link">Register</Link>


                    </>

                }



            </div>


        </div>
    )
}

export default Navbar