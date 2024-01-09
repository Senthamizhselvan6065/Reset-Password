import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineMailLock } from "react-icons/md";
import { useFormik } from 'formik';
import { forgotPassword } from '../helper/apiCalls';
import toast from 'react-hot-toast';
import { forgotValidation } from '../helper/validate';


const ForgotPassword = () => {

  const formik = useFormik({
    initialValues: {
         email: ""
    },
    validate: forgotValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: values => {
        ForgotPasswordApiCall(values)
    }
  })
 
  const navigate = useNavigate();
  const ForgotPasswordApiCall = async values => {
      try {
          const response = await forgotPassword(values);
          toast.success(response.data.message);
          if(response.data.success === true){
              navigate('/login')
          }
      } catch (error) { 
          toast.error(error.response.data.message)
      }
  }

  return (
    <div className='forgot-container container'>
        <div className="forgot-card card">
             <h2>Forgot Password</h2>
             <p>Enter the your emaill address and we'll send the reset password link create a new password.</p>
                 <form onSubmit={formik.handleSubmit}>
                  <div className="input-icon-field">
                      <span className="icon"><MdOutlineMailLock /></span>
                      <input {...formik.getFieldProps('email')} type="text" placeholder='Eamil...'/>
                  </div>
                     <button type='submit'>Send</button>
                 </form> 
              <span className="navigation-link"><Link smooth='true' id='link' to='/login'>Back</Link></span>   
        </div>
    </div>
  )
}

export default ForgotPassword