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
            <View style={styles.appletFormContainer}>
                <Text style={[styles.appletName, styles.appletFormTitle]}>
                    {item[0].toUpperCase() + item.slice(1)}
                </Text>
                <TextInput
                    onChangeText={(txt) => this.props.save(txt, item)}
                    placeholder={item[0].toUpperCase() + item.slice(1)}
                    placeholderTextColor={'(rgba(255, 255, 255, 0.7)'}
                    style={[styles.input, {textAlign: 'center', paddingLeft: 0}]}
                    underlineColorAndroid={'transparent'}
                />
            </View>
        );
    }
};