import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Board from '../components/Board'

class Game extends Component {
  render() {
    return (
      <Route exact path="/game" render={(routerProps) => {
        return (
          <Board />
        )
      }}/>
    );
  }
}

export default Game;