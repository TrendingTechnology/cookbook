import React from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";

import { StyledButton } from "../../StyledButton";
import { Text } from "native-base";
import { TOGGLE_TAG_SELECTION } from "./actions";

const TagComponent = ({ tag, onTagSelection }) => (
  <StyledButton
    style={styles.tag}
    onPress={() => onTagSelection(tag._id)}
    success={tag.isSelected}
  >
    <Text>{tag.name}</Text>
  </StyledButton>
);

const styles = StyleSheet.create({
  tag: {
    marginRight: 10,
    marginBottom: 10
  },
  selected: {}
});

const mapDispatchToProps = dispatch => {
  return {
    onTagSelection: value =>
      dispatch({
        type: TOGGLE_TAG_SELECTION,
        payload: { tagId: value }
      })
  };
};

export const Tag = connect(
  null,
  mapDispatchToProps
)(TagComponent);
