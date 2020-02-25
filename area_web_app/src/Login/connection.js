import React from 'react';
import {
    Typography,
    Card
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
                <p style={{ "fontSize": "20px" }}>No account yet? <button className='button-link' onClick={this.changeState}>Sign up</button></p>
            ) : (
                <p style={{ "fontSize": "20px" }}>Already have an account? <button className='button-link' onClick={this.changeState}>Log in</button></p>
            );

        return (
            <Card className="blurred-card">
                <Typography component="h1" variant="h4" style={{ "marginTop": "20px", "marginBottom": "20px" }}>
                    {formTitle}
                </Typography>
                {this.display()}
                {button}
            </Card>
        )
    }
}