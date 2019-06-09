import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "native-base";

export const StyledText = props => (
  <Text style={{ ...props.style, ...styles.text }} {...props}>
    {props.children}
  </Text>
);

const styles = StyleSheet.create({
  text: {}
});
