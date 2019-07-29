import React, { Component, Fragment } from 'react';
import Player from './Player'
import QuestCoins from './QuestCoins'
import VoteTrack from './VoteTrack'
import {Grid} from 'semantic-ui-react'
import {API_ROOT} from '../constants'

class Board extends Component {

  state = {
    roles: [],
    playerNum: parseInt(this.props.playerNum)
  }

  

  playerCard = (playerNum) => {
    const playerCards = []
    for (let i=0; i<playerNum; i++){
      playerCards.push((
        <Grid.Column key={i}>
          <Player />
        </Grid.Column>
      ))
    }
    return playerCards
  }

  render() {
    return (
      <div>
        <br></br>
        <br></br>
        <Grid verticalAlign='middle' columns={7} centered>
          <Grid.Row>
            {this.playerCard(this.state.playerNum)}
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