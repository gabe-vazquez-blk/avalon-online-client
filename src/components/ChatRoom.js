import React, { Component } from 'react';
import NewMessageForm from './NewMessageForm'


class ChatRoom extends Component {

    orderedMessages = messages => {
        const sortedMessages = messages.sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        )
        return sortedMessages.map(message => {
          return <li key={message.id}>{message.user_id} says: {message.text}</li>;
        })
      }
   
    render() {
        const {id, name, num_of_players, messages} = this.props.selectedGame
        return (
            <div className="welcome">
                <h2>{name}</h2>
                <ul>
                    {this.orderedMessages(messages)}
                </ul>
                <NewMessageForm game_id={id} currentUser={this.props.currentUser}/>
            </div>
        );
    }
}

export default ChatRoom;
