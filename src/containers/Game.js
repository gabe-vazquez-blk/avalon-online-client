import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Board from '../components/Board'
import ChatRoom from '../components/ChatRoom';
import { Grid, Segment } from 'semantic-ui-react'

class Game extends Component {
  render() {
    console.log("SELECTED GAME", this.props.selectedGame)
    return (
      <Route exact path="/game" render={(routerProps) => {
        return (
<<<<<<< HEAD
          <Fragment>
            <Board />
            <ChatRoom selectedGame={this.props.selectedGame} currentUser={this.props.currentUser}/>
          </Fragment>
=======
          <Grid>
            <Grid.Column width={13}>
              <Board />
            </Grid.Column>
            <Grid.Column width={3}>
                <ChatRoom selectedGame={this.props.selectedGame} />
            </Grid.Column>
          </Grid>
>>>>>>> style-chat
        )
      }}/>
    );
  }
}

export default Game;