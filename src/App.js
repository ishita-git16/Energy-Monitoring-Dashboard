import React from 'react';
import './App.css';
import './scss/style.scss';
import Button from './Components/Button';
import {
  Switch,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import TheLayout from './containers/TheLayout';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)
const Login = React.lazy(() => import('./Components/Login/Login'));
function App() {
  return (
    <>
    <Router>
      <React.Suspense fallback={loading}>
        <Switch>
          <Route  exact path="/login" name="Home" render={props => <Login {...props} />} />
          <Route path="/" name="Home" render={props => <TheLayout {...props} />} />
        </Switch>
      </React.Suspense>
    </Router>
    <Button>Hello Mayuri </Button>
    </>
  );
}
export default App;

