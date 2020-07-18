import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Toast from "react-bootstrap/Toast";
import Spinner from "react-bootstrap/Spinner";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";


import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import axios from 'axios';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  Redirect
} from "react-router-dom";

const normalizePort = val => {
  const port = parseInt(val, 10);
  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
};

axios.defaults.baseURL = process.env.PORT + '/v1';
console.log(process.env.PORT + '/v1');

const auth = {
  isAuthenticated: false,
  authenticate() {
    axios.get('/loggedIn', {withCredentials: true}).then(res=>{
      if(res.status === 200){
        this.isAuthenticated = true;
        console.log('auth', this.isAuthenticated);
      }
    }).catch(err => {
      if(err.response.status === 403){
        console.log('not logged in');
      }
    })
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

export default function App() {
  return (
    <Header/>
  );
}

function Header(props) {
  return (
    <Router>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">{'JSONStore { }'}</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link href="/register">Register</Nav.Link>  
          <Nav.Link href="/private">Dashboard</Nav.Link>
          <Nav.Link href="/logout">Logout</Nav.Link>
        </Nav>
      </Navbar>
      <Switch>
      <Route path="/logout">
          <LogOut/>
        </Route>
        <Route path="/private">
          <Dashboard/>
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register/>
        </Route>
        <Route path="/">
          <Home/>
        </Route>
      </Switch>
    </Router>
  );
}

function LogOut() {
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    axios.get('/logout', {withCredentials: true}).then(res => {
      setLoggedIn(false);
    })
  })

  return (
    (loggedIn) ? <Spinner animation="border"/> :
    <Redirect to="/"/>
  );
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
