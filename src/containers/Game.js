import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Board from '../components/Board'
import ChatRoom from '../components/ChatRoom';
import { Grid, Button, Message, Icon, MessageContent, MessageHeader } from 'semantic-ui-react'
import { ActionCableConsumer } from 'react-actioncable-provider';
import { API_ROOT,HEADERS  } from '../constants';
import Countdown from 'react-countdown-now';
import { Segment} from 'semantic-ui-react';
import PlayerArea from '../components/PlayerArea';

class Game extends Component {
  state = {
    roles: [],
    remainingRoles: [],
    userJoined: false,
    approve: false,
    reject: false,
    success: false,
    fail: false,
    gameFull: false,
    currUserRoleId: null
  }

  extractRoleIds = () => {
    return this.props.selectedGame.game_roles.map(role => role.role_id)
  }
  
  remainingRoles = () => {
    const currRoleIds = this.extractRoleIds()
    const unassignedRoles = this.state.roles.filter(ele => !currRoleIds.includes(ele.id))
    return unassignedRoles
  }

  getCurrPlayerNames = () => {
    return this.props.selectedGame.game_roles.map(gameRole => gameRole.username)
  }

  userJoined = () => {
    return this.getCurrPlayerNames().includes(this.props.currentUser.username)
  }

  atCapacity = () => {
    return this.state.remainingRoles.length === 0
  }

  componentDidMount() {
    

    fetch(`${API_ROOT}/get_roles/${this.props.selectedGame.num_of_players}`)
    .then(resp => resp.json())
    .then(roles => {
      this.setState({
        roles: roles,
        userJoined: this.userJoined()
      }, ()=> {
        this.setState({remainingRoles: this.remainingRoles()})
          //need to refactor this!
        if (this.state.userJoined){
          const currUserRole = this.props.selectedGame.game_roles.find(gameRole => gameRole.user_id === this.props.currentUser.id)
          this.setState({
            currUserRoleId: currUserRole.role_id
          })
        }
      })
    })
  }
  
  componentDidUpdate(prevProps, prevState, snapsho) {
      if (prevState.remainingRoles !== this.state.remainingRoles){
        this.setState({
          gameFull: this.atCapacity()
        })
      if(this.state.remainingRoles.length === 0){
        fetch(`${API_ROOT}/update_game_status/${this.props.selectedGame.id}`, {
          method: "PATCH",
          headers: HEADERS,
          body: JSON.stringify({
            status: "IN_PROGRESS"
          })
        })
        .then(resp => resp.json())
        .then(game => () => this.props.removeGame(game))
      }
    }
  } 
  handleClick = e => {
    const remainingRoles = [...this.state.remainingRoles]
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
    .then( resp => resp.json()
    .then(currUserRole => {
        this.setState({
          remainingRoles: remainingRoles,
          userJoined: true,
          currUserRoleId: currUserRole.role_id
        })
      }))
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

  countdownRenderer = ({ seconds, completed }) => {
    if (completed) {
      return <span>Let the adventure begin!</span>
    } else {
      // Render a countdown
      return <span>Adventure awaits in ... {seconds}</span>;
    }
  }

  getUserRole = () => { 
    if (this.state.currUserRoleId)
    {
        return this.state.roles.find(role => role.id === this.state.currUserRoleId)
    }
    return null
  }

  pendingMsg = () => {
    return(
    <Message icon warning size='mini' >
      <Icon name='circle notched' loading />
        <Message.Content>
          <Message.Header>Waiting For {this.state.remainingRoles.length} More</Message.Header>
              {this.getCurrPlayerNames().length?this.getCurrPlayerNames().map( name => {
                return(
                  <span key={name}> {name}    </span>
                  )
                }):null}
        </Message.Content>
        <Button size='mini' onClick={this.handleClick} disabled={this.state.userJoined || this.state.gameFull}>{this.state.gameFull ? "GAME FULL" : "JOIN GAME"}</Button>
    </Message>)
  }

  gameLoadMsg = () => {
    return(
    <Message>
      <MessageContent>
        <MessageHeader>
        <Countdown date={Date.now() + 5000} renderer={this.countdownRenderer}>
        </Countdown>
        </MessageHeader>
      </MessageContent>
    </Message>)
  }

  render() {
    // console.log("SELECTED GAME", this.props.selectedGame)
    const {approve, reject, success, fail} = this.state
    const {selectedGame} = this.props
    return (
      <Route exact path={'/game/:id'} render={(routerProps) => {
        return (

          <Grid columns={3} centered>
            <Grid.Row>
            <Grid.Column floated='left' width={3}>
            <Segment secondary style={{ height: "100vh"}}>   
              <PlayerArea 
                handleApproval={this.handleApproval}
                handleSuccess={this.handleSuccess}
                currUserRole={this.getUserRole()} 
                approve={approve}
                reject={reject}
                success={success}
                fail={fail}
              />
              </Segment> 
            </Grid.Column>
            <Grid.Column floated="right" width={6}>

                <ActionCableConsumer
                  key={selectedGame.id} 
                  channel={{channel: 'GameRolesChannel', game: selectedGame.id}}
                  onReceived={this.props.handleReceivedGameRole}
                />

                
                {/*<Grid.Column width={10}>*/}
                <Grid centered padded>
                    <Grid.Column >
                      {(!this.state.gameFull) ? this.pendingMsg() : this.gameLoadMsg()} 
                    </Grid.Column>
                  </Grid>
                  {/* <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                  <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                  <Grid.Row centered> */}
                      <Board roles={this.state.roles}
                        approve={approve}
                        reject={reject}
                        success={success}
                        fail={fail}
                      />
                  {/* </Grid.Row>*/}
                </Grid.Column> 

              <Grid.Column floated='right' width={3}>
                <ChatRoom 
                  selectedGame={this.props.selectedGame} 
                  handleReceivedMessage={this.props.handleReceivedMessage}
                  />
              </Grid.Column>

             
            </Grid.Row>
          </Grid>
        )
      }}/>
    )
  }
}


export default Game;