import React from 'react';
import { TextField } from '@material-ui/core';

import MyCard from './MyCard';
import { getValue } from '../Helpers/Helpers';

export default class ReactionDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            params: {},
            paramsComplete: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleContinue = this.handleContinue.bind(this);
    }

    handleChange(event) {
        event.preventDefault();
        let params = this.state.params;
        let name = event.target.name;
        params[name] = event.target.value;
        this.setState({ params: params });

        let bool = Object.values(params)
            .every((p) => p !== "");
        this.setState({ paramsComplete: bool });
    }

    handleBack() {
        this.props.back();
    }

    handleContinue() {
        this.props.setReactionParams(this.state.params);
        this.props.next();
    }

    renderParamsField() {
        let params = getValue(this.props.reaction).params;
        return params.map((param, i) => (
            <TextField
                key={i}
                variant='outlined'
                margin='normal'
                fullWidth
                label={param}
                name={param}
                required
                onChange={this.handleChange}
            />
        ));
    }

    render() {
        let content =
            <form className="login-form">
                {this.renderParamsField()}
            </form>

        return (
            <MyCard
                title="Paramétrage de la réaction"
                content={content}
                doBack={this.handleBack}
                backText="Retour"
                doNext={this.handleContinue}
                nextText="Continuer"
                canPressNext={this.state.paramsComplete}
            />
        )
    }
}
