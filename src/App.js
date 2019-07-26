import './App.css'
import MainContainer from './containers/MainContainer';
import Navbar from './components/Navbar'
import SignUpForm from './components/SignUpForm'
import GameBoard from './components/GameBoard';

import React from 'react';

class App extends React.Component {
  
  // STATE
  state = {
    currentUser: '',
  }

  // HELPER FUNCTIONS
  navBtns = (e)=>{
    if (e.target.name === "signup"){
      // window.history.push("/signup")

      window.history.pushState(null, null, '/signup')
    } else if(e.target.name === "login"){
      console.log("Login")
    }
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
        <Navbar handleClick={this.navBtns}/>
        <MainContainer 
          setUser={this.setUser}
        />
      </div>
    );
  }
}

export default App;
