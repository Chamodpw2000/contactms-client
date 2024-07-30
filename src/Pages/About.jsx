import React from 'react'
import Navbar from '../Componants/Navbar'
import "../assets/css/home.css"

const About = () => {
  return (
    
    <>

    <Navbar/>
    <div className='home'>

        <h1 className='home-title'>

            CONTENT MANAGEMENT STSTEM
        </h1>

        <p className='home-description'>
            Start Collecting your contacts in a very smarter way. We provide very efficient and smarter way to handle contacts.
            You Can add your contacts with Name, Phone number, Email and Address.
        </p>

        <p className='home-description'>
            Devoloped by : <span className='home-developer'>Chamod Wanigasekara</span>
        </p>


    </div>




    </>
  )
}

export default About