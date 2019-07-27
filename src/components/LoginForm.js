import React, { Component } from 'react';
import { Button, Form, Grid, Segment, Message } from 'semantic-ui-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom'

class LoginForm extends Component {

  state = {
    username: "",
    password: ""
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) =>{
    e.preventDefault()
    const { username, password } = this.state
    console.log(username, password)

    fetch("http://localhost:3000/login", {
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
      .then(console.log)
      .then(() => this.props.routerProps.history.push("/lobby"))
  }

  render() {

    const { username, password } = this.state

    return (
      <Route exact path="/login" render={(routerProps) => {
        return (
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

                  <Button color='green' fluid size='large'>
                    Login
                  </Button>
                </Segment>
              </Form>
              <Message>
                New to us? <Link to="/signup">Sign Up</Link>
              </Message>
            </Grid.Column>
          </Grid>
        )
      }}/>
    );
  }
}

export default LoginForm;