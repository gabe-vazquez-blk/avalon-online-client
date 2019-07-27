import React, { Component } from 'react';
import { Grid, Divider, Header} from 'semantic-ui-react'

class VoteTrack extends Component {

  state = {
    vote1: false,
    vote2: false,
    vote3: false,
    vote4: false,
    vote5: false
  }

  handleClick = (e)=>{
    const vote = e.target.getAttribute('name')
    this.setState({
      [vote]: !this.state[vote]
    })
  }

  render(){

    const crestImg = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Welsh_Dragon_%28Y_Ddraig_Goch%29.svg/1200px-Welsh_Dragon_%28Y_Ddraig_Goch%29.svg.png"
          
    return (
      <div>
        <Divider horizontal>
          <Header as='h4'>
            Vote Track
        </Header>
        </Divider>
        <Grid verticalAlign='middle' columns={10} centered>
          <Grid.Row>
            <Grid.Column>
              <div>
                {this.state.vote1 ? 
                  <img name="vote1" className="voteTrack" src={crestImg} onClick={this.handleClick}></img>
                   : <h4 name="vote1" className="voteTrack" onClick={this.handleClick}>1</h4>}
              </div>
            </Grid.Column>
            <Grid.Column>
              <div>
                {this.state.vote2 ? 
                  <img name="vote2" className="voteTrack" src={crestImg} onClick={this.handleClick}></img>
                   : <h4 name="vote2" className="voteTrack" onClick={this.handleClick}>2</h4>}
              </div>
            </Grid.Column>
            <Grid.Column>
              <div>
                {this.state.vote3 ? 
                  <img name="vote3" className="voteTrack" src={crestImg} onClick={this.handleClick}></img>
                   : <h4 name="vote3" className="voteTrack" onClick={this.handleClick}>3</h4>}
              </div>
            </Grid.Column>
            <Grid.Column>
              <div>
                {this.state.vote4 ? 
                  <img name="vote4" className="voteTrack" src={crestImg} onClick={this.handleClick}></img>
                   : <h4 name="vote4" className="voteTrack" onClick={this.handleClick}>4</h4>}
              </div>
            </Grid.Column>
            <Grid.Column>
              <div>
                {this.state.vote5 ? 
                  <img name="vote5" className="voteTrack" src={crestImg} onClick={this.handleClick}></img>
                   : <h4 name="vote5" className="voteTrack" onClick={this.handleClick}>5</h4>}
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }

}

export default VoteTrack;