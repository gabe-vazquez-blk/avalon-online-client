import React, { Component } from 'react';
import { API_ROOT } from '../constants';

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
            <div className="welcome">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.text} onChange={this.handleChange} placeholder="send a message..."/>
                    <input type="submit" />
                </form>
            </div>
        );
    }
}

export default NewMessageForm;
