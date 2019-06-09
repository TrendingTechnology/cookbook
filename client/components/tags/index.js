import React from "react";
import { StyleSheet } from "react-native";
import { View } from "native-base";

import { Tag } from "./tag";

export const Tags = ({ tags }) => (
  <View style={styles.tags}>
    {tags.map(tag => (
      <Tag key={tag._id} tag={tag} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  tags: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  }
});
