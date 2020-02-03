import React from 'react';
import './App.css';
import Connect from './Login/connection'
import MainPage from './MainPage/mainpage'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isUserLogged: false }
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
        <MainPage UserData={this.state.UserData} SetLogState={this.SetLogState} />
      )
    }
  }

  UserConnect = (data) => {
    data = JSON.parse(data)
    this.SetLogState(true)
    // this.setState({ isUserLogged: !this.state.isUserLogged })
    this.setState({ UserData: data })
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
