import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Board from '../components/Board'
import ChatRoom from '../components/ChatRoom';

class Game extends Component {
  render() {
    console.log("SELECTED GAME", this.props.selectedGame)
    return (
      <Route exact path="/game" render={(routerProps) => {
        return (
          <Fragment>
            <Board />
            <ChatRoom selectedGame={this.props.selectedGame} />
          </Fragment>
        )
      }}/>
    );
  }
}

export default Game;