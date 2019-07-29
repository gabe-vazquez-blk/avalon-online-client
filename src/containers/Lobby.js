import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { API_ROOT } from '../constants';
import ChatRoom from '../components/ChatRoom';
import Cable from '../components/Cable';
import NewGameForm from '../components/NewGameForm';
import { ActionCable } from 'react-actioncable-provider';

class Lobby extends Component {

  render() {
    const {setUser, handleReceivedGame, handleReceivedMessage, setSelectedGame, games, currentUser} = this.props
    return (

      <Route exact path="/lobby" render={(routerProps) => {
        return (
          <div className="welcome">
              <ActionCable
                  channel={{channel: 'GamesChannel'}}
                  onReceived={handleReceivedGame}
              />
              {games.length ? (
                  <Cable
                      games={games}
                      handleReceivedMessage={handleReceivedMessage}
                  />
              ) : null }
              <h2>Games</h2>
              <ul>
                  {games.map(game => <li key={game.id} onClick={() => setSelectedGame(game)}>{game.name} ({game.num_of_players} Players)</li>)}
              </ul>
              <NewGameForm />    
          </div>
        )
      }}/>
    );
  }
}

export default Lobby;



