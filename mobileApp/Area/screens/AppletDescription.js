/*----Import React----*/
import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    Alert,
    FlatList,
    TouchableOpacity
} from 'react-native';

/*----Import Styles----*/
import { styles } from '../Style';

/*----Import Utils----*/
import { getAccessToken } from '../utils/common';

/*----Import Services----*/
import { deletApplet, changeStateApplet} from '../services/applet.js'


export default class AppletDescription extends React.Component {

    static navigationOptions = ({ navigation } ) => ({
        title: `${navigation.state.params.item.name}` + " Applet"
    });

    constructor() {
        super()
        this.state = {
                applet: [],
                action: [],
                reaction: []
        }
    }

    UNSAFE_componentWillMount = () => {
        let action = [];
        let reaction = [];


        if (this.props.navigation.getParam('item').action.params != null) {
            Object.entries(this.props.navigation.getParam('item').action.params).forEach(([key, value]) => {
                    action = [
                        ...action, key + " : " + value
                    ];
            });
        }
        if (this.props.navigation.getParam('item').reaction.params != null) {
            Object.entries(this.props.navigation.getParam('item').reaction.params).forEach(([key, value]) => {
                    reaction = [
                        ...reaction, key + " : " + value
                    ];
            });
        }
        this.setState({ applet: this.props.navigation.getParam('item'), action: action, reaction: reaction })
    }

    description = () => {
        return (
            <View style={styles.descriptionContainer}>
                <Text style={styles.appletTitle}>
                    Description:
                </Text>
                <Text style={styles.appletOptions}>
                    {this.state.applet.description}
                </Text>
            </View>
        );
    }

    renderItem = ({ item }) => {
        return (
            <Text style={styles.appletOptions}> {item} </Text>
        );
    }

    checkEmptyParams = (title) => {
        if (this.state[title.toLowerCase()] == 0)
            return (
                <Text style={styles.appletOptions}> There is no parameters </Text>
            );
        return (
            <View>
                <Text style={styles.appletSubTitle}>
                    Options :
                </Text>
                <FlatList
                    data={this.state[title.toLowerCase()]}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }

    param = (obj, title) => {
        return (
            <View style={styles.descriptionContainer}>
                <Text>
                    <Text style={styles.appletTitle}>{title} :</Text>
                    <Text style={styles.appletName}> {obj.title} </Text>
                </Text>
               {this.checkEmptyParams(title)}
            </View>
        );
    }

    changeStateApplet = () => {
        this.turnStateApplet();
    }

    changeState = () => {
        let txt = "Activate";
        if (this.state.applet.enable)
            txt = "Disable";

        Alert.alert(
            'Confirmation',
             txt + " " + this.state.applet.name + ' applet ?',
            [
              { text: 'Yes', onPress: this.changeStateApplet},
              { text: 'No', style: 'cancel' },
            ]);
    }

    _checkStateResponse = (data) => {
        if (data.status == "success") {
            this.setState(prevState => ({
                applet: {
                    ...prevState.applet,
                    enable: !this.state.applet.enable
                }
            }));
        } else {
        Alert.alert(
            'Problem...',
             data.message,
            [
              { text: 'Okay', style: 'cancel' },
            ]);
        }
    }

    _checkDeletResponse = (data) => {
        console.log(data);
        console.log(data.status);
        console.log(data.message);
        console.log(data["status"]);
        if (data.status == "success") {
            Alert.alert(
                this.state.applet.name + ' successfully deleted',
                 data.message,
                [
                  { text: 'Bouya', style: 'cancel', onPress: () => {this.props.navigation.goBack()} },
                ]);
        } else {
            Alert.alert(
                'Problem...',
                 data.message,
                [
                  { text: 'Okay', style: 'cancel' },
                ]);
        }
    }

    deletApplet = async () => {
        await deletApplet(this.state.applet._id, getAccessToken()).then((response) => this._checkDeletResponse(response));
    }

    turnStateApplet = async () => {
        await changeStateApplet(this.state.applet._id, getAccessToken(), !this.state.applet.enable).then((response) => this._checkStateResponse(response));
    }

    delete = () => {
        Alert.alert(
            'Confirmation',
            'Delete the ' + this.state.applet.name + ' applet ?',
            [
              { text: 'Yes', onPress: this.deletApplet},
              { text: 'No', style: 'cancel' },
            ]);
    }

    changeStateButton = () => {
        if (this.state.applet.enable) {
            return (
                <Text style={styles.loginText} > Disable </Text>
            );
        } else {
            return (
                <Text style={styles.loginText}> Enable </Text>
            );
        }
    }

    button = () => {
        return (
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                   style={styles.appletBtn}
                   onPress={this.changeState}
                >
                    {this.changeStateButton()}
                </TouchableOpacity>
                <TouchableOpacity
                   style={styles.appletBtn}
                   onPress={this.delete}
                >
                    <Text style={styles.loginText}> Delete </Text>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        return (
            <SafeAreaView>
                <ScrollView style={styles.appletDescriptionContainer}>
                        <TouchableOpacity style={[styles.cardContainer, {marginTop: 20}]}>
                        {this.description()}
                        {this.param(this.state.applet.action, "Action")}
                        {this.param(this.state.applet.reaction, "Reaction")}
                        </TouchableOpacity>
                        {this.button()}
                </ScrollView>
            </SafeAreaView>
        );
    }
}