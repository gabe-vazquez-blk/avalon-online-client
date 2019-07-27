import React, { Component } from 'react'
import Game from './Game'
import { Route, Switch } from 'react-router-dom'

class Lobby extends Component {

  render() {

    return (
      <div>
        <Switch>
          <Route path="/game" render={() => <Game />} />
        </ Switch>
      </div>
    );
  }
}

export default Lobby;

