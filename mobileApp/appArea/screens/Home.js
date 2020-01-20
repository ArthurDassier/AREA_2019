import React from 'react';
import { styles } from "../Style"
import backgroundJPG from "../assets/background.jpg"
import {
    Text,
    View,
    ImageBackground,
    ScrollView,
    TouchableOpacity
  } from 'react-native';
  
export default class Home extends React.Component {
    static navigationOptions = {
        title: "Welcome User " + "Hey"
    };
    render (){
        const { navigation } = this.props;
        return (
            <ImageBackground source={backgroundJPG} style={styles.backgroundContainer}>
                    <Text style={styles.loginText}>
                        {navigation.getParam('accessToken', 'No token')}
                    </Text>
            </ImageBackground>
        )
    } 
}