import React from 'react';
import { Button } from '@material-ui/core';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogOut = this.handleLogOut.bind(this);
    }

    handleLogOut() {
        this.props.setLogState(false);
    }

    render() {
        const logo = <img src="area-logo_white.png" alt="area logo" />

        if (this.props.isUserLogged === true) {
            return (
                <header className="App-header-left">
                    {logo}
                    <div className="logout-wrapper">
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={this.handleLogOut}
                        >
                            Log Out
                        </Button>
                    </div>
                </header>
            );
        } else {
            return (
                <header className="App-header-center">
                    {logo}
                </header>
            );
        }
    }
}