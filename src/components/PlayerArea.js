import React, { Component } from 'react';
import { Grid, Segment, Divider, Header, Button} from 'semantic-ui-react'
import Player from './Player'

class PlayerArea extends Component {
  render() {
    return (
      <div style={{ position: "absolute", right: "1vw", top: "70vh", width: "90%" }}>
        <Header as='h3' floated='left'>
          Player Area
        </Header>
        <Divider clearing />
        {(this.props.currUserRole) ?
          <Segment>
            <Grid.Column key={this.props.currUserRole.id}>
              <Player 
                role={this.props.currUserRole}
                approve={this.props.approve}
                reject={this.props.reject}
                success={this.props.success}
                fail={this.props.fail}
              />
            </Grid.Column>
          </Segment>
          :
          null
        }
        <Segment>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Button name='approve' color='purple' onClick={this.props.handleApproval} fluid> Approve </Button>
              </Grid.Column>
              <Grid.Column>
                <Button name='rejecte' color='black' onClick={this.props.handleApproval} fluid> Reject  </Button>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Button name='success' color='blue' onClick={this.props.handleSuccess} fluid> Success </Button>
              </Grid.Column>
              <Grid.Column>
                <Button name='fail' color='red' onClick={this.props.handleSuccess} fluid> Fail  </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        
      </div>
    );
  }
}

export default PlayerArea;