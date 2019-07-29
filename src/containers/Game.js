import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Board from '../components/Board'
import ChatRoom from '../components/ChatRoom';
import { ActionCable } from 'react-actioncable-provider';

class Game extends Component {
  render() {
    return (
      <Route exact path="/game" render={(routerProps) => {
        console.log("ROUTER PROPS", this.props.handleReceivedMessage)
        return (
          <Fragment>
            
            <Board />
            <ChatRoom selectedGame={this.props.selectedGame} currentUser={this.props.currentUser} handleReceivedMessage={this.props.handleReceivedMessage}/>
          </Fragment>
        )
      }}/>
    );
  }
}

export default Game;