import React from 'react';
import MainPage from '../MainPage/Mainpage';
import Tunnel from '../Applet/Tunnel';

const Config = require('../App/app.config.json');

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: props.userData,
            ready: false,
            creationMode: false
        };
        this.getUserServiceConnections();
    }

    async getUserServiceConnections() {
        await fetch(`${Config.apiEndpointUrl}/services`, {
            method: 'GET',
            headers: { 'Authorization': `JWT ${this.state.userData.accessToken}` }
        })
            .then(res => {
                if (res.ok) {
                    return (res.json())
                } else {
                    console.log("ERREUR dans getUserServiceConnections");
                }
            })
            .then(res => {
                this.state.userData.serviceConnections = res;
                this.setState({ userData: this.state.userData },
                    () => { console.log('this.state.userData=', this.state.userData) });
                this.setState({ ready: true });
            })
    }

    startAppletCreation = () => {
        this.setState({ creationMode: true });
    }

    stopAppletCreation = () => {
        this.setState({ creationMode: false });
    }

    render() {
        if (this.state.ready !== true) { return (<span></span>); }

        if (this.state.creationMode === false) {
            return (
                <MainPage userData={this.state.userData} startAppletCreation={this.startAppletCreation} />
            )
        } else {
            return (
                <Tunnel userData={this.state.userData} stopAppletCreation={this.stopAppletCreation} />
            )
        }
    }
}
