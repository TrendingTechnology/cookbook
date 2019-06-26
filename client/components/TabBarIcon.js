import React, { Component } from "react";
import { Icon } from "native-base";

import Colors from "../constants/Colors";

export class TabBarIcon extends Component {
  render() {
    return (
      <Icon
        name={this.props.name}
        size={26}
        style={{
          marginBottom: -3,
          color: this.props.focused ? Colors.red : Colors.tabIconDefault
        }}
        type="AntDesign"
      />
    );
  }
}
