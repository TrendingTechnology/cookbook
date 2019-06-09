import React from "react";
import { StyleSheet } from "react-native";
import { Item, Label, Input } from "native-base";

export const StyledFormInput = props => (
  <Item floatingLabel style={{ ...props.itemStyle, ...styles.item }}>
    <Label style={{ ...props.labelStyle, ...styles.label }}>
      {props.label}
    </Label>
    <Input style={{ ...props.inputStyle, ...styles.input }} {...props} />
  </Item>
);

const styles = StyleSheet.create({
  item: {},
  label: {},
  input: {}
});
