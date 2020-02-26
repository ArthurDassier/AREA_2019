/*----Import React----*/
import React from 'react';
import {
    View,
    TextInput,
    Text,
    TouchableOpacity,
    Alert
} from 'react-native';
import { Icon } from 'react-native-elements';

/*----Import Styles----*/
import { styles } from "../Style"

/*----Import Services----*/
import { createApplet} from '../services/applet.js'

/*----Import Utils----*/
import { getAccessToken } from '../utils/common';


export default class NewApplet extends React.Component {
    static navigationOptions = {
        title: "New Applet"
    };

    constructor() {
        super();
        this.state = {
            title: "",
            description: "",
            applet: {}
        };
    }

    componentDidMount = () => {
        const { navigation } = this.props;
    }

    appletCall = async (applet) => {
        await createApplet(applet,getAccessToken()).then((response) => this._checkResponse(response));
    }

    _checkResponse = (data) => {
        if (data.status == "success") {
            Alert.alert('Applet successfully created !', 'Check and manage it in Applet drawer',
                [{ text: 'Nice', onPress: () => this.props.navigation.navigate('Discover') }])
        } else {
            console.log(data);
            Alert.alert('Error while creating the applet...', 'Please try again',
                [{ text: 'Home', onPress: () => this.props.navigation.navigate('Discover') }])
        }
    }

    _createApplet = () => {
        const { navigation } = this.props;
        const action = navigation.getParam('action');
        const reaction = navigation.getParam('reaction');
        if (this.state.title.length == 0 || this.state.description.length == 0) {
            return;
        }
        let applet = {
            "name": this.state.title,
	        "description": this.state.description,
	        "action": {
	            "name": action.name,
                "params": action.params
	        },
            "reaction": {
		        "name": reaction.name,
                "params": reaction.params
            },
            "refresh_time": 1,
            "last_refresh": -1,
            "enable": true
        }
        this.setState({applet: applet});
        this.appletCall(applet);
    }

    render() {
        return (
            <View>
                <View style={styles.inputContainer}>
                    <Text style={styles.profilOption}>
                        Title:
                    </Text>
                    <Icon
                    name={'ios-body'}
                    type={'ionicon'}
                    size={28}
                    color={'rgba(0, 0, 0, 0.7)'}
                    iconStyle={styles.inputIcon}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder={'Title'}
                        onChangeText={(title) => this.setState({title: title })}
                        placeholderTextColor={'(rgba(255, 255, 255, 0.7)'}
                        underlineColorAndroid='transparent'
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.profilOption}>
                        Description:
                    </Text>
                    <Icon
                    name={'ios-book'}
                    type={'ionicon'}
                    size={28}
                    color={'rgba(0, 0, 0, 0.7)'}
                    iconStyle={styles.inputIcon}
                    />
                    <TextInput
                        style={styles.inputDescription}
                        multiline={true}
                        numberOfLines= {10}
                        placeholder={'Description'}
                        onChangeText={(des) => this.setState({ description: des })}
                        placeholderTextColor={'(rgba(255, 255, 255, 0.7)'}
                        underlineColorAndroid='transparent'
                    />
                </View>
                <TouchableOpacity
                    style={styles.loginBtn}
                    onPress={this._createApplet}
                >
                    <Text style={styles.loginText}>Create my Applet</Text>
                </TouchableOpacity>

            </View>
        );
    }
}