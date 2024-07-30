import React from 'react'
import "../assets/css/form.css"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import validationReg from '../Componants/ValidationRegister'



const Register = () => {

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''

  })

  const [errors, setErrors] = useState({})
  const [serverErrors, setServerErrors] = useState({})
  const navigate = useNavigate()


  const handleSubmit = (event) => {
    event.preventDefault()
    const errs = validationReg(values)
    setErrors(errs)
    if (errs.name === "" && errs.email === "" && errs.password === "") {
      axios.post("http://127.0.0.1:3000/contactmsyt/register", values)
        .then(res => {
          if(res.data.success){

            toast.success("Account Created Successfully", {
              position: "top-right",
              autoClose: 5000
            })
            navigate("/login")
            
          }
         
        }).catch(err => {
          if (err.response.data.errors) {
          setServerErrors(err.response.data.errors)
        } else {

          console.log(err)
        }

        })
    }
  }

    const handleInput = (event) => {
      setValues({ ...values, [event.target.name]: event.target.value })
    }
    return (
      <div className='form-container' >
        <form className='form' onSubmit={handleSubmit}>
          <h2>Create Account</h2>
          <div className='form-group'>
            <label htmlFor='name' className='form-label'>Name : </label>

            <input type='text' name='name' className='form-control' placeholder='Enter your name'
              onChange={handleInput}

            />


            {errors.name && <span className='error'>{errors.name}</span>}





          </div>


          <div className='form-group'>
            <label htmlFor='email' className='form-label'>Email : </label>

            <input type='text' name='email' className='form-control' placeholder='Enter your Email' autoComplete='off'
              onChange={handleInput}

            />
            {errors.email && <span className='error'>{errors.email}</span>}

          </div>


          <div className='form-group'>
            <label htmlFor='password' className='form-label'>Password : </label>

            <input type='password' name='password' className='form-control' placeholder='********' autoComplete='off'
              onChange={handleInput}

            />

            {errors.password && <span className='error'>{errors.password}</span>}


            {
          serverErrors.length>0 && (
            serverErrors.map((error,index)=>(
              <p className="error" key={index}>{error.msg}</p>
            ))
          )
        }

          </div>
          
         



          <button className="form-btn">Register</button>



          <p>Already Registerd? <Link to="/login">Login</Link></p>


        </form>











      </div>
    )
  
}

export default Register