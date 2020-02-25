import React from 'react';

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { userData: this.props.userData }
    }

    render() {
        return (
            <p>Welcome back, {this.state.userData.username} !</p>
        )
    }
}