import React, { Component } from 'react';
import ChatRoom from '../components/ChatRoom';

class GameContainer extends Component {
//gets game from lobby
    render() {
        return (
            <div>
                <ChatRoom conversation_id={5}/>
            </div>
        );
    }
}

export default GameContainer;
