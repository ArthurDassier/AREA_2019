/*----Import React----*/
import React, { Component } from 'react';
import {
    Text,
    TouchableOpacity,
    View
} from 'react-native';

/*----Import Styles----*/
import { styles } from '../Style';

export default class AppletCard extends Component {
    constructor() {
        super();
        this.state = {}
    }

    _redirect = () => {

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
                        {item.title}
                    </Text>
                    <Text>
                        {item.description}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
};