import React, { Component } from 'react';
import Player from './Player'
import QuestCoins from './QuestCoins'
import VoteTrack from './VoteTrack'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {Grid} from 'semantic-ui-react'

class Board extends Component {

  render() {
    return (
      <div>
        <br></br>
        <br></br>
        <Grid verticalAlign='middle' columns={7} centered>
          <Grid.Row>
            <Grid.Column>
            <Player />
            </Grid.Column>
            <Grid.Column>
              <Player />
            </Grid.Column>
            <Grid.Column>
              <Player />
            </Grid.Column>
            <Grid.Column>
              <Player />
            </Grid.Column>
            <Grid.Column>
              <Player />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <QuestCoins />
        <br></br>
        <br></br>
        <VoteTrack />
      </div>
    );
  }
}

export default Board;