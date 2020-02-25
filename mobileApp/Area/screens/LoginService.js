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
                    userAgent="Mozilla/5.0 (Linux; Android 4.1.1; Galaxy Nexus Build/JRO03C) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19"
                />
        );
    }
}