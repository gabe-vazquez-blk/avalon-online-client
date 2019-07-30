import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Board from '../components/Board'
import ChatRoom from '../components/ChatRoom';
import { Grid, Segment } from 'semantic-ui-react'
import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT,  } from '../constants';

class Game extends Component {
  state = {
    roles: [],
    remainingRoles: [],
    userJoined: false
  }

  extractRoleIds = () => {
    return this.props.selectedGame.game_roles.map(role => role.role_id)
  }
  
  remainingRoles = () => {
    const currRoleIds = this.extractRoleIds()
    const unassignedRoles = this.state.roles.filter(ele => !currRoleIds.includes(ele.id))
    return unassignedRoles
  }

  getCurrPlayers = () => {
    return this.props.selectedGame.game_roles.map(gameRole => gameRole.user_id)
  }

  userJoined = () => {
    return this.getCurrPlayers().includes(this.props.currentUser.id)
  }

  componentDidMount() {
    fetch(`${API_ROOT}/get_roles/${this.props.selectedGame.num_of_players}`)
    .then(resp => resp.json())
    .then(roles => {
      this.setState({
        roles: roles,
        userJoined: this.userJoined()
      }, ()=> this.setState({remainingRoles: this.remainingRoles()}))
    })
  }

  handleClick = e => {
    const remainingRoles = [...this.state.remainingRoles]
    console.log("REMIANING ROLES", remainingRoles)
    const currRole = remainingRoles.pop()
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
        result: "PENDING"
      })
    })
    .then(this.setState({
      remainingRoles: remainingRoles,
      userJoined: true
    }))
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
                    onReceived={this.props.handleReceivedGameRole}
            />
            <button onClick={this.handleClick} disabled={this.state.userJoined}>JOIN & READY</button>
            <h3 className="welcome">Players Waiting:</h3>
            <ul className="welcome">
            {this.getCurrPlayers().length?this.getCurrPlayers().map( playerId => {
              return(
                <li key={playerId}>Player ID: {playerId}</li>
              )
            }):null}
            </ul>
            <Grid>
              <Grid.Column width={13}>
                <Board roles={this.state.remainingRoles}/>
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