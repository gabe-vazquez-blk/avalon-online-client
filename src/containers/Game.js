import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Board from '../components/Board'
import ChatRoom from '../components/ChatRoom';
import { Grid, Segment } from 'semantic-ui-react'
import { ActionCable } from 'react-actioncable-provider';

class Game extends Component {
  render() {
    return (
      <Route exact path="/game" render={(routerProps) => {
        return (
          <Grid>
            <Grid.Column width={13}>
              <Board playerNum={this.props.selectedGame.num_of_players}/>
            </Grid.Column>
            <Grid.Column width={3}>
                <ChatRoom selectedGame={this.props.selectedGame} currentUser={this.props.currentUser} handleReceivedMessage={this.props.handleReceivedMessage}/>
            </Grid.Column>
          </Grid>
        )
      }}/>
    );
  }
}

export default Game;