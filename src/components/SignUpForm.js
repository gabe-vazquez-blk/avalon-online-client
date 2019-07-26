import React, { Component } from 'react';
import { Button, Form, Grid, Segment, Message } from 'semantic-ui-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';


class SignUpForm extends Component {

  state = {
    username: "",
    password: "",
    confirmPassword: ""
  }

  render() {

    const {username, password, confirmPassword} = this.state

    return (
      <Route exact path="/signup" render={(routerProps)=>{
        return(

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
                  <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Confirm Password'
                    type='password'
                    value={confirmPassword}
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