import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "native-base";

export const StyledButton = props => (
  <Button style={{ ...props.style, ...styles.button }} {...props}>
    {props.children}
  </Button>
);

const styles = StyleSheet.create({});
