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

export default class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            email: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async handleSubmit(event) {
        event.preventDefault();

        await fetch('http://localhost:5005/register', {
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

    handleChange = (e) => {
        e.preventDefault()
        switch (e.target.name) {
            case "username":
                this.setState({ username: e.target.value })
                break;
            case "password":
                this.setState({ password: e.target.value })
                break;
            case "email":
                this.setState({ email: e.target.value })
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
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Register
                </Button>
                <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} />
            </form>
        );
    }
}
