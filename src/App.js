import './App.css'
import Navbar from './containers/Navbar'
import Lobby from './containers/Lobby';

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
    })
  }

  // RENDER
  render() {
    return (
      <div>
        <Navbar routerProps={this.props}/>
        <Lobby setUser={this.setUser} />
      </div>
    );
  }
}

export default App;
