import React from 'react'
import "../assets/css/form.css"
import {  useNavigate, useParams } from "react-router-dom"

import { useState , useEffect} from "react"
import axios from "axios"
import { toast } from "react-toastify"
import validationEditContact from './ValidateEditContact'






const EditContact = () => {

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
    const errs = validationEditContact(values)
    setErrors(errs)
   

    if (errs.name === "" && errs.email === "" &&  errs.phone ==="")  {
      axios.put("http://127.0.0.1:3000/contactmsyt/updatecontact/"+id, values,
        {headers:{
            Authorization:`Berear ${localStorage.getItem("token")}`
        }
  })
        .then(res => {
          if(res.data.success){

            toast.success("Contact Updated Successfully", {
              position: "top-right",
              autoClose: 5000
            })
            navigate("/dashboard")
            
          }

          else{
            toast.success("No Changers Made", {
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
  const {id} = useParams()

    useEffect(() => {

    
        axios.get("http://127.0.0.1:3000/contactmsyt/contacts/"+id, {
          headers: {
            Authorization: `Berear ${localStorage.getItem("token")}`
          }
        })
          .then((res) => {
            if (res.data.success) {
                setValues({
                    name:res.data.name,
                    email:res.data.email,
                    phone:res.data.phone,
                    address: res.data.address
                })
            }
          })
          .catch((err) => {
            console.log(err);
    
          });
      }, [])
    return (
      <div className='form-container' >
        <form className='form' onSubmit={handleSubmit}>
          <h2>Edit Contact</h2>
          <div className='form-group'>
            <label htmlFor='name' className='form-label'>Name : </label>

            <input type='text' name='name' className='form-control' placeholder='Enter name'
              onChange={handleInput}  value={values.name}


            />

{errors.name && <span className='error'>{errors.name}</span>}








          </div>


          <div className='form-group'>
            <label htmlFor='email' className='form-label'>Email : </label>

            <input type='text' name='email' className='form-control' placeholder='Enter Email Adress' autoComplete='off'
              onChange={handleInput} value={values.email}

            />

{errors.email && <span className='error'>{errors.email}</span>}


          </div>


          <div className='form-group'>
            <label  className='form-label'>Phone Number : </label>

            <input type='text' name='phone' className='form-control' placeholder='Enter Phone Number' autoComplete='off'
              onChange={handleInput}  value={values.phone}


            />

{errors.phone && <span className='error'>{errors.phone}</span>}


          </div>

          
          <div className='form-group'>
            <label  className='form-label'>Address : </label>

            <input type='text' name='address' className='form-control' placeholder='Enter Address' autoComplete='off'
              onChange={handleInput}  value={values.address}


            />

{
            serverErrors.length > 0 && (
              serverErrors.map((error, index) => (
              <p className="error" key={index}>{error.msg}</p>
              ))
            )
          }
          </div>
          
          <button onClick={handleSubmit} className="form-btn">Update Contact</button>


          <button className="form-btn" onClick={() => navigate("/dashboard")}>Cancel</button>








        </form>











      </div>
    )
  
}

export default EditContact