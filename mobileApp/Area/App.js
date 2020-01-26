/*----Import React----*/
import React, { Component } from 'react';
import * as Fonts from 'expo-font';

/*----Import Screens----*/
import AppNavigator from './index';

export default class Area extends Component {
    state = {
        fontLoaded: false
    }

    async componentDidMount() {
        await Fonts.loadAsync({
            'Comfortaa': require('./assets/fonts/Comfortaa-Regular.ttf'),
            'Comfortaa-Bold': require('./assets/fonts/Comfortaa-Bold.ttf'),
            'Comfortaa-Light': require('./assets/fonts/Comfortaa-Light.ttf'),
        });
        this.setState({ fontLoaded: true });
    }

    render() {
        if (!this.state.fontLoaded)
            return null;
        return <AppNavigator />;
    }
}