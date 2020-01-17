import React from 'react';
import { styles } from "../Style"
import backgroundJPG from "../assets/background.jpg"
import logo from "../assets/logo.png"
import Icon from 'react-native-vector-icons/Ionicons'
import {
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';

export default class Login extends React.Component {
  static navigationOptions = {
      title: "Pute"
  };
  constructor() {
    super()
    this.state = {
      showPwd: true,
      pressed: false
    }
  }

  showPwd = () => {
    if (this.state.pressed == false) {
      this.setState({showPwd: false, pressed: true})
    } else {
      this.setState({showPwd: true, pressed: false})
    }
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <ImageBackground source={backgroundJPG} style={styles.backgroundContainer}>
      <KeyboardAvoidingView keyboardVerticalOffset={100} behavior="padding" enabled>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.logoText}>AREA APP</Text>
        </View>
        <View style={styles.inputContainer}>
          <Icon name={'ios-person'} size={28} color={'rgba(255, 255, 255, 0.7)'}
            style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder={'Username'}
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
            placeholderTextColor={'(rgba(255, 255, 255, 0.7)'}
            underlineColorAndroid='transparent'
          />
          <TouchableOpacity style={styles.hidePwdBtn}
            onPress={this.showPwd.bind(this)}>
            <Icon name={this.state.pressed == false ? 'ios-eye' : 'ios-eye-off'}
              size={26} color={'rgba(255, 255, 255, 0.7)'} />
          </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </ImageBackground>
    )
  }
}