import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Board from '../components/Board'
import ChatRoom from '../components/ChatRoom';
import { Grid, Segment } from 'semantic-ui-react'
import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT,  } from '../constants';

class Game extends Component {
  state = {
    currentPlayers: [],
    roles: [],
    joined: false
  }

  componentDidMount() {
    fetch(`${API_ROOT}/get_roles/${this.props.numPlayers}`)
    .then(resp => resp.json())
    .then(roles => this.setState({roles}))

    fetch(`${API_ROOT}/game_roles/get_players/${this.props.selectedGame.id}`)
    .then(resp => resp.json())
    .then(players => this.setState({
      currentPlayers: [...this.state.currentPlayers, players]
    }))
  }

  handleClick = e => {
    const roles = [...this.state.roles]
    const currRole = roles.pop()
    fetch(`${API_ROOT}/game_roles`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": this.props.currentUser.id
      },
      body: JSON.stringify({
        game_id: this.props.selectedGame.id,
        role_id: currRole.id,
        result: "WIN"
      })
    })
    .then(this.setState({roles}))
  }
  handleReceivedPlayer = resp => {
    this.setState({
      currentPlayers: [...this.state.currentPlayers, resp.game_role],
      joined: true
    })
  }

  render() {
    const {selectedGame, currentUser} = this.props
    return (
      <Route exact path={'/game/:id'} render={(routerProps) => {
        console.log("CURR PLAYERS", this.state.currentPlayers)
        return (
          <Fragment>
            <ActionCable
                    key={selectedGame.id} 
                    channel={{channel: 'GameRolesChannel', game: selectedGame.id}}
                    onReceived={this.handleReceivedPlayer}
            />
            <button onClick={this.handleClick} disabled={this.state.joined}>JOIN & READY</button>
            <h3 className="welcome">Players Waiting:</h3>
            <ul className="welcome">
            {this.state.currentPlayers.length?this.state.currentPlayers.map( playerRole => {
              return(
                <li key={playerRole.id}>{playerRole.id}</li>
              )
            }):null}
            </ul>
            <Grid>
              <Grid.Column width={13}>
                <Board roles={this.state.roles}/>
              </Grid.Column>
              <Grid.Column width={3}>
                  <ChatRoom selectedGame={this.props.selectedGame} currentUser={this.props.currentUser} handleReceivedMessage={this.props.handleReceivedMessage}/>
              </Grid.Column>
            </Grid>
          </Fragment>
        )
      }}/>
    );
  }
}

export default Game;