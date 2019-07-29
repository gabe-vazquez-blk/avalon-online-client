import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { API_ROOT } from '../constants';
import ChatRoom from '../components/ChatRoom';
import Cable from '../components/Cable';
import NewGameForm from '../components/NewGameForm';
import { ActionCable } from 'react-actioncable-provider';
import { List, Grid, Segment } from 'semantic-ui-react';

class Lobby extends Component {

  state = {
      games: [],
      selectedGame: null
  }

  componentDidMount() {
      fetch(`${API_ROOT}/games`) //show only open ones and hide finished ones
      .then(resp => resp.json())
      .then(games => this.setState({games}))
  }

  setSelectedGame = game => {
      this.setState({selectedGame: game})
  }

  handleReceivedGame = game => {
      this.setState({games: [...this.state.games, game]})
  }

  handleReceivedMessage = message => {
    console.log("GIT A MSG!!")
      const games = [...this.state.games]
      const game = games.find(game => game.id === message.game_id)
      game.messages = [...game.messages, message]
      this.setState({ games }, ()=>console.log(this.state.games))
  }

  render() {
    const {games, selectedGame} = this.state

    return (

      <Route exact path="/lobby" render={(routerProps) => {
        return (
          <div>
              <ActionCable
                  channel={{channel: 'GamesChannel'}}
                  onReceived={this.handleReceivedGame}
              />
              {this.state.games.length ? (
                  <Cable
                      games={games}
                      handleReceivedMessage={this.handleReceivedMessage}
                  />
              ) : null }
            <br></br><br></br><br></br><br></br><br></br>
            <Grid textAlign='center' style={{ height: '20vh' }} verticalAlign='middle'>
              <Grid.Column style={{ maxWidth: 450 }}>
                <Segment style={{ overflow: 'auto', maxHeight: 300 }}>
                  <h3 style={{textAlign: 'left'}}>Games in session...</h3>
                    <List animated verticalAlign='left'>
                      {games.map(game => {
                        return(
                          <List.Item key={game.id} onClick={() => this.setSelectedGame(game)}>
                            <Segment color='green'>{game.name} ({game.num_of_players} Players)</Segment>
                          </List.Item>
                        )}
                      )}
                    </List>
                  </Segment>
              </Grid.Column>
            </Grid>
              <NewGameForm />
              {selectedGame ? <ChatRoom game={this.state.selectedGame} /> : null}    
          </div>
        )
      }}/>
    );
  }
}

export default Lobby;

const findSelectedGame = (games, selectedGame) => {
  return games.find(
    game => game.id === selectedGame
  )
}
