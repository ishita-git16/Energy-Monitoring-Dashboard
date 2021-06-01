import React ,{createContext}from 'react';
import './App.css';
import './scss/style.scss';
import {
  Switch,
  Route,
  BrowserRouter as Router,
  } from "react-router-dom";
import Logout from './views/pages/Logout';

const loading = (
  <div className="pt-3 text-center">
  <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
  )
const Login = React.lazy(() => import('./views/pages/login/Login'));
//const Login = React.lazy(()=>import('./Components/Login/Login'));
const TheLayout = React.lazy(() => import('./containers/TheLayout'));
// const ModbusDeviceEdit=React.lazy(()=>import('./Components/ModbusDeviceConfigration/Edit/ModbusDeviceEdit'));

function NotFound() 
{
  return <>You have landed on a page that doesn't exist</>;
}
function App() {

return (
  
    <Router>
      <React.Suspense fallback={loading}>
            <Switch>
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              <Route path="/logout" name="Logout" render={props => <Logout {...props}/>} /> 
              <Route path="/" name="Home" render={props => <TheLayout {...props}/>} /> 
              <Route path="*" render={props => <NotFound {...props}/>}/>
              {/* <Route path="modbus/edit" render={props => <ModbusDeviceEdit {...props}/>}/> */}
              </Switch>
          </React.Suspense>
          </Router>
        
          
          
  );
}
export default App;

