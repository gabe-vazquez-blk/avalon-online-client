import React, { Fragment } from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';

const Cable = ({ games, handleReceivedMessage }) => {
  return (
    <Fragment>
      {games.map(game => {
        return (
          <ActionCableConsumer
            key={game.id}  
            channel={{ channel: 'MessagesChannel', game: game.id }}
            onReceived={handleReceivedMessage}
          />
        );
      })}
    </Fragment>
  );
};

export default Cable;
