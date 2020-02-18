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

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async handleSubmit(event) {
        event.preventDefault();

        await fetch('http://localhost:5005/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
            .then(res => res.json())
            .then(res => {
                if (res.hasOwnProperty('access_token')) {
                    console.log("CONNEXION RÉUSSIE");
                    ToastsStore.success("Hello there :)")
                    this.props.UserConnect(res.access_token, this.state.username)
                } else {
                    console.log("ERREUR DE CONNEXION")
                    ToastsStore.error("Connection failed\nPlease try again")
                }
            })
    }

    handleChange = (e) => {
        e.preventDefault()
        switch (e.target.name) {
            case "username":
                this.setState({ username: e.target.value })
                break;
            case "password":
                this.setState({ password: e.target.value })
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
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
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Log In
                </Button>
                <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} />
            </form>
        );
    }
}
