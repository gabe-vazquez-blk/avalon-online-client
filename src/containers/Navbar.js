import React from 'react';
import SignUpForm from '../components/SignUpForm'
import LoginForm from '../components/LoginForm'
import Welcome from '../components/Welcome'
import { Menu, Button } from 'semantic-ui-react'
import { Link, Route, Switch } from 'react-router-dom'


function Navbar(props){

    const { setUser, currentUser, logout } = props
    return (
      <div>
        <Menu >
          <Menu.Item as={Link} name='lobby' to='/lobby' >
            Avalon Online
          </Menu.Item>

          {!currentUser 
            ? <Menu.Menu position='right'>
                  <Menu.Item>
                    <Link to="/signup"><Button primary name="signup">Sign up</Button></Link>
                  </Menu.Item>

                  <Menu.Item>
                    <Link to="/login"><Button secondary name="login">Log-in</Button></Link>
                  </Menu.Item>
                </Menu.Menu>
            : 
              <Menu.Menu position='right'>
                <Menu.Item>
                {"👤 " + currentUser.username}
                </Menu.Item>

                < Menu.Item >
                  <Button onClick={logout}>Logout</Button>
                </Menu.Item>
              </Menu.Menu>
          }

        </Menu>
        <Switch>
          <Route path="/login" render={() => <LoginForm  setUser={setUser} />} />
          <Route path="/signup" render={() => <SignUpForm setUser={setUser} />} />
          <Route path="/" render={() => <Welcome />} />
        </ Switch>
      </div>
    );
  }

export default Navbar;