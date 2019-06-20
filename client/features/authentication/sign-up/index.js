import React from "react";
import { connect } from "react-redux";
import { StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { Text, View, Container, Content } from "native-base";

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
    <Container>
      <Content padder>
        <View style={styles.headerContainer}>
          <LottieView
            source={require("../../../assets/animations/cooking.json")}
            autoPlay
            loop
            style={styles.animation}
            autoSize
          />
          <Text style={styles.headerTitle}>Sign Up to cookbook</Text>
          <Text style={styles.headerDescription}>
            A no-brainer & easy to use recipes generator for your week
          </Text>
        </View>
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

        <StyledText
          style={styles.alreadyHaveAnAccount}
          onPress={e => navigation.navigate("SignIn")}
        >
          I already have an account
        </StyledText>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    display: "flex",
    marginTop: 8,
    justifyContent: "center",
    alignItems: "center"
  },
  animation: {
    width: "90%",
    marginBottom: 40
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#232323",
    marginBottom: 10
  },
  headerDescription: {
    fontSize: 20,
    color: "#bcbcbc",
    textAlign: "center"
  },
  signUpForm: {
    marginBottom: 20
  },
  signUpButton: {
    marginBottom: 40
  },
  alreadyHaveAnAccount: {
    textAlign: "center",
    color: "#00B2E2"
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
