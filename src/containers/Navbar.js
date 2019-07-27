import React from 'react';
import SignUpForm from '../components/SignUpForm'
import LoginForm from '../components/LoginForm'
import Welcome from '../components/Welcome'
import { Menu, Button } from 'semantic-ui-react'
import { Link, Route, Switch } from 'react-router-dom'


function Navbar(props){

    const { routerProps } = props

    return (
      <div>
        <Menu >
          <Menu.Item header >
            <Link to="/">Avalon Online</Link>
          </Menu.Item>

          <Menu.Item>
            <Link to="/signup"><Button primary name="signup">Sign up</Button></Link>
          </Menu.Item>

          <Menu.Item>
            <Link to="/login"><Button secondary name="login">Log-in</Button></Link>
          </Menu.Item>

        </Menu>
        <Switch>
          <Route path="/login" render={() => <LoginForm routerProps={routerProps}/>} />
          <Route path="/signup" render={() => <SignUpForm routerProps={routerProps}/>} />
          <Route path="/" render={() => <Welcome />} />
        </ Switch>
      </div>
    );
  }

export default Navbar;