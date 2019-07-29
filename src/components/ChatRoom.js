import React, { Component } from 'react';
import NewMessageForm from './NewMessageForm';
import { Segment, Comment, Header } from 'semantic-ui-react';
import Moment from 'react-moment';
import 'moment-timezone';

import { ActionCable } from 'react-actioncable-provider';

class ChatRoom extends Component {

    orderedMessages = messages => {
        const sortedMessages = messages.sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        )
        return sortedMessages.map(message => {
          return(
            <Comment>
              <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/large/stevie.jpg' />
              <Comment.Content>
                <Comment.Author as='a'>{message.user_id}</Comment.Author>
                <Comment.Metadata>
                  <span><Moment fromNow>{message.created_at}</Moment></span>
                </Comment.Metadata>
                <Comment.Text key={message.id}>{message.text}</Comment.Text>
              </Comment.Content>
            </Comment>
            );
          })
      }
   
    render() {
        const {id, name, num_of_players, messages} = this.props.selectedGame
<<<<<<< HEAD
        console.log(messages)
        return (
          <Segment secondary style={{ height: "92vh", overflow: 'auto'}}>
                <Comment.Group>
              <Header as='h3' dividing>{name}</Header>
=======
      
        return (
            <div className="welcome">
              <ActionCable 
              channel={{ channel: 'MessagesChannel', game: parseInt(this.props.selectedGame.id) }}
              onReceived={this.props.handleReceivedMessage}
            />
                <h2>{name}</h2>
                <ul>
>>>>>>> msg
                    {this.orderedMessages(messages)}
                </Comment.Group>
                <NewMessageForm game_id={id} currentUser={this.props.currentUser}/>
            </Segment>
        );
    }
}

export default ChatRoom;
