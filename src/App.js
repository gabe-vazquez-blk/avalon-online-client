import './App.css'
import Navbar from './containers/Navbar'
import Lobby from './containers/Lobby';
import Game from './containers/Game';
//for testing
//import GameLobby from './containers/GameLobby'

import React from 'react';

class App extends React.Component {
  
  // STATE
  state = {
    currentUser: '',
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
        <Lobby setUser={this.setUser} />
        <Game />
      </div>
    );
  }
}

export default App;
