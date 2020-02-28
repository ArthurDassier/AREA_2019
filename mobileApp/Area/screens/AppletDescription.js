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
        let newApplet = this.state.applet;
        newApplet.enable = !newApplet.enable;
        this.setState({applet: newApplet})
        console.log("change state of applet id: ")
        console.log(this.state.applet._id);
        console.log(this.state.applet);
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

    deletApplet = () => {
        console.log("delet applet id: ");
        console.log(this.state.applet._id);
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