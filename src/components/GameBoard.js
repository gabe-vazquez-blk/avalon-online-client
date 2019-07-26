import React, { Component } from 'react';
import Player from './Player'
import {Grid, Image, Card} from 'semantic-ui-react'

class GameBoard extends Component {
  render() {
    return (
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
    );
  }
}

export default GameBoard;