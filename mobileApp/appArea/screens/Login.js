import React from 'react';
import { styles } from "../Style"
import backgroundJPG from "../assets/background.jpg"
import logo from "../assets/logo.png"
import Icon from 'react-native-vector-icons/Ionicons'
import { NavigationActions } from 'react-navigation';
import {
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';

export default class Login extends React.Component {
  static navigationOptions = {
      title: "Login Screen"
  };
  constructor() {
    super()
    this.state = {
      screenTitle: "CreateAccount",
      secureEntry: true,
      pressed: false,
      username: "",
      password: "",
      emptyField: false,
      badCredentials: false,
    }
  }

  _showPwd = () => {
    if (this.state.pressed == false) {
      this.setState({secureEntry: false, pressed: true})
    } else {
      this.setState({secureEntry: true, pressed: false})
    }
  }

  _createAccount = () => {
    this.setState({emptyField: false})
    this.props.navigation.navigate('CreateAccount')
  }

  _checkFetch = (data) => {
    if (data.access_token) {
      this.setState({badCredentials: false})
      this.props.navigation.navigate('Home', {accessToken: data.access_token})
    } else
      this.setState({badCredentials: true})
  }

  _log = () => {
    if (this.state.username == "" || this.state.password == "") {
      this.setState({emptyField: true})
      return
    } else
      this.setState({emptyField: false})
    fetch('http://10.41.173.208:5005/auth', {
      method: 'POST',
      headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "username": this.state.username,
        "password": this.state.password,
      }),
    }).then((response) => response.json())
      .then((responseJson) => this._checkFetch(responseJson));
  }

  _displayError = () => {
    if (this.state.emptyField)
      return <Text style={styles.errorText}> 
        Fields can't be empty
             </Text>
    if (this.state.badCredentials)
      return <Text style={styles.errorText}> 
        Invalid credentials
             </Text>
}

  render() {
    const { navigation } = this.props;
    return (

  <ImageBackground source={backgroundJPG} style={styles.backgroundContainer}>
      <KeyboardAvoidingView keyboardVerticalOffset={100} behavior="padding" enabled>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.logoText}>AREA APP</Text>
        </View>
        {this._displayError()}
        <View style={styles.inputContainer}>
          <Icon name={'ios-person'} size={28} color={'rgba(255, 255, 255, 0.7)'}
            style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder={'Username'}
            onChangeText={(username) => this.setState({username})}
            placeholderTextColor={'(rgba(255, 255, 255, 0.7)'}
            underlineColorAndroid='transparent'
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name={'ios-lock'} size={28} color={'rgba(255, 255, 255, 0.7)'}
            style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder={'Password'}
            secureTextEntry={this.state.secureEntry}
            onChangeText={(password) => this.setState({password})}
            placeholderTextColor={'(rgba(255, 255, 255, 0.7)'}
            underlineColorAndroid='transparent'
          />
          <TouchableOpacity style={styles.hidePwdBtn}
            onPress={this._showPwd.bind(this)}>
            <Icon name={this.state.pressed == false ? 'ios-eye' : 'ios-eye-off'}
              size={26} color={'rgba(255, 255, 255, 0.7)'} />
          </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
        <TouchableOpacity style={styles.loginBtn} onPress={this._log}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.createAccountText} onPress={this._createAccount}>
          Create an account
        </Text>
      </ImageBackground>
    )
  }
}