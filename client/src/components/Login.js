import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Redirect} from 'react-router-dom';

import axios from 'axios';

class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        username: '',
        password: '',
        redirect: null,
        error: null,
      };

      
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleSubmit(event) {
      event.preventDefault();

      axios.post("/login", {username: this.state.username, password: this.state.password}, {withCredentials: true}).then(res => {
          if(res.status == 200){
            this.setState({
              redirect: '/private'
          })
          }
      }).catch((err) => {
        this.setState({error: err.response.data.message})
      })
    }
  
    handleInputChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
    }
  
    render() {
      return (
        <Form onSubmit={this.handleSubmit} className="login-form">
        <h1>Login</h1>
        
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              value={this.state.username}
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <br /><br />
          {(this.state.error !== null) && <small style={{color: "red"}}>{this.state.error}</small>}
          {(this.state.redirect == null) ? <Redirect to="/login"/> : <Redirect to={this.state.redirect}/> }
        </Form>
      );
    }
}

export default Login;