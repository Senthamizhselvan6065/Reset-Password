import axios from 'axios';
let BASE_URL = `https://password-reset-api-c3sy.onrender.com/api/v1`;


/* register api call */
export const register = async values => await axios.post(`${BASE_URL}/register`, values);

/* login api call */
export const login = async values => await axios.post(`${BASE_URL}/login`, values);

/* forgot password api call */
export const forgotPassword = async values => axios.post(`${BASE_URL}/forgot/password`, values);

/* reset password api call */
export const resetPassword = async (values, token) => axios.post(`${BASE_URL}/reset/password/${token}`, values);