import React, { Component } from 'react';
import { Grid, Label, Segment, Divider, Header, Button} from 'semantic-ui-react'

class PlayerArea extends Component {
  render() {
    return (
      <div style={{ position: "absolute", right: "1vw", top: "52vh", width: "90%" }}>
        <Header as='h3' floated='left'>
          Player Area
        </Header>
        <Divider clearing />

        <Segment>
          <Button name='approve' color='purple' onClick={this.props.handleApproval}> Approve </Button>
          <Button name='rejecte' color='black' onClick={this.props.handleApproval}> Reject  </Button>
          <Button name='success' color='blue' onClick={this.props.handleSuccess}> Success </Button>
          <Button name='fail' color='red' onClick={this.props.handleSuccess}> Fail  </Button>
        </Segment>
      </div>
    );
  }
}

export default PlayerArea;