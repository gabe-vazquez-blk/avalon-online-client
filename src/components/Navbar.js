import React from 'react';
import { Menu, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


function Navbar(){

    return (
      <Menu >
        <Menu.Item header >
          Avalon Online
        </Menu.Item>

        <Menu.Item>
          <Link to="/signup"><Button primary name="signup">Sign up</Button></Link>
        </Menu.Item>

        <Menu.Item>
          <Link to="/login"><Button secondary name="login">Log-in</Button></Link>
        </Menu.Item>

      </Menu>
    );
  }

export default Navbar;