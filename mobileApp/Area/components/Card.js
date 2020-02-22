/*----Import React----*/
import React, { Component } from 'react';
import {
    Image,
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

    _redirect = () => {
        let isCo = this.props.connectedServices.find(element => element == this.props.item["id"]);
        if (isCo == undefined) {
            this.props.navigation.navigate('Service', { item: this.props.item });
        } else {
            this.props.navigation.navigate('Applet', { item: this.props.item });
        }
    }

    render() {
        const { navigation, item } = this.props;

        return (
            <TouchableWithoutFeedback
                style={[styles.cardContainer, {
                    backgroundColor: item.color
                }]}
                onPress={this._redirect}
            >
                {item.uri ? (
                    <View>
                        <Image
                            source={{ uri: item.uri }}
                            resizeMode={'contain'}
                            style={[styles.cardImageBackground, {
                                height: item.dimensions.height
                            }]}
                        />
                        <Text style={[styles.cardTitle, 
                            item.color == '#000'
                                ? { color: '#fff' }
                                : { color: '#000' }
                            ]}>
                            {item.title}
                        </Text>
                    </View>
                ) : (
                    <View style={{ backgroundColor: item.color }}>
                        <Text style={styles.cardTitle}>{item.title}</Text>
                    </View>
                )}
            </TouchableWithoutFeedback>
        );
    }
}