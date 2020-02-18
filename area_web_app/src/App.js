import React from 'react';
import './App.css';
import Connect from './Login/connection'
import MainPage from './MainPage/mainpage'

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
        <MainPage userData={this.state.userData} setLogState={this.SetLogState} />
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
        <header className="App-header">
          <img src="area-logo.png" alt="area logo" />
        </header>
        <div className="App-container">
          <div className="main-content">
            {this.CheckLog()}
          </div>
        </div>
      </div >
    )
  }
}
