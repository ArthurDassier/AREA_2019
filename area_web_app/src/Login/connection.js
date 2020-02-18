import React from 'react';
import {
    Typography
} from '@material-ui/core';
import 'typeface-roboto';
import Login from './login';
import Register from './register';

export default class Connect extends React.Component {
    constructor(props) {
        super(props);
        this.state = { logState: true }
        this.changeState = this.changeState.bind(this);
        this.display = this.display.bind(this);
    }

    changeState() {
        this.setState({ logState: !this.state.logState });
    }

    display() {
        if (this.state.logState === true) {
            return (<Login UserConnect={this.props.UserConnect} />);
        } else {
            return (<Register />);
        }
    }

    render() {
        let formTitle = this.state.logState === true ? "Log In" : "Register";
        let button = this.state.logState === true ?
            (
                <p style={{ "fontSize": "20px" }}>No account yet? <a href='#' onClick={this.changeState}>Sign up</a></p>
            ) : (
                <p style={{ "fontSize": "20px" }}>Already have an account? <a href='#' onClick={this.changeState}>Log in</a></p>
            );

        return (
            <div>
                <Typography component="h1" variant="h4">
                    {formTitle}
                </Typography>
                {this.display()}
                {button}
            </div>
        )
    }
}