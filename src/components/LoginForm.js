import React, { Component } from 'react';
import { Button, Form, Grid, Segment, Message } from 'semantic-ui-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom'

class LoginForm extends Component {

  state = {
    username: "",
    password: ""
  }

  render() {

    const { username, password } = this.state

    return (
      <Route exact path="/login" render={(routerProps) => {
        return (
          <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>

              <Form size='large'>
                <Segment stacked>
                  <Form.Input 
                    fluid icon='user' 
                    iconPosition='left' 
                    placeholder='Username'
                    value={username} 
                  />
                  <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    value={password}
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