import React from 'react'
import "../assets/css/form.css"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import validationAddContact from './Validationaddcontact'






const AddContact = () => {

  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''

  })

  const navigate = useNavigate()
  const [serverErrors, setServerErrors] = useState({})
  const [errors, setErrors] = useState({})


  const handleSubmit = (event) => {

    event.preventDefault()
    const errs = validationAddContact(values)
    setErrors(errs)
    if (errs.name === "" && errs.email === "" && errs.phone === "") {

      axios.post("http://127.0.0.1:3000/contactmsyt/addcontact", values,
        {
          headers: {
            Authorization: `Berear ${localStorage.getItem("token")}`
          }
        })
        .then(res => {
          if (res.data.success) {

            toast.success("Contact Added Successfully", {
              position: "top-right",
              autoClose: 5000
            })
            navigate("/dashboard")


          }

        }).catch(err => {

          if (err.response.data.errors) {
            setServerErrors(err.response.data.errors)
          } else {

            console.log(err)
          }

        });
    }

  };

  const handleInput = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }
  return (
    <div className='form-container' >
      <form className='form' onSubmit={handleSubmit}>
        <h2>Create a Contact</h2>
        <div className='form-group'>
          <label htmlFor='name' className='form-label'>Name : </label>

          <input type='text' name='name' className='form-control' placeholder='Enter name'
            onChange={handleInput}

          />


          {errors.name && <span className='error'>{errors.name}</span>}





        </div>


        <div className='form-group'>
          <label htmlFor='email' className='form-label'>Email : </label>

          <input type='text' name='email' className='form-control' placeholder='Enter Email Adress' autoComplete='off'
            onChange={handleInput}

          />

          {errors.email && <span className='error'>{errors.email}</span>}


        </div>


        <div className='form-group'>
          <label className='form-label'>Phone Number : </label>

          <input type='text' name='phone' className='form-control' placeholder='Enter Phone Number' autoComplete='off'
            onChange={handleInput}

          />


          {errors.phone && <span className='error'>{errors.phone}</span>}


        </div>


        <div className='form-group'>
          <label className='form-label'>Address : </label>

          <input type='text' name='address' className='form-control' placeholder='Enter Address' autoComplete='off'
            onChange={handleInput}

          />

{
            serverErrors.length > 0 && (
              serverErrors.map((error, index) => (
              <p className="error" key={index}>{error.msg}</p>
              ))
            )
          }

        </div>





        <button className="form-btn">Create Contact</button>





      </form>











    </div>
  )

}

export default AddContact