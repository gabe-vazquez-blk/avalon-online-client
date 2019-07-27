import React from 'react';
import { Route } from 'react-router-dom'

function Welcome() {

  return(
    <Route exact path="/" render={(routerProps) => {
      return(
        <div className="welcome">
          <h4>WELCOME TO</h4>
          <h1>AVALON ONLINE</h1>
        </div>
      )
    }}/>
  )

}

export default Welcome;










