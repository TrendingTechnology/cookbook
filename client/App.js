import React from "react";
import { Platform, StatusBar, StyleSheet, View, YellowBox } from "react-native";
import { AppLoading, Asset, Font, Icon } from "expo";
import { Ionicons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import firebase from "firebase";

import AppNavigator from "./navigation/AppNavigator";
import MainTabNavigator from "./navigation/MainTabNavigator";
import ApiKeys from "./constants/ApiKeys";
import { Loading } from "./components/loading";
import { setAccessToken, removeAccessToken } from "./helpers/oauth-helper";
import { configureStore } from "./store";
import { ModalPreferences } from "./features/profile/preferences/modal-preferences";

const store = configureStore();

// Remove unwanted warnings
YellowBox.ignoreWarnings([
  "Remote debugger",
  "ReactNative.NativeModules.LottieAnimationView.getConstants"
]);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
      isAuthenticationReady: false,
      isAuthenticated: false
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font
    });
  }

  onAuthStateChanged = async user => {
    if (!user) {
      await removeAccessToken();
    }
    this.setState({ isAuthenticationReady: true, isAuthenticated: !!user });
  };

  render() {
    if (
      (!this.state.isLoadingComplete || !this.state.isAuthenticationReady) &&
      !this.props.skipLoadingScreen
    ) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={store}>
          <Loading />
          <ModalPreferences />
          <View style={styles.container}>
            {Platform.OS === "ios" && <StatusBar barStyle="default" />}
            {this.state.isAuthenticated ? (
              <MainTabNavigator />
            ) : (
              <AppNavigator />
            )}
          </View>
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require("./assets/images/robot-dev.png"),
        require("./assets/images/robot-prod.png")
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
      })
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
