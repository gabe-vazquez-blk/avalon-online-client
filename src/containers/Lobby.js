import React, { Component } from 'react'
import Game from './Game'
import { Route, Switch } from 'react-router-dom'

class Lobby extends Component {

  render() {

    return (
      <Route exact path="/lobby" render={(routerProps) => {
        return (
          <div>
            <h1 className="welcome">Lobby...</h1>
            <Switch>
              <Route path="/game" render={() => <Game />} />
            </ Switch>
          </div>
        )
      }}/>
    );
  }
}

export default Lobby;

