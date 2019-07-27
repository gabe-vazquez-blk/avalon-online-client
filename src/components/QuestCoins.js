import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react'

class QuestCoins extends Component{

  state = {
    quest1: "questCoin-neutral",
    quest2: "questCoin-neutral",
    quest3: "questCoin-neutral",
    quest4: "questCoin-neutral",
    quest5: "questCoin-neutral"
  }

  handleClick = (e)=>{
    const quest = e.target.getAttribute('name')
    
    if (this.state[quest] === "questCoin-neutral"){
      this.setState({
        [quest]: "questCoin-good"
      })
    } else if (this.state[quest] === "questCoin-good") {
      this.setState({
        [quest]: "questCoin-bad"
      })
    } else if (this.state[quest] === "questCoin-bad") {
      this.setState({
        [quest]: "questCoin-neutral"
      })
    }
  }

  render(){

    const { quest1, quest2, quest3, quest4, quest5 } = this.state

    return (
      <div>
        <Grid verticalAlign='middle' columns={10} centered>
          <Grid.Row>
            <Grid.Column>
              <h1 name="quest1" className={quest1} onClick={this.handleClick}>1</h1>
            </Grid.Column>
            <Grid.Column>
              <h1 name="quest2" className={quest2} onClick={this.handleClick}>2</h1>            
            </Grid.Column>
            <Grid.Column>
              <h1 name="quest3" className={quest3} onClick={this.handleClick}>3</h1> 
            </Grid.Column>
            <Grid.Column>
              <h1 name="quest4" className={quest4} onClick={this.handleClick}>4</h1>
            </Grid.Column>
            <Grid.Column>
              <h1 name="quest5" className={quest5} onClick={this.handleClick}>5</h1> 
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default QuestCoins;