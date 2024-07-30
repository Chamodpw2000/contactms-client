import React, { createContext, useEffect } from 'react'
import Homepage from './Pages/Homepage'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Register from './Pages/Register'
import Login from './Pages/Login'
import About from './Pages/About'
import Dashboard from './Pages/Dashboard'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
export const UserContext = createContext(null)
import { useState} from 'react'
import axios from 'axios'
import Contacts from './Componants/Contacts'
import AddContact from './Componants/AddContact'
import EditContact from './Componants/EditContact'
import Logout from './Componants/Logout'
import ProtectedRoutes from './Componants/ProtectedRoutes'
import NotFound from './Pages/NotFound'
import EditProfile from './Componants/EditProfile'



const router = createBrowserRouter([
  {

    path: '/',
    element: <Homepage/>
  },
  {
    path: '/register',
    element: <Register/>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/about',
    element: <About/>
  },
  {
      path: '/dashboard',
      element:<ProtectedRoutes><Dashboard/></ProtectedRoutes>,
      children:[
        {
          index: true,
          element : <Contacts/>
        },
        {
          path: '/dashboard/addcontact',
          element:<AddContact/>,

        },
        {
          path: '/dashboard/editcontact/:id',
          element:<EditContact/>
        },
        {
          path: '/dashboard/editprofile/',
          element:<EditProfile/>


        }

      ]

  },
  {
    path: '/logout',
    element: <Logout/>
  },
  {
    path: "*",
    element: <NotFound/>
  }

]);

const App = () => {

  const [user,setUser]= useState();
  useEffect(()=> {
    axios.get("http://127.0.0.1:3000/contactmsyt/verify",{
      headers:{
        Authorization: `Berear ${localStorage.getItem("token")}`
      }
    })
    .then(res=>{
      if(res.data.success){
        setUser(res.data.user)
      }
    }).catch(err=>{
      console.log(err)
    })
  },[])
  return (
    <div>
    <ToastContainer/>
    <UserContext.Provider value={{user,setUser}}>

    <RouterProvider router={router}/>

    </UserContext.Provider>



    </div>
  )
}

export default App