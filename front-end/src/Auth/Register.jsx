import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {

    const [values,setValues]=useState({
        username:'',
        email:'',
        password:''
    })

    const handleChanges=(e)=>{
        setValues({...values /*spread operator*/,[e.target.name]:[e.target.value]}) /*e.target triggered the evernt. Copies the existing state (values) to ensure you don’t overwrite the entire object but only update specific fields.*/
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        axios.get('/')
    }


  return (
    <div className='flex justify-center items-center h-screen'>
        <div className='shadow-lg px-8 py-6 border w-96'>
            <h2 className='text-log font-bold mb-4'>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label htmlFor='username' class Name='block text-gray-700'>Username</label>
                    <input tpe="text" placeholder='Enter Username' className='w-full px-3 py-2 border' name="username" onChange={handleChanges}/>
                </div>
                <div className='mb-4'>
                    <label htmlFor='email' class Name='block text-gray-700'>Email</label>
                    <input tpe="email" placeholder='Enter Email'  className='w-full px-3 py-2 border' name="email" onChange={handleChanges} />
                </div>
                <div className='mb-4'>
                    <label htmlFor='password' class Name='block text-gray-700'>Password</label>
                    <input tpe="password" placeholder='Enter Password'  className='w-full px-3 py-2 border' name="password" onChange={handleChanges}/>
                </div>
                <button type="submit"class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Submit</button>
            </form>
            <div className='text-center '>
                <span class="mt-10 text-sm/6 text-gray-500">Already have account</span>
                <Link  to='/login'class="font-semibold text-indigo-600 hover:text-indigo-500">Login</Link>
            </div>
        </div>
    </div>
  )
}

export default Register