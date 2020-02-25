import React from 'react';
import { Button } from '@material-ui/core';

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { userData: this.props.userData }
    }

    render() {
        return (
            <div className="main-content">
                <p>Welcome back, {this.state.userData.username} !</p>
            </div>
        )
    }
}