import React from "react";
import { connect } from "react-redux";
import { StyleSheet } from "react-native";

import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_EMAIL_CHANGED
} from "./actions";
import { withNativeBaseContainer } from "../../../hoc/withNativeBaseContainer";
import { StyledButton } from "../../../components/StyledButton";
import { StyledFormInput } from "../../../components/StyledFormInput";
import { StyledText } from "../../../components/StyledText";
import { StyledForm } from "../../../components/StyledForm";

const ForgotPasswordComponent = ({
  onRequestForgotPassword,
  onEmailChanged,
  email,
  error,
  success,
  canRequestForgotPassword,
  navigation
}) => {
  return (
    <React.Fragment>
      <StyledForm style={styles.forgotPasswordForm}>
        <StyledFormInput
          label="Email"
          value={email}
          onChangeText={onEmailChanged}
          clearButtonMode="while-editing"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </StyledForm>
      <StyledButton
        block
        disabled={!canRequestForgotPassword}
        onPress={() => onRequestForgotPassword(email)}
        style={styles.forgotPasswordButton}
      >
        <StyledText>Send recovery link</StyledText>
      </StyledButton>

      {!error ? <React.Fragment /> : <StyledText>{error}</StyledText>}

      {!success ? <React.Fragment /> : <StyledText>{success}</StyledText>}

      <StyledText onPress={e => navigation.navigate("SignIn")}>
        Nevermind, I can sign in
      </StyledText>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  forgotPasswordForm: {
    marginBottom: 20
  },
  forgotPasswordButton: {
    marginBottom: 40
  }
});

const mapStateToProps = state => {
  return {
    error: state.forgotPassword.error,
    success: state.forgotPassword.success,
    email: state.forgotPassword.email,
    canRequestForgotPassword: state.forgotPassword.email.trim().length > 0
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRequestForgotPassword: email =>
      dispatch({ type: FORGOT_PASSWORD_REQUEST, payload: { email } }),
    onEmailChanged: email =>
      dispatch({
        type: FORGOT_PASSWORD_EMAIL_CHANGED,
        payload: { email }
      })
  };
};

export const ForgotPassword = connect(
  mapStateToProps,
  mapDispatchToProps
)(withNativeBaseContainer(ForgotPasswordComponent));
