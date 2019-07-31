import React, { Component } from 'react';
import Player from './Player'
import QuestCoins from './QuestCoins'
import VoteTrack from './VoteTrack'
import {Grid} from 'semantic-ui-react'
//import {API_ROOT} from '../constants'

class Board extends Component {

  state = {
    roles: [],
    playerNum: parseInt(this.props.playerNum)
  }

  

  playerCards = (playerNum) => {
    return this.props.roles.map(role => {
      return (
        <Grid.Column key={role.id}>
          <Player 
            approve={this.props.approve}
            reject={this.props.reject}
            success={this.props.success}
            fail={this.props.fail}
            role={role}
          />
        </Grid.Column>
      )
    })
  }

  render() {
    return (
      <div>
        <Grid columns={5} centered padded>
          <Grid.Row>
            {this.playerCards()}
          </Grid.Row>
        </Grid>
        <QuestCoins />
        <VoteTrack />
      </div>
    );
  }
}

export default Board;