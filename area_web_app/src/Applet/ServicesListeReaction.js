import React from 'react';
import MyCard from './MyCard';
import { getName, getValue, getObjName } from '../Helpers/Helpers';

const Config = require('../App/app.config.json');

export default class ServicesListeReaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            services: [],
            reactions: {},
            serviceChosen: false
        };
        this.handleSelectService = this.handleSelectService.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.getReactionsList();
    }

    async getReactionsList() {
        await fetch(`${Config.apiEndpointUrl}/static/reactions.json`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                if (res.ok) {
                    return (res.json())
                } else {
                    console.log("ERREUR dans getReactionsList");
                }
            })
            .then(res => {
                this.setState({ reactions: res }, () => {
                    this.updateServicesList();
                });
            })
    }

    updateServicesList() {
        let services = this.props.services;
        let reactions = Object.values(this.state.reactions);
        let serviceNames = [];
        services.forEach(service => {
            serviceNames.push(getName(service));
        })

        reactions.forEach(reaction => {
            let i = serviceNames.indexOf(reaction.service);
            if (i > -1 && !this.state.services.includes(services[i])) {
                this.state.services.push(services[i]);
            }
        });
        this.setState({ services: this.state.services });
    }

    handleSelectService(e) {
        let choice = e.currentTarget.getAttribute('value');
        console.log(`le service choisi est ${choice}`);
        this.state.services.forEach(service => {
            let servName = getObjName(getValue(service));
            if (servName === choice) {
                this.props.selectService(service);
                this.setState({ serviceChosen: true });
                return;
            }
        })
    }

    handleBack() {
        this.props.back();
    }

    renderServicesList() {
        return this.state.services.map((serv, i) => {
            let obj = getValue(serv);
            let servName = getObjName(obj);
            return (
                <div key={i}>
                    <input id={servName} type="radio" name="serviceinput" />
                    <li className="serviceli" value={servName} onClick={this.handleSelectService}>
                        <label className="service" htmlFor={servName} style={{ "backgroundImage": `url(${obj.uri})` }}></label>
                        <span>{servName}</span>
                    </li>
                </div>
            )
        });
    }

    render() {
        let content =
            <form style={{ "textAlign": "left", "paddingLeft": "40px", "paddingBottom": "20px" }}>
                <ul className="selector">
                    {this.renderServicesList()}
                </ul>
            </form>

        return (
            <MyCard
                title="Choix du service pour la réaction"
                content={content}
                doBack={this.handleBack}
                backText="Retour"
            />
        )
    }
}