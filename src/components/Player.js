import React, { Component } from 'react';
import { Card, Image, Icon } from 'semantic-ui-react'


class Player extends Component {

  //https://i.pinimg.com/originals/be/fb/63/befb63cfd2a6c3956921033dba8e234b.jpg
  render() {
    const {id, name, faction, img_url} = this.props.role
    return (
      <Card key={id}>
        <Image src={img_url} wrapped ui={false} />
        <Card.Content extra>
          {name}
        </Card.Content>
      </Card>
    );
  }
}

export default Player;