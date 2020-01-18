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
        return (
            <ImageBackground source={backgroundJPG} style={styles.backgroundContainer}>
                <TouchableOpacity>
                    <Text>
                        Create your account bitch
                    </Text>
                </TouchableOpacity>
            </ImageBackground>
        )
    } 
}