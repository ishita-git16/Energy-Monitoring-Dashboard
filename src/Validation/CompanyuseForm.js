import { useState, useEffect } from 'react';
import { useHistory ,Redirect} from 'react-router-dom'
import {useMutation } from 'react-query';

const  {access_token}  = JSON.parse(localStorage.getItem('auth'));

//callback, validate
const CompanyForm = () => 
{

  const history = useHistory();


  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  

  const handleSubmit = (event) => 
  {

    if (event) event.preventDefault();
    //setErrors(validate(values));
    setIsSubmitting(true);
    const axios = require('axios');
    
    const data=
    { 
        name: values.name,
        address: values.address,
        email:values.email,
        number_office:values.number_office,
        fin_start_month:values.fin_start_month,
        fin_end_month:values.fin_end_month,
        isactivitylog:values.isactivitylog,
        quarterperiod:values.quarterperiod,
        smtp_server_name:values.smtp_server_name,
        smtp_port:values.smtp_port,
        smtp_username:values.smtp_username,
        smtp_password:values.smtp_password,
        isactivitylog:values.isactivitylog
    }

    const request = axios({
      method: 'POST',
      url: 'http://192.168.1.226:3010/company',
      data: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json',
    
                'Authorization':`Bearer ${ access_token} `}
    })

.then(function (response) {
    if (response.status < 200 || response.status >= 300) 
          {
           history.push('/components/createcompany');
           //return <Redirect to="/components/createcompany" />
          }
          return history.push('/components/company')
          //return <Redirect to="/components/company" />


    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
 
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

export default CompanyForm;