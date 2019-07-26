import React, { Component } from 'react'
import SignUpForm from '../components/SignUpForm'
import LoginForm from '../components/LoginForm'
import Welcome from '../components/Welcome'
import { Route, Switch } from 'react-router-dom'

class MainContainer extends Component {

  render() {

    return (
      <div>
        <Switch>
          <Route path="/login" render={() => <LoginForm />} />
          <Route path="/signup" render={() => <SignUpForm />} />
          <Route path="/" render={() => <Welcome />} />
        </ Switch>
      </div>
    );
  }
}

export default MainContainer;

