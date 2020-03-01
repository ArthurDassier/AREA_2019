/*----Import React----*/
import React from 'react';
import {
    Text,
    View,
    Alert
} from 'react-native';

import { WebView } from 'react-native-webview';


/*----Import Services----*/
import { getUserServices } from '../services/user';

/*----Import Services----*/
import { getRightUrlToLog } from '../services/services';

/*----Import Utils----*/
import { getAccessToken } from '../utils/common';


export default class LoginService extends React.Component {
    static navigationOptions = {
        title: "Login Service Screen"
    };

    _refreshProfil = async () => {
        let services = await getUserServices(getAccessToken());
        let data = [];

        Object.entries(services).forEach(([key, value]) => {
            if (value == true) {
                   data = [...data, key];
               }
        });

        if (data.find(element => element == this.props.navigation.getParam('serviceData').id)) {
            Alert.alert('Services Added', 'Check and manage it in your Profil',
                [{ text: 'Go back Home'}])
            this.props.navigation.navigate('Discover');
        }
    }

    render() {
        const { navigation } = this.props;
        const url = getRightUrlToLog(getAccessToken(), navigation.getParam('serviceData'));
        return (
                <WebView
                    source={{uri: url}}
                    userAgent="Mozilla/5.0 (Linux; Android 4.1.1; Galaxy Nexus Build/JRO03C) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19"
                    onNavigationStateChange={this._refreshProfil}
                />
        );
    }
}