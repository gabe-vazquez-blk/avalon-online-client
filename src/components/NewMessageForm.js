import React, { Component } from 'react';
import { API_ROOT } from '../constants';
import { Button, Comment, Form, Header, Segment } from 'semantic-ui-react'

class NewMessageForm extends Component {

    state = {
        text: '',
        game_id: this.props.game_id
    }
    
    handleChange = e => {
        this.setState({text: e.target.value})
    }

    handleSubmit = e => {
        e.preventDefault()
        fetch(`${API_ROOT}/messages`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json',
                "Authorization": this.props.currentUser.id || 26 //preset to test
            },
            body: JSON.stringify(this.state)
        })
        this.setState({text: ''})
    }
    render() {
        return (
            <div style={{ position: "absolute", right: "1vw", top: "37vh", width: "90%"} }>
                <Form reply onSubmit={this.handleSubmit}>
                    <Form.TextArea type="text" value={this.state.text} onChange={this.handleChange} placeholder="send a message..." />
                    <Button content='Send' type="submit" />
                </Form>
            </div>
        );
    }
}

export default NewMessageForm;
