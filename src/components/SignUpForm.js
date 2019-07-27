import React, { Component } from 'react';
import { Button, Form, Grid, Segment, Message } from 'semantic-ui-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
const API = 'http://localhost:3000'

class SignUpForm extends Component {

  state = {
    username: "",
    password: "",
    confirmPassword: ""
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {username, password, confirmPassword} = this.state
    // console.log(username, password, confirmPassword)

    if (password === confirmPassword) {
      fetch(`${API}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ 
          username: username, 
          password: password 
        })
      })
        .then(res => res.json())
        .then(response => console.log(response))
    }
  }

  render() {

    const {username, password, confirmPassword} = this.state

    return (
      <Route exact path="/signup" render={(routerProps)=>{
        return(

          <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>

              <Form size='large' onSubmit={this.handleSubmit}>
                <Segment stacked>

                  <Form.Input 
                    fluid icon='user' 
                    iconPosition='left' 
                    placeholder='Username' 
                    name='username' 
                    value={username}
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    name='password'
                    type='password'
                    value={password}
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Confirm Password'
                    name='confirmPassword'
                    type='password'
                    value={confirmPassword}
                    onChange={this.handleChange}
                  />

                  <Button color='green' fluid size='large'>
                    Sign Up
                  </Button>
                </Segment>
              </Form>
              <Message>
                Already a user? <Link to="/login">Login</Link>
              </Message>
            </Grid.Column>
          </Grid>
        
        )
      }}/>
    );
  }
}

export default SignUpForm;