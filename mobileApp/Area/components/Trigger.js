/*----Import React----*/
import React, { Component } from 'react';
import {
    Image,
    ImageBackground,
    Text,
    View
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

/*----Import Styles----*/
import { styles } from '../Style';

export default class Trigger extends Component {
    constructor() {
        super();
        this.state = {}
    }

    _redirect = () => {
    }

    render() {
        const { navigation, item } = this.props;

        return (
            <TouchableWithoutFeedback
                style={[styles.cardContainer, {
                }]}
                onPress={this._redirect}
            >
                    <View style={{ backgroundColor: "" }}>
                        <Text style={[styles.cardTitle]}>{item.description}</Text>
                    </View>
            </TouchableWithoutFeedback>
        );
    }
}