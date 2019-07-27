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
    }, () => (this.props.history.push("/lobby")))
  }

  // RENDER
  render() {
    return (
      <div>
        <Navbar setUser={this.setUser}/>
        <Lobby setUser={this.setUser} />
      </div>
    );
  }
}

export default App;
