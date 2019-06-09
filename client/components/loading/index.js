import React from "react";
import { connect } from "react-redux";
import { Spinner, View } from "native-base";
import { StyleSheet } from "react-native";

import Colors from "../../constants/Colors";

const LoadingComponent = ({ isLoading }) => {
  return !isLoading ? (
    <React.Fragment />
  ) : (
    <React.Fragment>
      <View style={styles.overlay} />
      <Spinner style={styles.spinner} color={Colors.blue} />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  view: {
    position: "absolute"
  },
  overlay: {
    position: "absolute",
    zIndex: 998,
    height: "100%",
    width: "100%",
    margin: "auto",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  spinner: {
    position: "absolute",
    zIndex: 999,
    height: "100%",
    width: "100%",
    margin: "auto",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});

const mapStateToProps = state => {
  return {
    isLoading: state.loading.isLoading
  };
};

export const Loading = connect(
  mapStateToProps,
  null
)(LoadingComponent);
