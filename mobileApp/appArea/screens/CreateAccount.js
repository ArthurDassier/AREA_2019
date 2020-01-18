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
      showPwd: true,
      pressed: false,
      username: "",
      mail: "",
      password: "",
      confirmedPassword: "",
      emptyField: false,
      wrongMail: false,
      badPassword: false,
    }
  }
  _validate = (email) => {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return expression.test(String(email).toLowerCase())
  }

  _showPwd = () => {
    if (this.state.pressed == false) {
      this.setState({showPwd: false, pressed: true})
    } else {
      this.setState({showPwd: true, pressed: false})
    }
  }

  _createAccount = () => {
    this.props.navigation.navigate('CreateAccount')
  }

  _createMyAccount = () => {
    this.setState({badPassword: false, wrongMail: false, emptyField: false})

    if (this.state.username == "" || this.state.password == "" ||
        this.state.confirmedPassword == "" || this.state.mail == "") {
      this.setState({emptyField: true})
      return
    }
    if (!this._validate(this.state.mail)) {
      this.setState({wrongMail: true})
    return
    }
  if (this.state.password.length > 18 || this.state.password.length < 6) {
      this.setState({badPassword: true})
      return
    }
    this.props.navigation.navigate('Home')
  }

  _displayError = () => {
    if (this.state.emptyField)
        return <Text style={styles.errorText}> 
        Fields can't be empty
               </Text>
    if (this.state.wrongMail)
      return <Text style={styles.errorText}> 
        Wrong formatted email bitch
               </Text> 
    if (this.state.badPassword)
      return <Text style={styles.errorText}> 
      Password should be between 6 and 18 characters.
         </Text>
  }

  render() {
    return (

  <ImageBackground source={backgroundJPG} style={styles.backgroundContainer}>
      <KeyboardAvoidingView keyboardVerticalOffset={0} behavior="position" enabled>
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
          <Icon name={'ios-person'} size={28} color={'rgba(255, 255, 255, 0.7)'}
            style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder={'Mail address'}
            onChangeText={(mail) => this.setState({mail})}
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
            secureTextEntry={this.state.showPwd}
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
        <View style={styles.inputContainer}>
          <Icon name={'ios-lock'} size={28} color={'rgba(255, 255, 255, 0.7)'}
            style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder={'Confirm your password'}
            secureTextEntry={this.state.showPwd}
            onChangeText={(confirmedPassword) => this.setState({confirmedPassword})}
            placeholderTextColor={'(rgba(255, 255, 255, 0.7)'}
            underlineColorAndroid='transparent'
          />
        </View>
        </KeyboardAvoidingView>
        <TouchableOpacity style={styles.loginBtn} onPress={this._createMyAccount}>
          <Text style={styles.loginText}>Create my account</Text>
        </TouchableOpacity>
      </ImageBackground>
    )
  }
}