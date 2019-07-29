import React, { Component, Fragment } from 'react';
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
            <Comment key={message.id}>
              <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/large/stevie.jpg' />
              <Comment.Content>
                <Comment.Author as='a'>{message.user_id}</Comment.Author>
                <Comment.Metadata>
                  <span><Moment fromNow>{message.created_at}</Moment></span>
                </Comment.Metadata>
                <Comment.Text >{message.text}</Comment.Text>
              </Comment.Content>
            </Comment>
            );
          })
      }
   
    render() {
        const {selectedGame, handleReceivedMessage} = this.props
        return (
          <Fragment>
          <ActionCable
                  key={selectedGame.id} 
                  channel={{channel: 'MessagesChannel', game: selectedGame.id}}
                  onReceived={handleReceivedMessage}
          />
          <Segment secondary style={{ height: "92vh", overflow: 'auto'}}>
                <Comment.Group>
              <Header as='h3' dividing>{selectedGame.name}</Header>
                    {this.orderedMessages(selectedGame.messages)}
                </Comment.Group>
                <NewMessageForm game_id={selectedGame.id} currentUser={this.props.currentUser}/>
            </Segment>
            </Fragment>
        );
    }
}

export default ChatRoom;
