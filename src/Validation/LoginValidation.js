export default function validate(values) {
  let errors = {};
  /*if (!values.username) {
    errors.username = 'Email address is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.username = 'Email address is invalid';
  }*/
  if (!values.username) 
  {
    errors.username = 'Please enter your username';
  } 
  else if (values.username!='admin') {
    errors.username = 'Incorrect Username';
  }
  if (!values.password) 
  {
    errors.password = 'Please enter your password';
  } 

  /*if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 8) {
    errors.password = 'Password must be 8 or more characters';
  }*/
  return errors;
};