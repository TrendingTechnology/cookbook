import React, { useEffect } from "react";
import { connect } from "react-redux";
import { StyleSheet, ScrollView, RefreshControl } from "react-native";
import {
  Header,
  Tab,
  Tabs,
  Text,
  Container,
  Left,
  Right,
  Title,
  Body,
  Content
} from "native-base";

import { GET_RECIPES_REQUEST } from "./actions.js";
import { Recipe } from "./recipe/index.js";

const weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

const RecipesComponent = ({ onGetRecipes, recipes, profile }) => {
  useEffect(() => {
    if (profile.preferences) {
      onGetRecipes();
    }
  }, [profile]);

  return (
    <Container>
      <Header style={styles.header}>
        <Left>
          <Title style={styles.headerTitle}>Recipes</Title>
        </Left>
        <Right />
      </Header>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onGetRecipes} />
        }
      >
        <Content padder>
          {recipes && recipes.length > 0 ? (
            recipes.map((recipe, index) => (
              <Recipe key={index} recipe={recipe} day={weekday[index]} />
            ))
          ) : (
            <React.Fragment />
          )}
        </Content>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 80,
    borderBottomWidth: 0,
    paddingLeft: 20,
    backgroundColor: "#fff",
    marginTop: 30
  },
  headerTitle: {
    fontSize: 35,
    color: "#303030"
  }
});

const mapStateToProps = state => {
  return {
    recipes: state.recipes,
    profile: state.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetRecipes: () => dispatch({ type: GET_RECIPES_REQUEST })
  };
};

export const Recipes = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipesComponent);
