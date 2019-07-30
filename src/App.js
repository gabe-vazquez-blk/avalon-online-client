import './App.css'
import Navbar from './containers/Navbar'
import Lobby from './containers/Lobby';
import Game from './containers/Game';
import { API_ROOT } from './constants';
import { Link, Route, Switch, Redirect } from 'react-router-dom'

//for testing
//import GameLobby from './containers/GameLobby'

import React from 'react';

class App extends React.Component {
  
  // STATE
  state = {
    currentUser: null,
    games: [],
    selectedGame: null,
    numPlayers: ''
  }

  componentDidMount() {
      fetch(`${API_ROOT}/games`) //show only open ones and hide finished ones
      .then(resp => resp.json())
      .then(games => this.setState({games}))
  }

  setSelectedGame = game => {
      this.setState({selectedGame: game}, () => (this.props.history.push(`/game/${game.id}`)))
  }

  handleReceivedGame = resp => {
    const {game} = resp
    this.setState({games: [...this.state.games, game]})
  }

  handleReceivedMessage = resp => {
     const { message } = resp
    const games = [...this.state.games]
    const game = games.find(game => game.id === message.game_id)
    game.messages = [...game.messages, message]
    console.log("SETT MSG", message, game.messages, games)
    this.setState({ games }) 
  }

  // FORM EVENT HANDLERS
  setUser = (user)=>{
    this.setState({
      currentUser: user
    }, () => (this.props.history.push("/lobby")))
  }


  // RENDER <Lobby setUser={this.setUser} />
  render() {
    
    return (
      <div>
        <Navbar setUser={this.setUser}/>
        <Switch>

          <Route path="/lobby" render={() =>{
            return(
              <Lobby setUser={this.setUser} 
                handleReceivedGame={this.handleReceivedGame} 
                handleReceivedMessage={this.handleReceivedMessage} 
                setSelectedGame={this.setSelectedGame} 
                games={this.state.games} 
                selectedGame={this.state.selectedGame} 
                currentUser={this.state.currentUser} 
              />
            )}
          }/>

          <Route path="/game/:id" render={(routerProps) =>{
            const selectedGame = this.state.selectedGame

              if(this.state.selectedGame && this.state.currentUser){
                return(

                  <Game
                    selectedGame={this.state.selectedGame}
                    currentUser={this.state.currentUser}
                    numPlayers={selectedGame.num_of_players} 
                  />
                )
              } else {
                // if a post is not found, then render a Redirect
                return <Redirect to="/404" />
              }
            }
          }/> 
   
        </Switch>
      </div>
    );
  }
}

export default App

const findSelectedGame = (games, selectedGame) => {
  return games.find(
    game => game.id === selectedGame
  )
}