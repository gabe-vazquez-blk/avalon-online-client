import React, { Component } from 'react';
import { HEADERS, API_ROOT } from '../constants';
import { Form, Input, Segment, Button, Grid } from 'semantic-ui-react';

class NewGameForm extends Component {
    state = {
        name: '',
        numPlayers: ''
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value 
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        fetch(`${API_ROOT}/games`, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(this.state)
        })
        this.setState({
            name: '',
            numPlayers: ''
        })
    }
//need to change classname for css
    render() {
        return (
            <div> 

                <Grid textAlign='center' style={{ height: '80vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 650 }}>
                    <Segment>
                        <h2>Create New Game</h2>
                        <Segment>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Field>
                                <label style={{textAlign: 'left'}}>Name:</label>
                                <Input name="name" type="text" value={this.state.name} onChange={this.handleChange} placeholder="name of game"/>
                            </Form.Field>
                            <Form.Field>
                                <label style={{ textAlign: 'left' }}>Number of Players:</label>
                                <Input name="num_of_players" type="text" value={this.state.num_of_players} onChange={this.handleChange} placeholder="5 or more"/>
                            </Form.Field>
                            <Form.Checkbox inline label='I agree to the terms and conditions' required />
                            <Button type='submit'>Submit</Button>
                        </Form>
                            </Segment>
                    </Segment>
                </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default NewGameForm;
