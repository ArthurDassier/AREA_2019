import React from 'react';
import {
    Button,
    // Card,
    // CardMedia,
    // CardContent,
    // Typography
} from '@material-ui/core';

import MyCard from './MyCard';
import { getObjName, getValue } from '../Helpers/Helpers';

export default class ActionDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            service: this.props.service
        };
        this.handleBack = this.handleBack.bind(this);
        this.handleConnectToService = this.handleConnectToService.bind(this);
    }

    handleBack() {
        this.props.back();
    }

    handleConnectToService() {
        this.props.connectToService(this.state.service);
    }

    renderContent() {
        return (
            <form className="login-form">
                {/* <Card>
                    <CardMedia
                        image="/static/images/cards/contemplative-reptile.jpg"
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Lizard
          </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                            across all continents except Antarctica
          </Typography>
                    </CardContent>
                </Card> */}
                <Button
                    variant="contained"
                    size="large"
                    color="default"
                    onClick={this.handleConnectToService}
                >
                    Connect
                </Button>
            </form>
        );
    }

    render() {
        let content = this.renderContent();
        let serviceName = getObjName(getValue(this.state.service));

        return (
            <MyCard
                title={`Connexion à ${serviceName}`}
                content={content}
                doBack={this.handleBack}
                backText="Retour"
            />
        )
    }
}
