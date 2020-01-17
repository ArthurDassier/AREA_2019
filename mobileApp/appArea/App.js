import React from 'react';
import AreaIndexNav from "./Index"
export default class App extends React.Component {
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
    return (
      <AreaIndexNav/>
    )
  }
}