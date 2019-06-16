import React, { useEffect } from "react";
import { connect } from "react-redux";
import { StyleSheet, Modal } from "react-native";
import { Text, Container, Content, H1, Icon } from "native-base";

import { StyledButton } from "../../../../components/StyledButton";
import { Preferences } from "../index";
import { UPDATE_PROFILE_REQUEST } from "../../actions";

const ModalPreferencesComponent = ({
  modalPreferences,
  onUpdateProfile,
  profile,
  preferences
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalPreferences.isPreferencesModalDisplayed}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <Container>
        <Content style={styles.content}>
          <H1 style={styles.header}>
            Choose your preferences to get personalized recipes.
          </H1>

          <Preferences />

          <StyledButton
            transparent
            large
            onPress={() => onUpdateProfile({ ...profile, preferences })}
            iconRight
          >
            <Text>Continue</Text>
            <Icon name="arrow-forward" />
          </StyledButton>
        </Content>
      </Container>
    </Modal>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 50,
    marginBottom: 20
  },
  content: {
    padding: 10
  }
});

const mapStateToProps = state => {
  return {
    modalPreferences: state.modalPreferences,
    profile: state.profile,
    preferences: state.preferences
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateProfile: profile =>
      dispatch({
        type: UPDATE_PROFILE_REQUEST,
        payload: { profile }
      })
  };
};

export const ModalPreferences = connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalPreferencesComponent);
