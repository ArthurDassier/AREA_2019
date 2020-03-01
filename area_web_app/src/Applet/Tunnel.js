import React from 'react';

import ServicesListeAction from './ServicesListeAction';
import ServiceConnection from './ServiceConnection';
import ActionServiceDetail from './ActionServiceDetail';
import ActionDetail from './ActionDetail';
import ServicesListeReaction from './ServicesListeReaction';
import ReactionServiceDetail from './ReactionServiceDetail';
import ReactionDetail from './ReactionDetail';
import Summary from './Summary';

import { getName, getValue, isArrayEmpty, isObjectEmpty } from '../Helpers/Helpers';

const Config = require('../App/app.config.json');
const Steps = require('./tunnel.config.json');

export default class Tunnel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            services: {},
            userServiceConnections: props.userData.serviceConnections,
            actionService: {},
            action: {},
            actionParams: {},
            reactionService: {},
            reaction: {},
            reactionParams: {},
            step: 1
        };
        this.getServicesList();
    }

    async getServicesList() {
        await fetch(`${Config.apiEndpointUrl}/static/services.json`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                if (res.ok) {
                    return (res.json())
                } else {
                    console.log("ERREUR dans getServicesList");
                }
            })
            .then(res => {
                let data = Object.entries(res).map((e) => ({ [e[0]]: e[1] }));
                this.setState({ services: data },
                    () => { console.log('this.state.services=', this.state.services); });
            })
    }

    async createApplet(applet) {
        await fetch(`${Config.apiEndpointUrl}/applets`, {
            method: 'POST',
            headers: {
                'Authorization': `JWT ${this.props.userData.accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(applet)
        })
            .then(res => {
                console.log('res: ', res);
                if (res.ok) {
                    return (res.json())
                } else {
                    console.log("ERREUR dans confirmAppletCreation");
                }
            })
            .then(() => {
                this.props.stopAppletCreation();
            })
    }

    confirmAppletCreation = (name, description) => {
        let applet = {
            name: name,
            description: description,
            action: {
                name: getName(this.state.action),
                params: this.state.actionParams
            },
            reaction: {
                name: getName(this.state.reaction),
                params: this.state.reactionParams
            },
            refresh_time: 1,
            last_refresh: -1,
            enable: true
        }

        this.createApplet(applet);
    }

    async getUserServiceConnections(service) {
        await fetch(`${Config.apiEndpointUrl}/services`, {
            method: 'GET',
            headers: { 'Authorization': `JWT ${this.props.userData.accessToken}` }
        })
            .then(res => {
                if (res.ok) {
                    return (res.json())
                } else {
                    console.log("ERREUR dans getUserServiceConnections");
                }
            })
            .then(res => {
                if (res[getName(service)] === true) {
                    this.setState({ userServiceConnections: res },
                        () => { console.log('newConnections:', this.state.userServiceConnections); });
                    this.tunnelGoNext();
                }
            })
    }

    connectToService = async (service) => {
        let serv = getValue(service);
        const url = serv.authorization_uri
            + '?client_id=' + serv.client_id
            + '&redirect_uri=http://jarvis-app.fr:8090/oauth2-endpoint'
            + '&response_type=code'
            + '&scope=' + serv.scope
            + '&access_type=offline'
            + '&state=' + getName(service)
            + ',' + this.props.userData.accessToken;
        console.log('url=', url);

        var windowpop = window.open(url);
        windowpop.focus();
        var newThis = this;
        var timer = setInterval(function () {
            if (windowpop.closed) {
                clearInterval(timer);
                newThis.getUserServiceConnections(service);
                console.log('auth window closed');
            }
        }, 1000);
    }

    tunnelGoBack = () => {
        let newStep = this.state.step - 1

        if (newStep === 0) {
            this.props.stopAppletCreation();
        } else if ((newStep === Steps.ActionServiceConnection && this.state.userServiceConnections[getName(this.state.actionService)] === true)
            || (newStep === Steps.ActionDetail && isArrayEmpty(getValue(this.state.action).params) === true)
            || (newStep === Steps.ReactionServiceConnection && this.state.userServiceConnections[getName(this.state.reactionService)] === true)
            || (newStep === Steps.ReactionDetail && isArrayEmpty(getValue(this.state.reaction).params) === true)) {
            newStep = newStep - 1;
        }
        this.setState({ step: newStep }, () => { console.log('<== step:', this.state.step); });
    }

    tunnelGoNext = () => {
        let newStep = this.state.step + 1;

        if ((newStep === Steps.ActionServiceConnection && this.state.userServiceConnections[getName(this.state.actionService)] === true)
            || (newStep === Steps.ActionDetail && isArrayEmpty(getValue(this.state.action).params) === true)
            || (newStep === Steps.ReactionServiceConnection && this.state.userServiceConnections[getName(this.state.reactionService)] === true)
            || (newStep === Steps.ReactionDetail && isArrayEmpty(getValue(this.state.reaction).params) === true)) {
            newStep = newStep + 1;
        } else if (newStep === 10) {
            this.confirmAppletCreation();
        }
        this.setState({ step: newStep }, () => { console.log('==> step:', this.state.step); });
    }

    selectActionService = (service) => {
        this.setState({ actionService: service },
            () => { this.tunnelGoNext(); });
    }

    selectReactionService = (service) => {
        this.setState({ reactionService: service },
            () => { this.tunnelGoNext(); });
    }

    selectAction = (action) => {
        this.setState({ action: action },
            () => { this.tunnelGoNext(); });
    }

    selectReaction = (reaction) => {
        this.setState({ reaction: reaction },
            () => { this.tunnelGoNext(); });
    }

    setActionParams = (params) => {
        this.setState({ actionParams: params });
    }

    setReactionParams = (params) => {
        this.setState({ reactionParams: params });
    }

    renderSwitch() {
        switch (this.state.step) {
            case Steps.ServicesListeAction:
                return (
                    <ServicesListeAction
                        services={this.state.services}
                        selectService={this.selectActionService}
                        back={this.tunnelGoBack}
                    />
                );
            case Steps.ActionServiceConnection:
                return (
                    <ServiceConnection
                        service={this.state.actionService}
                        connectToService={this.connectToService}
                        back={this.tunnelGoBack}
                    />
                );
            case Steps.ActionServiceDetail:
                return (
                    <ActionServiceDetail
                        service={this.state.actionService}
                        selectAction={this.selectAction}
                        back={this.tunnelGoBack}
                    />
                );
            case Steps.ActionDetail:
                return (
                    <ActionDetail
                        action={this.state.action}
                        setActionParams={this.setActionParams}
                        back={this.tunnelGoBack}
                        next={this.tunnelGoNext}
                    />
                );
            case Steps.ServicesListeReaction:
                return (
                    <ServicesListeReaction
                        services={this.state.services}
                        selectService={this.selectReactionService}
                        back={this.tunnelGoBack}
                    />
                );
            case Steps.ReactionServiceConnection:
                return (
                    <ServiceConnection
                        service={this.state.reactionService}
                        connectToService={this.connectToService}
                        back={this.tunnelGoBack}
                    />
                );
            case Steps.ReactionServiceDetail:
                return (
                    <ReactionServiceDetail
                        service={this.state.reactionService}
                        selectReaction={this.selectReaction}
                        back={this.tunnelGoBack}
                    />
                );
            case Steps.ReactionDetail:
                return (
                    <ReactionDetail
                        reaction={this.state.reaction}
                        setReactionParams={this.setReactionParams}
                        back={this.tunnelGoBack}
                        next={this.tunnelGoNext}
                    />
                );
            case Steps.Summary:
                let s = this.state;
                return (
                    <Summary
                        actionService={s.actionService}
                        action={s.action}
                        actionParams={s.actionParams}
                        reactionService={s.reactionService}
                        reaction={s.reaction}
                        reactionParams={s.reactionParams}
                        back={this.tunnelGoBack}
                        confirmAppletCreation={this.confirmAppletCreation}
                    />
                );
            default:
                return (<span>TUNNEL ERROR</span>)
        }
    }

    render() {
        console.log(`Tunnel step: ${this.state.step}`);
        let isReady = !isObjectEmpty(this.state.services);

        return (
            <div>
                {isReady && (
                    this.renderSwitch()
                )}
            </div>
        )
    }
}