import React from 'react';
import MyCard from './MyCard';
import ActionsListe from './ActionsListe';

export default class ServiceDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            service: this.props.service,
            action: [],
            actionChosen: false
        };
        this.handleBack = this.handleBack.bind(this);
    }

    selectAction = (action) => {
        this.props.selectAction(action);
        this.setState({ actionChosen: true });
    }

    handleBack() {
        this.props.back();
    }

    render() {
        let content = <ActionsListe service={this.props.service} selectAction={this.selectAction} />

        return (
            <MyCard
                title="Choix de l'action"
                content={content}
                doBack={this.handleBack}
                backText="Retour"
            />
        )
    }
}