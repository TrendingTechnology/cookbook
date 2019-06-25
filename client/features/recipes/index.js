import React, { useEffect } from "react";
import { connect } from "react-redux";
import { StyleSheet, ScrollView, RefreshControl } from "react-native";
import {
  Header,
  Tab,
  Tabs,
  Container,
  Left,
  Right,
  Title,
  ScrollableTab,
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
      <Header style={styles.header} hasTabs>
        <Left>
          <Title style={styles.headerTitle}>Recipes</Title>
        </Left>
        <Right />
      </Header>
      <Tabs
        renderTabBar={() => <ScrollableTab style={styles.tabs} />}
        tabBarBackgroundColor="#fff"
        tabBarUnderlineStyle={styles.tabBarUnderline}
      >
        {recipes && recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <Tab
              heading={weekday[index]}
              key={index}
              tabStyle={styles.tab}
              activeTabStyle={styles.activeTab}
            >
              <ScrollView
                refreshControl={
                  <RefreshControl refreshing={false} onRefresh={onGetRecipes} />
                }
              >
                <Content padder>
                  <Recipe recipe={recipe} day={weekday[index]} />
                </Content>
              </ScrollView>
            </Tab>
          ))
        ) : (
          <Tab
            heading="Test"
            tabStyle={styles.tab}
            activeTabStyle={styles.activeTab}
          >
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={false} onRefresh={onGetRecipes} />
              }
            />
          </Tab>
        )}
      </Tabs>
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
  },
  tabBarUnderline: {
    borderWidth: 0
  },
  tabs: {
    marginBottom: 20,
    borderWidth: 0
  },
  tab: {
    backgroundColor: "#fff"
  },
  activeTab: {
    backgroundColor: "#fff"
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
