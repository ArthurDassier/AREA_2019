import React from 'react';
import { Text, View, ScrollView, TextInput, Button } from 'react-native';

export default class Login extends React.Component {
    render() {
        return (
            <ScrollView style={{ padding: 20 }}>
                <Text
                    style={{ fontSize: 27 }}>
                    Login
                </Text>
                <TextInput placeholder='Username' />
                <TextInput placeholder='Password' />
                <View style={{ margin: 7 }} />
                <Button
                    onPress={this.props.onLoginPress}
                    title="Submit"
                />
            </ScrollView>
        )
    }
}