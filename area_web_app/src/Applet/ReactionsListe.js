import React from 'react';
import { getName, getValue } from '../Helpers/Helpers';

const Config = require('../App/app.config.json');

export default class ReactionsListe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            service: this.props.service,
            reactions: []
        };
        this.handleSelectReaction = this.handleSelectReaction.bind(this);
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
                let data = Object.entries(res).map((e) => ({ [e[0]]: e[1] }));
                this.setReactionsList(data);
            })
    }

    setReactionsList(allReactions) {
        let serviceName = getName(this.state.service);

        allReactions.forEach(reaction => {
            let reactionServ = getValue(reaction).service;
            if (reactionServ === serviceName) {
                this.state.reactions.push(reaction);
            }
        });
        this.setState({ reactions: this.state.reactions });
    }

    handleSelectReaction(e) {
        let choice = e.currentTarget.getAttribute('value');
        console.log(`la réaction choisie est ${choice}`);
        this.state.reactions.forEach(reaction => {
            let obj = getValue(reaction);
            if (obj.description === choice) {
                this.props.selectReaction(reaction);
                return;
            }
        })
    }

    renderReactionsList() {
        return this.state.reactions.map((reaction, i) => {
            let obj = getValue(reaction);
            return (
                <div key={i}>
                    <input id={obj.description} type="radio" name="serviceinput" />
                    <li className="serviceli" value={obj.description} onClick={this.handleSelectReaction}>
                        <label className="service" htmlFor={obj.description}></label>
                        <span>{obj.description}</span>
                    </li>
                </div>
            );
        });
    }

    render() {
        return (
            <form style={{ "textAlign": "left", "paddingLeft": "40px", "paddingBottom": "20px" }}>
                <ul className="selector">
                    {this.renderReactionsList()}
                </ul>
            </form>
        )
    }
}