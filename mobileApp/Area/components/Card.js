/*----Import React----*/
import React, { Component } from 'react';
import {
    Image,
    Text,
    View,
    Alert
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { getActionList } from '../services/services'

/*----Import Styles----*/
import { styles } from '../Style';

export default class Card extends Component {
    constructor() {
        super();
        this.state = { action: []}
    }

    _refreshAction = async () => {
        const { navigation, item } = this.props;
        let allActions = await getActionList();

        Object.entries(allActions).forEach(([key, value]) => {
            if (value.service == item["id"]) {
                value = {
                    ...value,
                    ["id"]: key
                }
               this.setState({
                   action: [...this.state.action, value]
               });
            }
        });
    }

    _redirect = async () => {
        this._refreshAction().then(() => {
            let isCo = this.props.connectedServices.find(element => element == this.props.item["id"]);
            if (isCo == undefined) {
                this.props.navigation.navigate('Service', { item: this.props.item });
            } else {
                if (this.state.action.length != 0) {
                    this.props.navigation.navigate('Applet', { item: this.props.item, step: "Action" });
                } else {
                    Alert.alert('Sorry !', 'There is actually 0 action on this service, only reactions...',
                        [{ text: 'Try another one'}])
                }
            } 
        });
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