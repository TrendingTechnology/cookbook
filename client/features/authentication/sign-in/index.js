import React from "react";
import { connect } from "react-redux";
import { StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { Text, View, Container, Content } from "native-base";

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
          <Text style={styles.headerTitle}>Sign In to cookbook</Text>
          <Text style={styles.headerDescription}>
            A no-brainer & easy to use recipes generator for your week
          </Text>
        </View>
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

        <StyledText
          style={styles.forgotPassword}
          onPress={e => navigation.navigate("ForgotPassword")}
        >
          Forgot password?
        </StyledText>
        <StyledButton
          block
          disabled={!canRequestSignIn}
          onPress={() => onRequestSignIn(email, password)}
          style={styles.signInButton}
        >
          <StyledText>Sign In</StyledText>
        </StyledButton>

        {!error ? <React.Fragment /> : <StyledText>{error}</StyledText>}
        <StyledText
          style={styles.dontHaveAccount}
          onPress={e => navigation.navigate("SignUp")}
        >
          I don't have an account
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
  signInForm: {
    marginBottom: 20
  },
  forgotPassword: {
    textAlign: "right",
    color: "#b7b7b7",
    fontSize: 16,
    marginBottom: 10
  },
  signInButton: {
    marginBottom: 40
  },
  dontHaveAccount: {
    textAlign: "center",
    color: "#00B2E2"
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
