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

    handleSubmit() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({ "username": this.state.username, "password": this.state.password, "mail": this.state.email });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("/register", requestOptions)
            .then(response => {
                if (response.ok) {
                    console.log("LE COMPTE A BIEN ÉTÉ CRÉÉ");
                    ToastsStore.success("Registration complete !\nYou may now log in :)")
                } else {
                    console.log("ERREUR")
                    ToastsStore.error("Registration failed...\nPlease try again later :/")
                }
            })
            .catch(error => console.log('error', error));
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
