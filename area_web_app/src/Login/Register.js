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

export default class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            email: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async handleSubmit(event) {
        event.preventDefault();

        await fetch(Config.apiEndpointUrl + '/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                mail: this.state.email
            })
        })
            .then(res => res.json())
            .then(res => {
                if (res.status === 'success') {
                    console.log("LE COMPTE A BIEN ÉTÉ CRÉÉ");
                    ToastsStore.success("Registration complete !\nYou may now log in :)");
                } else {
                    console.log('ERREUR');
                    if (res.message === 'This user already exist') {
                        ToastsStore.error("This user already exists\nIf this is you, please log in!");
                    } else {
                        ToastsStore.error("Registration failed...\nPlease try again later :/");
                    }
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
            case 'email':
                this.setState({ email: event.target.value })
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
                    label="Email Address"
                    type="email"
                    name="email"
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
                    Register
                </Button>
                <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} />
            </form>
        );
    }
}
