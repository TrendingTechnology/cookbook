import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";

import { TabBarIcon } from "../components/TabBarIcon";
import { Recipes } from "../features/recipes";
import { Profile } from "../features/profile";

const RecipesStack = createStackNavigator(
  {
    Recipes
  },
  {
    headerMode: "none"
  }
);

RecipesStack.navigationOptions = {
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="book" />
};

const ProfileStack = createStackNavigator(
  {
    Profile
  },
  {
    headerMode: "none"
  }
);

ProfileStack.navigationOptions = {
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="user" />
};

export default createAppContainer(
  createBottomTabNavigator(
    {
      RecipesStack,
      ProfileStack
    },
    {
      tabBarOptions: {
        showLabel: false,
        style: {
          borderWidth: 0,
          borderTopColor: "transparent"
        }
      }
    }
  )
);
