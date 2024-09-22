import React from 'react'
import "../assets/css/form.css"
import { useNavigate, useParams } from "react-router-dom"

import { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import validationEditProfile from '../Componants/ValidationEditProfile'
import "../assets/css/form.css"






const EditProfile = () => {

  const [errors, setErrors] = useState({})
  const [serverErrors, setServerErrors] = useState({})

  const [values, setValues] = useState({
    name: '',
    email: ''



  })



  const [profile, setProfile] = useState([])


  useEffect(() => {


    axios.get("http://127.0.0.1:3000/contactmsyt/getprofile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((res) => {
        if (res.data.success) {

          const profileData = res.data.profile1
          setProfile(profileData)

          setValues({
            name: profileData.name,
            email: profileData.email
          })
          console.log(profile)


        }
      })
      .catch((err) => {
        console.log("Error is", err);

        console.log(err);

      });
  }, [])


  const navigate = useNavigate()







  const handleSubmit = (event) => {
    event.preventDefault()
    const errs = validationEditProfile(values)
    setErrors(errs)
    if (errs.name === "" && errs.email === "") {


      axios.put("http://127.0.0.1:3000/contactmsyt/editprofile/", values,
        {
          headers: {
            Authorization: `Berear ${localStorage.getItem("token")}`
          }
        })
        .then(res => {
          if (res.data.success) {



            toast.success("Profile Updated Successfully", {
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

  console.log(errors)

  const handleInput = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }






  return (
    <div className='form-container' >
      <form className='form' onSubmit={handleSubmit}>
        <h2>Edit Profile</h2>
        <div className='form-group'>
          <label htmlFor='name' className='form-label'>Name : </label>

          <input type='text' name='name' className='form-control' placeholder='Enter name'
            onChange={handleInput} value={values.name}


          />


          {errors.name && <span className='error'>{errors.name}</span>}





        </div>


        <div className='form-group'>
          <label htmlFor='email' className='form-label'>Email : </label>

          <input type='text' name='email' className='form-control' placeholder='Enter Email Adress' autoComplete='off'
            onChange={handleInput} value={values.email}

          />

          {errors.email && <span className='error'>{errors.email}</span>}

          {
            serverErrors.length > 0 && (
              serverErrors.map((error, index) => (
              <p className="error" key={index}>{error.msg}</p>
              ))
            )
          }
         
         

        </div>










        <button className="form-btn">Edit Profile</button>
        

        <button className="form-btn" onClick={() => navigate("/dashboard")}>Cancel</button>






      </form>











    </div>
  )

}

export default EditProfile