import React, { Component, createRef } from 'react';
import NewMessageForm from './NewMessageForm';
import PlayerArea from './PlayerArea';
import { Segment, Comment, Header } from 'semantic-ui-react';
import Moment from 'react-moment';
import 'moment-timezone';

import { ActionCable } from 'react-actioncable-provider';

class ChatRoom extends Component {

  state = { active: true }
  contextRef = createRef()

    orderedMessages = messages => {
        const sortedMessages = messages.sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        )
        return sortedMessages.map(message => {
          return(
            <Comment key={message.id}>
              <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/large/stevie.jpg' />
              <Comment.Content>
                <Comment.Author as='a'>{message.username}</Comment.Author>
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
        const {selectedGame, handleReceivedMessage, handleApproval, handleSuccess} = this.props
        //const {active} = this.state
        return (

          // <Ref innerRef={this.contextRef}>
          //   <Rail>
          //     <Sticky active={active} context={this.contextRef}>
                <Segment secondary style={{ height: "100vh"}}>
                  <ActionCable
                    key={selectedGame.id} 
                    channel={{channel: 'MessagesChannel', game: selectedGame.id}}
                    onReceived={handleReceivedMessage}
                  />
                    <Comment.Group>
                      <Header as='h3' dividing>{selectedGame.name} Chatroom</Header>
                        <Segment style={{ height: "30vh", overflow: 'auto' }}>
                            {this.orderedMessages(selectedGame.messages)}
                        </Segment>
                    </Comment.Group>
                    <NewMessageForm game_id={selectedGame.id} currentUser={this.props.currentUser}/>
                    <PlayerArea 
                      handleApproval={handleApproval}
                      handleSuccess={handleSuccess}
                    />
                  </Segment>
          //      </Sticky>
          //    </Rail>
          //  </Ref>
        );
    }
}

export default ChatRoom;
