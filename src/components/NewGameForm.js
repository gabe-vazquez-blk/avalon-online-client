import React, { Component } from 'react';
import { HEADERS, API_ROOT } from '../constants';


class NewGameForm extends Component {
    state = {
        name: '',
        num_of_players: ''
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
            num_of_players: ''
        })
    }
//need to change classname for css
    render() {
        return (
            <div className="welcome"> 
                <h2>Create New Game</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>Name:</label>
                    <input name="name" type="text" value={this.state.name} onChange={this.handleChange} placeholder="name of game"/>
                    <label>Number of Players:</label>
                    <input name="num_of_players" type="text" value={this.state.num_of_players} onChange={this.handleChange} placeholder="5 or more"/>
                    <input type="submit" />
                </form>
            </div>
        );
    }
}

export default NewGameForm;
