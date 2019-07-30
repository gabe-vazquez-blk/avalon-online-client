import React, { Component, Fragment } from 'react';
import Player from './Player'
import QuestCoins from './QuestCoins'
import VoteTrack from './VoteTrack'
import {Grid} from 'semantic-ui-react'
import {API_ROOT} from '../constants'

class Board extends Component {

  playerCards = () => {
    return this.props.roles.map(role => {
      return (<Grid.Column key={role.id}>
        <Player role={role}/>
      </Grid.Column>)
    })
  }

  render() {
    return (
      <div>
        <br></br>
        <br></br>
        <Grid verticalAlign='middle' columns={7} centered>
          <Grid.Row>
            {this.playerCards()}
          </Grid.Row>
        </Grid>
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