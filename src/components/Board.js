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

  componentDidMount() {
    fetch(`${API_ROOT}/get_roles/${this.state.playerNum}`)
    .then(resp => resp.json())
    .then(roles => this.setState({roles}))
  }

  playerCards = () => {
    return this.state.roles.map(role => {
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