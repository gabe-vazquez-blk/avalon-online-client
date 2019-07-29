import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Board from '../components/Board'
import ChatRoom from '../components/ChatRoom';
<<<<<<< HEAD
import { Grid, Segment } from 'semantic-ui-react'
=======
import { ActionCable } from 'react-actioncable-provider';
>>>>>>> msg

class Game extends Component {
  render() {
    return (
      <Route exact path="/game" render={(routerProps) => {
        console.log("ROUTER PROPS", this.props.handleReceivedMessage)
        return (
<<<<<<< HEAD
          <Grid>
            <Grid.Column width={13}>
              <Board />
            </Grid.Column>
            <Grid.Column width={3}>
                <ChatRoom selectedGame={this.props.selectedGame} currentUser={this.props.currentUser}/>
            </Grid.Column>
          </Grid>
=======
          <Fragment>
            
            <Board />
            <ChatRoom selectedGame={this.props.selectedGame} currentUser={this.props.currentUser} handleReceivedMessage={this.props.handleReceivedMessage}/>
          </Fragment>
>>>>>>> msg
        )
      }}/>
    );
  }
}

export default Game;