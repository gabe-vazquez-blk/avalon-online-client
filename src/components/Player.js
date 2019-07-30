import React, { Component } from 'react';
import { Card, Image, Icon, Label } from 'semantic-ui-react'


class Player extends Component {

  //https://i.pinimg.com/originals/be/fb/63/befb63cfd2a6c3956921033dba8e234b.jpg
  render() {
    const { approve, reject, success, fail } = this.props
    const {id, name, faction, img_url} = this.props.role
    return (
      <div>
        { approve && !reject ? <Label as='a' color='purple' ribbon>Approve</Label> : null}
        { reject && !approve ? <Label as='a' color='black' ribbon>Reject</Label> : null}
        { success && !fail ? <Label as='a' color='blue' ribbon>Success</Label> : null}
        { fail && !success ? <Label as='a' color='red' ribbon>Fail</Label> : null}
        <Card key={id}>
          <Image src={img_url} wrapped ui={false} />
          <Card.Content extra>
            {name}
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default Player;