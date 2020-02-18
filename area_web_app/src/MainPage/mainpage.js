import React from 'react';
import {
    Button
} from '@material-ui/core';

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { userData: this.props.userData }
        this.handleLogOut = this.handleLogOut.bind(this);
    }

    handleLogOut() {
        this.props.setLogState(false);
    }

    render() {
        return (
            <div>
                <p>Welcome back, {this.state.userData.username} !</p>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={this.handleLogOut}
                >
                    Log Out
                </Button>
            </div>
        )
    }
}