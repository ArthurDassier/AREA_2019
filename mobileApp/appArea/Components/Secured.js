import React from 'react';
import { Text, View, ScrollView, Button } from 'react-native';


export default class Secured extends React.Component {
    render() {
        return (
            <ScrollView style={{ padding: 20 }}>
                <Text
                    style={{ fontSize: 27 }}>
                    Welcome
                </Text>
                <View style={{ margin: 20 }} />
                <Button
                    onPress={this.props.onLogoutPress}
                    title="Logout"
                />
            </ScrollView>
        )
    }
}