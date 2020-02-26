/*----Import React----*/
import React, { Component } from 'react';
import {
    Text,
    View,
    TextInput
} from 'react-native';

/*----Import Styles----*/
import { styles } from '../Style';

export default class InputApplet extends Component {

    constructor() {
        super();
        this.state = {}
    }

    render() {
        const { item, input} = this.props;

        return (
            <View>
                <Text style={styles.profilOption}>
                    {item}
                </Text>
                <TextInput
                    onChangeText={(txt) => this.props.save(txt, item)}
                    placeholder={item.param}
                    placeholderTextColor={'(rgba(255, 255, 255, 0.7)'}
                    style={styles.input}
                    underlineColorAndroid={'transparent'}
                />
            </View>
        );
    }
};