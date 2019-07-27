import React, { Component } from 'react'
import Game from './Game'
import { Route, Switch } from 'react-router-dom'
import { API_ROOT } from '../constants';
import ChatRoom from '../components/ChatRoom';
import Cable from '../components/Cable';
import NewGameForm from '../components/NewGameForm';
import { ActionCable } from 'react-actioncable-provider';

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

  setSelectedGame = id => {
      this.setState({selectedGame: id})
  }

  handleReceivedGame = game => {
      this.setState({games: [...this.state.games, game]})
  }

  handleReceivedMessage = message => {
      const games = [...this.state.games]
      const game = games.find(game => game.id === message.game_id)
      game.messages = [...game.messages, message]
      this.setState({ games })
  }

  render() {
    const {games, selectedGame} = this.state
    return (

      <Route exact path="/lobby" render={(routerProps) => {
        return (
          <div>
            <div className="welcome">
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
                <h2>Games</h2>
                <ul>
                    {games.map(game => <li key={game.id} onClick={() => this.setSelectedGame(game.id)}>{game.name} ({game.num_of_players} Players)</li>)}
                </ul>
                <NewGameForm />
                {selectedGame ? (
                    <ChatRoom game={findSelectedGame(games, selectedGame)} />
                ) : null}    
            </div>
            <Switch>
              <Route path="/game" render={() => <Game />} />
            </ Switch>
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
