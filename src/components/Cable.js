import React, { Fragment } from 'react';
import { ActionCable } from 'react-actioncable-provider';

const Cable = ({ games, handleReceivedMessage }) => {
  console.log("LIST OF GAME CABLES", games)
  return (
    <Fragment>
      {games.map(game => {
        console.log("GAME ID AT CABLE", game.id)
        return (
          <ActionCable
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
