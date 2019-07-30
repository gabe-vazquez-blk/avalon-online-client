import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { API_ROOT } from '../constants';
import ChatRoom from '../components/ChatRoom';
import Cable from '../components/Cable';
import NewGameForm from '../components/NewGameForm';
import { ActionCable } from 'react-actioncable-provider';
import { List, Grid, Segment } from 'semantic-ui-react';

class Lobby extends Component {

  render() {

    const {setUser, handleReceivedGame, handleReceivedMessage, setSelectedGame, games, currentUser} = this.props

    return (

      <Route exact path="/lobby" render={(routerProps) => {
        return (
          <div>
              <ActionCable
                  channel={{channel: 'GamesChannel'}}
                  onReceived={handleReceivedGame}
              />
            <br></br><br></br><br></br><br></br><br></br>
            <Grid textAlign='center' style={{ height: '20vh' }} verticalAlign='middle'>
              <Grid.Column style={{ maxWidth: 450 }}>
                <Segment style={{ overflow: 'auto', maxHeight: 300 }}>
                  <h3 style={{textAlign: 'left'}}>Games in session...</h3>
                    <List animated verticalAlign='middle'>
                      {games.map(game => {
                        return(
                          <List.Item key={game.id} onClick={() => setSelectedGame(game)}>
                            <Segment color='green'>{game.name} ({game.num_of_players} Players)</Segment>
                          </List.Item>
                        )}
                      )}
                    </List>
                  </Segment>
              </Grid.Column>
            </Grid>
              <NewGameForm /> 
          </div>
        )
      }}/>
    );
  }
}

export default Lobby;



