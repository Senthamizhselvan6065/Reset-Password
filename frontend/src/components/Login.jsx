import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineMailLock } from "react-icons/md";
import { MdOutlinePassword } from "react-icons/md";
import { useFormik } from 'formik';
import { login } from '../helper/apiCalls';
import toast from 'react-hot-toast';
import { loginValidation } from '../helper/validate';


const Login = () => {

  const formik = useFormik({
    initialValues: {
         email: "",
         password: ""
    },
    validate: loginValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: values => {
        loginApiCall(values)
    }
  });

  const navigate = useNavigate();
  const loginApiCall = async values => {
      try {
         const response = await login(values);
         if(response.data.success === true){
             navigate('/forgot/password')
         }
      } catch (error) {
         toast.error(error.response.data.message)
      }
  }

  return (
    <div className='login-container container'>
        <div className="login-card card">
             <h2>Login</h2>
                 <form onSubmit={formik.handleSubmit}>
                  <div className="input-icon-field">
                      <span className="icon"><MdOutlineMailLock /></span>
                      <input {...formik.getFieldProps('email')} type="text" placeholder='Eamil...'/>
                  </div>
                  <div className="input-icon-field">
                      <span className="icon"><MdOutlinePassword /></span>
                     <input {...formik.getFieldProps('password')} type="text" placeholder='Password...'/>
                  </div>
                     <button type='submit'>Login</button>
                 </form> 
              <span className="navigation-link"><Link smooth='true' id='link' to='/forgot/password'>Forgot password!</Link></span>   
              <span className="navigation-link">Don't have an Account? <Link smooth='true' id='link' to='/register'>Sign in</Link></span>   
        </div>
    </div>
  )
}

export default Login