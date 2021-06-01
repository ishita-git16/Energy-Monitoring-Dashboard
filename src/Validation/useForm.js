import { useState, useEffect, useContext } from 'react';
import { Redirect, useHistory } from 'react-router-dom'
import authContext  from '../App';
const SERVER_URL = process.env.REACT_APP_SERVER_URL;



const useForm = (callback, validate) => 
{
  const history = useHistory();
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  //const{isAuthenticated, setHasAuthenticated} =useContext(authContext)
  //const isAuthenticated= useContext(authContext);
  // const  setHasAuthenticated  = useContext(authContext);
  
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  const handleSubmit = (event) => 
  {

    if (event) event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
    const axios = require('axios');
    const formData = new FormData();
    formData.append('username', values.username);
    formData.append('password', values.password);

    const request = axios({
      method: 'POST',
      url: 'http://192.168.1.226:3010/auth',
     // url:SERVER_URL + '/auth',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    
    .then(response => {

   localStorage.setItem('auth',JSON.stringify(response.data));
   sessionStorage.setItem('auth',JSON.stringify(response.data));
   //const token = setToken(sessionStorage.getItem('auth'));

   //console.log(token);    //
    
    //  setToken(tokens);
    //  console.log(tokens);
      
      
      if (response.status < 200 || response.status >= 300) 
      {
        
       history.push('/login');
      }
      else
      {
        //setHasAuthenticated(true);
          return history.push('/')

      }
  })
  return request
 
  };

  const handleChange = (event) => {
    event.persist();
    setValues(values => ({ ...values, [event.target.name]: event.target.value }));
};

 return {
    handleChange,
    handleSubmit,
    values,
    errors,
    
  }
};

export default useForm;