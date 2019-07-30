import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Board from '../components/Board'
import ChatRoom from '../components/ChatRoom';
import { Grid, Segment } from 'semantic-ui-react'
import { ActionCable } from 'react-actioncable-provider';

class Game extends Component {

  state = {
    approve: false,
    reject: false,
    success: false,
    fail: false
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
    return (
      <Route exact path={'/game/:id'} render={(routerProps) => {
        
        // const foundGame = routerProps.match.params.id

        return (
          <Grid>
            <Grid.Column width={13}>
              <Board 
                playerNum={this.props.selectedGame.num_of_players}
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
        )
      }}/>
    );
  }
}

export default Game;