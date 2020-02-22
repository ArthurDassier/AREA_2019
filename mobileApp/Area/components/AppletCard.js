/*----Import React----*/
import React, { Component } from 'react';
import {
    Text,
    View
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

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
            <TouchableWithoutFeedback
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
            </TouchableWithoutFeedback>
        );
    }
};