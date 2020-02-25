/*----Import React----*/
import React from 'react';
import {
    Image,
    ImageBackground,
    KeyboardAvoidingView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { Icon } from 'react-native-elements';

/*----Import Services----*/
import { logIn } from '../services/user';

/*----Import Utils----*/
import { setAccessToken } from '../utils/common';

/*----Import Styles----*/
import { styles } from "../Style"

/*----Import Assets----*/
import backgroundJPG from "../assets/background.jpg"
import logo from "../assets/logo.png"

export default class Login extends React.Component {
    static navigationOptions = {
        title: "Login Screen"
    };

    constructor() {
        super()
        this.state = {
            badCredentials: false,
            emptyField: false,
            password: "",
            pressed: false,
            screenTitle: "CreateAccount",
            secureEntry: true,
            username: ""
        }
    }

    _showPwd = () => {
        if (this.state.pressed == false) {
            this.setState({ secureEntry: false, pressed: true })
        } else {
            this.setState({ secureEntry: true, pressed: false })
        }
    }

    _createAccount = () => {
        this.setState({ emptyField: false })
        this.props.navigation.navigate('CreateAccount', {
            navigation: this.props.navigation
        })
    }

    _checkFetch = (data) => {
        if (data.access_token) {
            this.setState({ badCredentials: false })
            setAccessToken(data.access_token);
            this.props.navigation.navigate('Area', {
                accessToken: data.access_token
            })
        } else
            this.setState({ badCredentials: true })
    }

    logInUser = async () => {
        await logIn({
            "username": this.state.username,
            "password": this.state.password
        }).then((response) => this._checkFetch(response));
    }

    _log = () => {
        if (this.state.username == "" || this.state.password == "") {
            this.setState({ emptyField: true })
            return
        } else
            this.setState({ emptyField: false })
        this.logInUser();
    }

    _displayError = () => {
        if (this.state.emptyField)
            return (
                <Text style={styles.errorText}>
                    Fields can't be empty
                </Text>
            );
        if (this.state.badCredentials)
            return (
                <Text style={styles.errorText}>
                    Invalid credentials
                </Text>
            );
    }

    render() {
        return (
            <ImageBackground
                source={backgroundJPG}
                style={styles.backgroundContainer}
            >
                <KeyboardAvoidingView
                    behavior="padding"
                    enabled
                    keyboardVerticalOffset={100}
                >
                    <View style={styles.logoContainer}>
                        <Image source={logo} style={styles.logo} />
                        <Text style={styles.logoText}>AREA APP</Text>
                    </View>
                    {this._displayError()}
                    <View style={styles.inputContainer}>
                        <Icon
                            color={'rgba(255, 255, 255, 0.7)'}
                            name={'ios-person'}
                            type={'ionicon'}
                            size={28}
                            iconStyle={styles.inputIcon}
                        />
                        <TextInput
                            onChangeText={(username) => this.setState({ username })}
                            placeholder={'Username'}
                            placeholderTextColor={'(rgba(255, 255, 255, 0.7)'}
                            style={styles.input}
                            underlineColorAndroid={'transparent'}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Icon
                            color={'rgba(255, 255, 255, 0.7)'}
                            name={'ios-lock'}
                            type={'ionicon'}
                            size={28}
                            iconStyle={styles.inputIcon}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder={'Password'}
                            secureTextEntry={this.state.secureEntry}
                            onChangeText={(password) => this.setState({ password })}
                            placeholderTextColor={'(rgba(255, 255, 255, 0.7)'}
                            underlineColorAndroid='transparent'
                        />
                        <TouchableOpacity
                            style={styles.hidePwdBtn}
                            onPress={this._showPwd.bind(this)}
                        >
                            <Icon
                                name={this.state.pressed == false
                                    ? 'ios-eye'
                                    : 'ios-eye-off'}
                                size={26}
                                type={'ionicon'}
                                color={'rgba(255, 255, 255, 0.7)'}
                            />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
                <TouchableOpacity
                    style={styles.loginBtn}
                    onPress={this._log}
                >
                    <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>
                <Text
                    style={styles.createAccountText}
                    onPress={this._createAccount}
                >
                    Create an account
                </Text>
            </ImageBackground>
        );
    }
}