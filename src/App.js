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
      fetch(`${API_ROOT}/open_games`) //show only open ones and hide finished ones
      .then(resp => resp.json())
      .then(games => this.setState({games}))
  }

  removeGame = game => {
    const {allGames} = this.state.games
    const updatedGames = allGames.map(allGame => allGame.id !== game.id )
    this.setState({
      games: updatedGames
    })
    if (this.state.selectedGame.id === game.id) {
      this.setState({
        selectedGame: null
      })
    }
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

  handleReceivedGameRole = resp => {
    const {game_role} = resp
    const games = [...this.state.games]
    const game = games.find(game => game.id === game_role.game_id)
    game.game_roles = [...game.game_roles, game_role]
    console.log("SETT GAME ROLE", game_role, games)
    this.setState({ games })
  }

  setUser = (user)=>{
    this.setState({
      currentUser: user
    }, () => (this.props.history.push("/lobby")))
  }

  logout = () => {
    this.setState({
      currentUser: null
    },() => {
      this.props.history.push("/login")
    })
  }


  // RENDER <Lobby setUser={this.setUser} />
  render() {
    return (
      <div>
        <Navbar 
          setUser={this.setUser}
          currentUser={this.state.currentUser}
          logout={this.logout}
        />
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

              if(this.state.selectedGame){
                return(

                  <Game
                    selectedGame={this.state.selectedGame}
                    currentUser={this.state.currentUser}
                    handleReceivedGameRole={this.handleReceivedGameRole} 
                    removeGame={this.removeGame}
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