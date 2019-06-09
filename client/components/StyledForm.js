import React from "react";
import { StyleSheet } from "react-native";
import { Form } from "native-base";

export const StyledForm = props => (
  <Form style={{ ...props.style, ...styles.form }} {...props}>
    {props.children}
  </Form>
);

const styles = StyleSheet.create({
  form: {}
});
