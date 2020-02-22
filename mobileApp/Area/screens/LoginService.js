/*----Import React----*/
import React from 'react';
import {
    Text,
    View,
} from 'react-native';

import { WebView } from 'react-native-webview';

/*----Import Services----*/
import { getRightUrlToLog } from '../services/services';

/*----Import Utils----*/
import { getAccessToken } from '../utils/common';


export default class LoginService extends React.Component {
    static navigationOptions = {
        title: "Login Service Screen"
    };

    render() {
        const { navigation } = this.props;
        const url = getRightUrlToLog(getAccessToken(), navigation.getParam('serviceData'));
        return (
                <WebView
                    source={{uri: url}}
                />
        );
    }
}