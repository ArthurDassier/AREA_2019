import React from 'react';
import MyCard from '../Helpers/MyCard';
import ReactionsListe from './ReactionsListe';

export default class ServiceDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            service: this.props.service,
            reaction: [],
            reactionChosen: false
        };
        this.handleBack = this.handleBack.bind(this);
    }

    selectReaction = (reaction) => {
        this.props.selectReaction(reaction);
        this.setState({ reactionChosen: true });
    }

    handleBack() {
        this.props.back();
    }

    render() {
        let content = <ReactionsListe service={this.props.service} selectReaction={this.selectReaction} />

        return (
            <MyCard
                title="Choose a reaction"
                content={content}
                doBack={this.handleBack}
                backText="Back"
            />
        )
    }
}