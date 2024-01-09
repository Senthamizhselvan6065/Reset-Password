import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useFormik } from 'formik';
import { register } from '../helper/apiCalls';
import toast from 'react-hot-toast';
import { registerValidation } from '../helper/validate';


const Register = () => {

  const formik = useFormik({
      initialValues: {
           name: "",
           email: "",
           password: ""
      },
      validate: registerValidation,
      validateOnBlur: false,
      validateOnChange: false,
      onSubmit: values => {
          registerApiCall(values)
      }
  });

  const navigate = useNavigate();
  const registerApiCall = async values => {
      try {
          const response = await register(values);
          if(response.data.success === true){
              navigate('/login')
          }
      } catch (error) {
          toast.error(error.response.data.message)
      }
  }

  return (
    <div className='register-container container'>
        <div className="register-card card">
             <h2>Register Now</h2>
                 <form onSubmit={formik.handleSubmit}>
                     <input {...formik.getFieldProps('name')} type="text" placeholder='Name...'/>
                     <input {...formik.getFieldProps('email')} type="text" placeholder='Eamil...'/>
                     <input {...formik.getFieldProps('password')} type="text" placeholder='Password...'/>
                     <button type='submit'>Register</button>
                 </form> 
              <span className="navigation-link">Already have an Account? <Link smooth='true' id='link' to='/login'>Sign in</Link></span>   
        </div>
    </div>
  )
}

export default Register