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
    joined: false,
    approve: false,
    reject: false,
    success: false,
    fail: false
  }

  componentDidMount() {
    fetch(`${API_ROOT}/get_roles/${this.props.selectedGame.num_of_players}`)
    .then(resp => resp.json())
    .then(roles => this.setState({roles}))
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

  handleApproval = (e)=>{
    const name = e.target.name
    if (name === "approve") {
      this.setState({
        [name]: !this.state[name],
        reject: false
      })  
    } else {
        this.setState({
          [name]: !this.state[name],
          approve: false
        })  
    }
  }

  handleSuccess = (e)=>{
    const name = e.target.name
    if (name === "success") {
      this.setState({
        [name]: !this.state[name],
        fail: false
      })
    } else {
      this.setState({
        [name]: !this.state[name],
        success: false
      })
    }
  }

  render() {
    // console.log("SELECTED GAME", this.props.selectedGame)
    const {approve, reject, success, fail} = this.state
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
                <Board 
                  roles={this.state.roles}
                  approve={approve}
                  reject={reject}
                  success={success}
                  fail={fail}
                />
              </Grid.Column>
              <Grid.Column width={3}>
                <ChatRoom 
                  selectedGame={this.props.selectedGame} 
                  currentUser={this.props.currentUser} 
                  handleReceivedMessage={this.props.handleReceivedMessage}
                  handleApproval={this.handleApproval}
                  handleSuccess={this.handleSuccess}
                />
              </Grid.Column>
            </Grid>
          </Fragment>
        )
      }}/>
    );
  }
}

export default Game;