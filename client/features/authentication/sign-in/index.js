import React from "react";
import { connect } from "react-redux";
import { StyleSheet } from "react-native";

import {
  SIGN_IN_REQUEST,
  SIGN_IN_EMAIL_CHANGED,
  SIGN_IN_PASSWORD_CHANGED
} from "./actions";
import { withNativeBaseContainer } from "../../../hoc/withNativeBaseContainer";
import { StyledButton } from "../../../components/StyledButton";
import { StyledFormInput } from "../../../components/StyledFormInput";
import { StyledText } from "../../../components/StyledText";
import { StyledForm } from "../../../components/StyledForm";

const SignInComponent = ({
  onRequestSignIn,
  onEmailChanged,
  onPasswordChanged,
  email,
  password,
  error,
  canRequestSignIn,
  navigation
}) => {
  return (
    <React.Fragment>
      <StyledForm style={styles.signInForm}>
        <StyledFormInput
          label="Email"
          value={email}
          onChangeText={onEmailChanged}
          clearButtonMode="while-editing"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <StyledFormInput
          label="Password"
          value={password}
          onChangeText={onPasswordChanged}
          secureTextEntry
          clearButtonMode="while-editing"
        />
      </StyledForm>
      <StyledButton
        block
        disabled={!canRequestSignIn}
        onPress={() => onRequestSignIn(email, password)}
        style={styles.signInButton}
      >
        <StyledText>Sign In</StyledText>
      </StyledButton>

      {!error ? <React.Fragment /> : <StyledText>{error}</StyledText>}

      <StyledText onPress={e => navigation.navigate("ForgotPassword")}>
        Forgot password?
      </StyledText>

      <StyledText onPress={e => navigation.navigate("SignUp")}>
        I don't have an account
      </StyledText>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  signInForm: {
    marginBottom: 20
  },
  signInButton: {
    marginBottom: 40
  }
});

const mapStateToProps = state => {
  return {
    error: state.signIn.error,
    email: state.signIn.email,
    password: state.signIn.password,
    canRequestSignIn:
      state.signIn.email.trim().length > 0 &&
      state.signIn.password.trim().length > 0
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRequestSignIn: (email, password) =>
      dispatch({ type: SIGN_IN_REQUEST, payload: { email, password } }),
    onEmailChanged: email =>
      dispatch({
        type: SIGN_IN_EMAIL_CHANGED,
        payload: { email }
      }),
    onPasswordChanged: password =>
      dispatch({
        type: SIGN_IN_PASSWORD_CHANGED,
        payload: { password }
      })
  };
};

export const SignIn = connect(
  mapStateToProps,
  mapDispatchToProps
)(withNativeBaseContainer(SignInComponent));
