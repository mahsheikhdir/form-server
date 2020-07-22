import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Redirect} from 'react-router-dom';

import axios from 'axios';

class Register extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        username: '',
        email: '',
        password: '',
        error: null,
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleSubmit(event) {
      console.log(this.state);
      event.preventDefault();

      axios.post("/register", {username: this.state.username, email: this.state.email, password: this.state.password}).then(res => {
        if(res.status == 201){
            localStorage.setItem('user', res.data.createdUser[0].username);

            this.setState({
                redirect: '/login'
            })
          } else {
            this.setState({
                redirect: '/register'
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
        <h1>Register</h1>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              value={this.state.username}
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              value={this.state.email}
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
          {(this.state.redirect == null) ? <Redirect to="/register"/> : <Redirect to={this.state.redirect}/> }
          <p>Already a user? <a href="/login">Login.</a></p>
        </Form>
      );
    }
}

export default Register;