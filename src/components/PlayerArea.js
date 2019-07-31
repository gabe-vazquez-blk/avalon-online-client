import React, { Component, Fragment } from 'react';
import { Grid, Segment, Divider, Header, Button} from 'semantic-ui-react'
import Player from './Player'

class PlayerArea extends Component {

  getFactionName = () => {
    if (this.props.currUserRole.faction === "good"){
      return "Loyal Servant of Author \n Good"
    }
    else
    {
      return "Minionr of Mordred \n Bad"
    }
  }

  getFactionColor = () => {
    return this.props.currUserRole.faction === "good" ? "blue" : "red"
  }
  render() {
    return (
      <div style={{ position: "absolute", right: "1vw", width: "90%" }}>
        <Header as='h3' floated='left'>
          Player Area
        </Header>
        <Divider clearing />
        {(this.props.currUserRole) ?
        <Fragment>
            <Segment>
            <Grid centered padded>
            <Grid.Row>
              <Header as='h4' floated='left'>
                Your Team: 
              </Header>
              </Grid.Row>
              <Grid.Row>
              <span style={{color: this.getFactionColor()}}>{this.getFactionName()}</span>
              </Grid.Row>
              </Grid>
              </Segment>
              
            <Segment>
              
              <Grid centered padded>
              <Grid.Row>
              <Grid.Column key={this.props.currUserRole.id}>
              <Header as='h4' floated='left'>
                Your Role
              </Header>
                <Player 
                  role={this.props.currUserRole}
                  approve={this.props.approve}
                  reject={this.props.reject}
                  success={this.props.success}
                  fail={this.props.fail}
                />
              </Grid.Column>
              </Grid.Row>
              </Grid>
            </Segment>
            </Fragment>
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