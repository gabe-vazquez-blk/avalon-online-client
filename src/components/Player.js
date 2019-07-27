import React, { Component } from 'react';
import { Card, Image, Icon } from 'semantic-ui-react'


class Player extends Component {
  render() {
    return (
      <Card >
        <Image src='https://i.pinimg.com/originals/be/fb/63/befb63cfd2a6c3956921033dba8e234b.jpg' wrapped ui={false} />
        <Card.Content>
          <Card.Header>Matthew</Card.Header>
          <Card.Meta>
            <span className='date'>Joined in 2015</span>
          </Card.Meta>
          <Card.Description>
            Matthew is a musician living in Nashville.
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name='user' />
            22 Friends
          </a>
        </Card.Content>
      </Card>
    );
  }
}

export default Player;