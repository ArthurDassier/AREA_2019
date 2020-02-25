import React from 'react';
import './App.css';
import Header from './header'
import Connect from '../Login/connection'
import MainPage from '../MainPage/mainpage'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isUserLogged: false,
      userData: {
        accessToken: "",
        username: ""
      }
    }
  }

  SetLogState = (value) => {
    this.setState({ isUserLogged: value })
  }

  CheckLog = () => {
    if (this.state.isUserLogged === false) {
      return (
        <Connect UserConnect={this.UserConnect} />
      )
    } else {
      return (
        <MainPage userData={this.state.userData} />
      )
    }
  }

  UserConnect = (accessToken, username) => {
    this.setState({
      userData: {
        accessToken: accessToken,
        username: username
      }
    })
    this.SetLogState(true)
  }

  render() {
    return (
      <div className="App">
        <Header isUserLogged={this.state.isUserLogged} setLogState={this.SetLogState} />
        <div className="App-container">
          {this.CheckLog()}
        </div>
      </div >
    )
  }
}
