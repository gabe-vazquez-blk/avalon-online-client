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
    currentUser: '',
    games: [],
    selectedGame: null
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
    this.setState({ games }, ()=>console.log(this.state.games))
  }

  // FORM EVENT HANDLERS
  setUser = (user)=>{
    this.setState({
      currentUser: user
    }, () => (this.props.history.push("/lobby")))
  }

  // RENDER <Lobby setUser={this.setUser} />
  render() {
    console.log(this.state.currentUser);
    
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
            const selectedGame = this.state

              if(selectedGame){
                return(

                  <Game
                    selectedGame={this.state.selectedGame}
                    currentUser={this.state.currentUser} 
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