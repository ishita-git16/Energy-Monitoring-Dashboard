import React from 'react';
import { Redirect} from 'react-router-dom'
 const Logout =()=>
{
    
    sessionStorage.removeItem('auth');
   
    return <Redirect to="/" />
    ;
    //Promise.resolve();
}
export default Logout;