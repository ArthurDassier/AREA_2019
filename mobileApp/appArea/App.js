import React from 'react';
import Secured from "./Components/Secured"
import Login from "./Components/Login"

export default class App extends React.Component {
  state = {
    isLoggedIn: false
  }
  render() {
      if (this.state.isLoggedIn) 
        return <Secured 
            onLogoutPress={() => this.setState({isLoggedIn: false})}
          />;
      else 
        return <Login 
            onLoginPress={() => this.setState({isLoggedIn: true})}
          />;
  }
}