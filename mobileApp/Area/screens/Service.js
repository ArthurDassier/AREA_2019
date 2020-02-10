/*----Import React----*/
import React, { Component } from 'react';
import {
    Image,
    ImageBackground,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

/*----Import Styles----*/
import { styles } from '../Style';

export default class Service extends Component {

    connectService = () => {

    }

    renderBackgroundImage = () => {
        const { item } = this.props.navigation.state.params;

        return (
            item.uri ? (
                <View>
                <Image
                    source={{ uri: item.uri }}
                    resizeMode={'contain'}
                    style={[styles.serviceImage, {
                        height: item.dimensions.height / 2
                    }]}
                />
                    <Text style={[
                        styles.serviceTitle,
                        { color: item.color == '#fff' ? '#000' : '#fff' }
                    ]}>{item.title}</Text>
                </View>
            ) : (
                <View style={{ backgroundColor: item.color }}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                </View>
            )
        );
    }

    renderDescription = (item) => {
        
        return (
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.serviceDescriptionContainer}
            >
                <TouchableOpacity
                    style={styles.serviceConnectButton}
                    onPress={this.connectService}
                >
                    <Text style={styles.serviceConnectText}>Connect</Text>
                </TouchableOpacity>
                <Text style={[
                    styles.serviceDescriptionText,
                    { color: item.color == '#000' ? '#fff' : '#000' }
                ]}>
                    {item.description}
                </Text>
            </ScrollView>
        )
    }

    render() {
        const { item } = this.props.navigation.state.params;

        return (
            <View style={[
                styles.serviceContainer,
                { backgroundColor: item.color }
            ]}>
                {this.renderBackgroundImage()}
                {this.renderDescription(item)}
            </View>
        );
    }
}