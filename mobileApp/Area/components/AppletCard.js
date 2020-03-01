/*----Import React----*/
import React, { Component } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    Alert
} from 'react-native';

/*----Import Styles----*/
import { styles } from '../Style';

/*----Import Utils----*/
import { getAccessToken } from '../utils/common';

/*----Import Services----*/
import { getApplets} from '../services/applet.js'

export default class AppletCard extends Component {
    constructor() {
        super();
        this.state = {
        }
    }

    _redirect = () => {
        const { action, navigation, item } = this.props;

        if (action == "show") {
            this.props.navigation.navigate('Applet Description', { item: this.props.item });
        } else if (action == "Action") {
            if (this.props.applet.length == 0) {
                Alert.alert('Error', 'Actually, you have 0 available reaction because you\'re not connected to enough services',
                [{ text: 'Sorry', onPress: () => this.props.navigation.navigate('Discover') }])
            }
            navigation.navigate('Action', { item: item, action: this.props.actuAction });
        } else {
            navigation.navigate('Reaction', { item: item, action: this.props.actuReaction,
                                              finalAction: this.props.finalAction});
        }
    }

    render() {
        const { item } = this.props;

        return (
            <TouchableOpacity
                style={styles.cardContainer}
                onPress={this._redirect}
            >
                <View style={styles.appletCardContainer}>
                    <Text style={styles.appletCardTitle}>
                        {item.name + this.props.info}
                    </Text>
                    <Text style={{flex: 1}} numberOfLines={3}>
                        {item.description}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
};