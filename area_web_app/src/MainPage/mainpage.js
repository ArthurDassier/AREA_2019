import React from 'react';

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: this.props.username }
    }

    render() {
        return <p>Welcome back, {this.state.username}!</p>
    }
}