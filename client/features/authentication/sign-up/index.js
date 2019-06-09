import React from "react";
import { connect } from "react-redux";
import { StyleSheet } from "react-native";

import {
  SIGN_UP_REQUEST,
  SIGN_UP_EMAIL_CHANGED,
  SIGN_UP_PASSWORD_CHANGED,
  SIGN_UP_PASSWORD_CONFIRM_CHANGED
} from "./actions";
import { withNativeBaseContainer } from "../../../hoc/withNativeBaseContainer";
import { StyledButton } from "../../../components/StyledButton";
import { StyledFormInput } from "../../../components/StyledFormInput";
import { StyledText } from "../../../components/StyledText";
import { StyledForm } from "../../../components/StyledForm";

const SignUpComponent = ({
  onRequestSignUp,
  onEmailChanged,
  onPasswordChanged,
  onPasswordConfirmChanged,
  email,
  password,
  confirmPassword,
  error,
  canRequestSignUp,
  navigation
}) => {
  return (
    <React.Fragment>
      <StyledForm style={styles.signUpForm}>
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

        <StyledFormInput
          label="Confirm password"
          value={confirmPassword}
          onChangeText={onPasswordConfirmChanged}
          secureTextEntry
          clearButtonMode="while-editing"
        />
      </StyledForm>
      <StyledButton
        block
        disabled={!canRequestSignUp}
        onPress={() => onRequestSignUp(email, password)}
        style={styles.signUpButton}
      >
        <StyledText>Sign Up</StyledText>
      </StyledButton>

      {!error ? <React.Fragment /> : <StyledText>{error}</StyledText>}

      <StyledText onPress={e => navigation.navigate("SignIn")}>
        I already have an account
      </StyledText>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  signUpForm: {
    marginBottom: 20
  },
  signUpButton: {
    marginBottom: 40
  }
});

const mapStateToProps = state => {
  return {
    error: state.signUp.error,
    email: state.signUp.email,
    password: state.signUp.password,
    confirmPassword: state.signUp.confirmPassword,
    canRequestSignUp:
      state.signUp.email.trim().length > 0 &&
      state.signUp.password.trim().length > 0 &&
      state.signUp.password === state.signUp.confirmPassword
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRequestSignUp: (email, password) =>
      dispatch({ type: SIGN_UP_REQUEST, payload: { email, password } }),
    onEmailChanged: email =>
      dispatch({
        type: SIGN_UP_EMAIL_CHANGED,
        payload: { email }
      }),
    onPasswordChanged: password =>
      dispatch({
        type: SIGN_UP_PASSWORD_CHANGED,
        payload: { password }
      }),
    onPasswordConfirmChanged: confirmPassword =>
      dispatch({
        type: SIGN_UP_PASSWORD_CONFIRM_CHANGED,
        payload: { confirmPassword }
      })
  };
};

export const SignUp = connect(
  mapStateToProps,
  mapDispatchToProps
)(withNativeBaseContainer(SignUpComponent));
