import React from 'react';
import {
    Button,
    TextField
} from '@material-ui/core';
import 'typeface-roboto';
import {
    ToastsContainer,
    ToastsStore,
    ToastsContainerPosition
} from 'react-toasts';

const Config = require('../App/app.config.json');

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async handleSubmit(event) {
        event.preventDefault();

        await fetch(Config.apiEndpointUrl + '/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
            .catch(error => {
                console.log('error', error);
                ToastsStore.error("Connection failed...\nPlease try again later");
            })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                if (res.hasOwnProperty('access_token')) {
                    console.log("CONNEXION RÉUSSIE");
                    ToastsStore.success("Hello there :)");
                    this.props.UserConnect(res.access_token, this.state.username);
                } else {
                    console.log("ERREUR DE CONNEXION");
                    ToastsStore.error("Connection failed\nPlease try again");
                }
            })
    }

    handleChange(event) {
        event.preventDefault()
        switch (event.target.name) {
            case 'username':
                this.setState({ username: event.target.value })
                break;
            case 'password':
                this.setState({ password: event.target.value })
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="login-form">
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Username"
                    name="username"
                    required
                    onChange={this.handleChange}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Password"
                    type="password"
                    name="password"
                    required
                    onChange={this.handleChange}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ "marginTop": "16px" }}
                >
                    Log In
                </Button>
                <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.BOTTOM_RIGHT} />
            </form>
        );
    }
}
