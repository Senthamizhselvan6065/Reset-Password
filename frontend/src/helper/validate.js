import toast from "react-hot-toast";



/* register validation page */
export const registerValidation = async values => {
    let errors = {};
    errors = await registerValidate(values);
    errors = await emailValidate(values);
    errors = await passwordValidate(values)
    return errors;
};

/* login validation page */
export const loginValidation = async values => {
  let errors = {};
  errors = await emailValidate(values);
  errors = await passwordValidate(values)
  return errors;
};

/* forgot validation page */
export const forgotValidation = async values => {
  let errors = {};
  errors = await emailValidate(values);
  return errors;
};

/* reset validation page */
export const resetValidation = async values => {
  let errors = {};
  errors = await passwordValidate(values)
  return errors;
};

/* register validate */
const registerValidate = values => {
    const errors = {};
    if(!values.name) errors.name = toast.error('Name is Required...');
    return errors;
}


/* email validate */
const emailValidate = (values) => {
  const errors = {};
  if (!values.email)  errors.email = toast.error("Email is Required...");
  else if(values.email.includes(" ")) errors.email = toast.error("Wrong Email...");
  else if(!values.email.includes("@")) errors.email = toast.error("@ is Required...");
  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))  errors.email = toast.error("Invalid email address...");
  return errors;
};

/* password validate */
const passwordValidate = (values) => {
    const errors = {};
    let specialChars = /[~`¿¡!#$%\^&*€£@+÷=\-\[\]\\';,/{}\(\)|\\":<>\?\.\_]/g
    if (!values.password)  errors.password = toast.error("Password is Required...");
    else if (values.password.length < 6)  errors.password = toast.error("Password is more than 6 characters...");
    else if(values.password.includes(" ")) errors.password = toast.error("Wrong Email...");
    else if (!specialChars.test(values.password))  errors.password = toast.error("Password must have special character...");
    return errors;
  };

  