import React from 'react';
import { TextField } from '@material-ui/core';
import { KeyboardArrowDown } from '@material-ui/icons';
import MyCard from '../Helpers/MyCard';
import { isObjectEmpty, getValue, getObjName } from '../Helpers/Helpers';

export default class Summary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            allComplete: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleContinue = this.handleContinue.bind(this);
    }

    handleChange(event) {
        event.preventDefault();
        switch (event.target.name) {
            case 'name':
                this.setState({ name: event.target.value })
                break;
            case 'description':
                this.setState({ description: event.target.value })
                break;
            default:
                break;
        }
        if (this.state.name !== "" && this.state.description !== "") {
            this.setState({ allComplete: true });
        }
    }

    handleBack() {
        this.props.back();
    }

    handleContinue() {
        this.props.confirmAppletCreation(this.state.name, this.state.description);
    }

    renderParams(params) {
        let p = Object.values(params);
        return p.map((param, i) => (
            <TextField
                key={i}
                variant='outlined'
                margin='normal'
                fullWidth
                label={param}
                name={param}
                disabled
            />
        ));
    }

    renderSummary() {
        let serv1 = getValue(this.props.actionService);
        let serv2 = getValue(this.props.reactionService);
        let action = getValue(this.props.action);
        let reaction = getValue(this.props.reaction);
        let bool1 = !(isObjectEmpty(this.props.actionParams));
        let bool2 = !(isObjectEmpty(this.props.reactionParams));

        return (
            <form className="login-form">
                <TextField
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    label="Intitulé"
                    name="name"
                    required
                    onChange={this.handleChange}
                />
                <TextField
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    label="Description"
                    name="description"
                    required
                    onChange={this.handleChange}
                />
                <br /><br />
                <p>
                    <span style={{ "fontWeight": "bold" }}>
                        {getObjName(serv1)}
                    </span>
                    <br />
                    {action.name}
                    <br />
                    <span>{bool1 === true ?
                        this.renderParams(this.props.actionParams) : <span></span>
                    }</span>
                </p>
                <KeyboardArrowDown style={{ "fontSize": "40" }} />
                <p>
                    <span style={{ "fontWeight": "bold" }}>
                        {getObjName(serv2)}
                    </span>
                    <br />
                    {reaction.description}
                    <br />
                    <span>{bool2 === true ?
                        this.renderParams(this.props.reactionParams) : <span></span>
                    }</span>
                </p>
                <br />
            </form>
        )
    }

    render() {
        let content = this.renderSummary()

        return (
            <MyCard
                title="Your new applet"
                content={content}
                doBack={this.handleBack}
                backText="Back"
                doNext={this.handleContinue}
                nextText="Create"
                canPressNext={this.state.allComplete}
            />
        )
    }
}
