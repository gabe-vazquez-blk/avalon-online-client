import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Board from '../components/Board'
import ChatRoom from '../components/ChatRoom';
import { Grid, Segment } from 'semantic-ui-react'

class Game extends Component {
  render() {
    // console.log("SELECTED GAME", this.props.selectedGame)
    const {selectedGame} = this.props
    return (
      <Route exact path={'/game/:id'} render={(routerProps) => {
        
        // const foundGame = routerProps.match.params.id

        return (
          <Grid>
            <Grid.Column width={13}>
              <Board />
            </Grid.Column>
            <Grid.Column width={3}>
                <ChatRoom selectedGame={this.props.selectedGame} currentUser={this.props.currentUser}/>
            </Grid.Column>
          </Grid>
        )
      }}/>
    );
  }
}

export default Game;