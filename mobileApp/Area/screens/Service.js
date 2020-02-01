/*----Import React----*/
import React, { Component } from 'react';
import {
    ImageBackground,
    View,
    Text
} from 'react-native';

/*----Import Styles----*/
import { styles } from '../Style';

export default class Service extends Component {

    renderBackgroundImage = () => {
        const { item } = this.props.navigation.state.params;

        return (
            item.uri ? (
                <ImageBackground
                    source={{ uri: item.uri }}
                    resizeMode={'cover'}
                    style={[styles.cardImageBackground, {
                        height: item.dimensions.height,
                        width: '100%'
                    }]}
                >
                    <Text style={[
                        styles.cardTitle, {
                            color: '#fff',
                            fontFamily: 'Comfortaa-Bold',
                            fontSize: 36,
                            lineHeight: 40.5,
                            margin: 18,
                            textAlign: 'center'
                        }
                    ]}>{item.title}</Text>
                </ImageBackground>
            ) : (
                <View style={{ backgroundColor: item.color }}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                </View>
            )
        );
    }

    render() {
        return (
            <View style={{ flex: 1, width: '100%'}}>
                {this.renderBackgroundImage()}
            </View>
        );
    }
}