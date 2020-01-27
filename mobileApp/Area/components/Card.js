/*----Import React----*/
import React, { Component } from 'react';
import {
    ImageBackground,
    Text,
    View
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

/*----Import Styles----*/
import { styles } from '../Style';

export default class Card extends Component {
    constructor() {
        super();
        this.state = {}
    }

    render() {
        const { navigation, item } = this.props;

        return (
            <TouchableWithoutFeedback
                style={[styles.cardContainer, {
                    height: item.dimensions.height,
                    backgroundColor: item.color
                }]}
                onPress={() => navigation.navigate('Service', { item: item })}
            >
                {item.uri ? (
                    <ImageBackground
                        source={{ uri: item.uri }}
                        resizeMode={'cover'}
                        style={[styles.cardImageBackground, {
                            height: item.dimensions.height
                        }]}
                    >
                        <Text style={styles.cardTitle}>{item.title}</Text>
                    </ImageBackground>
                ) : (
                    <View style={{ backgroundColor: item.color }}>
                        <Text style={styles.cardTitle}>{item.title}</Text>
                    </View>
                )}
            </TouchableWithoutFeedback>
        );
    }
}