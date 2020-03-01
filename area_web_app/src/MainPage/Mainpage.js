import React from 'react';
import { Button } from '@material-ui/core';
import { AddCircleOutline } from '@material-ui/icons';

const Config = require('../App/app.config.json');

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: this.props.userData,
            userApplets: []
        };
        this.handleCreateApplet = this.handleCreateApplet.bind(this);
    }

    componentDidMount() {
        this.getUserApplets();
    }

    async getUserApplets() {
        await fetch(`${Config.apiEndpointUrl}/applets`, {
            method: 'GET',
            headers: { 'Authorization': `JWT ${this.state.userData.accessToken}` }
        })
            .then(res => {
                if (res.ok) {
                    return (res.json())
                } else {
                    console.log("ERREUR dans getUserApplets");
                }
            })
            .then(res => {
                let data = res.datas;
                if (Array.isArray(data) && data.length) {
                    data.forEach(e => {
                        this.state.userApplets.push(e);
                    });
                    this.setState({ userApplets: this.state.userApplets });
                }
            })
    }

    handleCreateApplet() {
        this.props.startAppletCreation();
    }

    render() {
        let nbApplets = this.state.userApplets.length;

        return (
            <div>
                <p>Welcome back, {this.state.userData.username} !</p>
                <p>Vous avez {nbApplets} applet(s).</p>
                <Button
                    variant="contained"
                    size="large"
                    color="default"
                    startIcon={<AddCircleOutline />}
                    onClick={this.handleCreateApplet}
                >
                    Créer un applet
                </Button>
            </div>
        )
    }
}
