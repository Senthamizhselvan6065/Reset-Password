import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { MdOutlinePassword } from "react-icons/md";
import toast from 'react-hot-toast';
import { useFormik } from 'formik';

const ResetPassword = () => {

  const formik = useFormik({
    initialValues: {
         password: "",
         confirmPassword: ""
    },
    validate: '',
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: values => {
        resetPasswordApiCall(values);
    }
  });
 
  const {token} = useParams()
  const resetPasswordApiCall = async values => {
      try {
          const response = await resetpass(values, token);
          toast.success(response.data.message);
      } catch (error) {
          toast.error(error.response.data.message)
      }
  }

  return (
    <div className='reset-container container'>
        <div className="reset-card card">
             <h2>Reset Password</h2>
             <p>Create a new password.</p>
                 <form onSubmit={formik.handleSubmit}>
                  <div className="input-icon-field">
                      <span className="icon"><MdOutlinePassword /></span>
                      <input {...formik.getFieldProps('password')} type="text" placeholder='New password...'/>
                  </div>
                  <div className="input-icon-field">
                      <span className="icon"><MdOutlinePassword /></span>
                     <input {...formik.getFieldProps('confirmPassword')} type="text" placeholder='Confirm password...'/>
                  </div>
                     <button type='submit'>Update</button>
                 </form> 
              <span className="navigation-link"><Link smooth='true' id='link' to='/login'>Back</Link></span>   
        </div>
    </div>
  )
}

export default ResetPassword