import React from 'react';
import { getName, getValue, getObjName } from '../Helpers/Helpers';

const Config = require('../App/app.config.json');

export default class ActionsListe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            service: this.props.service,
            actions: []
        };
        this.handleSelectAction = this.handleSelectAction.bind(this);
        this.getActionsList();
    }

    async getActionsList() {
        await fetch(`${Config.apiEndpointUrl}/static/actions.json`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                if (res.ok) {
                    return (res.json())
                } else {
                    console.log("ERREUR dans getActionsList");
                }
            })
            .then(res => {
                let data = Object.entries(res).map((e) => ({ [e[0]]: e[1] }));
                this.setActionsList(data);
            })
    }

    setActionsList(allActions) {
        let serviceName = getName(this.state.service);

        allActions.forEach(action => {
            let actionServ = getValue(action).service;
            if (actionServ === serviceName) {
                this.state.actions.push(action);
            }
        });
        this.setState({ actions: this.state.actions });
    }

    handleSelectAction(e) {
        let choice = e.currentTarget.getAttribute('value');
        console.log(`l'action choisie est ${choice}`);
        this.state.actions.forEach(action => {
            let actionName = getObjName(getValue(action));
            if (actionName === choice) {
                this.props.selectAction(action);
                return;
            }
        })
    }

    renderActionsList() {
        return this.state.actions.map((action, i) => {
            let obj = getValue(action);
            let actionName = getObjName(obj);
            return (
                <div key={i}>
                    <input id={actionName} type="radio" name="serviceinput" />
                    <li className="serviceli" value={actionName} onClick={this.handleSelectAction}>
                        <label className="service" htmlFor={actionName}></label>
                        <span>{actionName}</span>
                    </li>
                </div>
            );
        });
    }

    render() {
        return (
            <form style={{ "textAlign": "left", "paddingLeft": "40px", "paddingBottom": "20px" }}>
                <ul className="selector">
                    {this.renderActionsList()}
                </ul>
            </form>
        )
    }
}