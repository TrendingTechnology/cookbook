import React from "react";
import { connect } from "react-redux";
import { Form, Item, Picker, Icon } from "native-base";

import { ON_PREFERENCES_CHANGED } from "./actions";

const PreferencesComponent = ({ onPreferencesChanged, preferences }) => {
  return (
    <Form>
      <Item picker>
        <Picker
          mode="dropdown"
          iosIcon={<Icon name="arrow-down" />}
          placeholder="Select your SIM"
          placeholderStyle={{ color: "#bfc6ea" }}
          placeholderIconColor="#007aff"
          selectedValue={preferences.preparationTime}
          onValueChange={preparationTime =>
            onPreferencesChanged({ ...preferences, preparationTime })
          }
        >
          <Picker.Item label="Taking not more than 20 mins" value="20" />
          <Picker.Item label="Taking not more than 30 mins" value="30" />
          <Picker.Item label="Taking not more than 40 mins" value="30" />
          <Picker.Item label="Taking not more than 50 mins" value="30" />
          <Picker.Item label="Taking not more than 60 mins" value="30" />
        </Picker>
      </Item>
      <Item picker>
        <Picker
          mode="dropdown"
          iosIcon={<Icon name="arrow-down" />}
          placeholder="Select your SIM"
          placeholderStyle={{ color: "#bfc6ea" }}
          placeholderIconColor="#007aff"
          selectedValue={preferences.servings}
          onValueChange={servings =>
            onPreferencesChanged({ ...preferences, servings })
          }
        >
          <Picker.Item label="For 1 person" value="1" />
          <Picker.Item label="For 2 people" value="2" />
        </Picker>
      </Item>
      <Item picker>
        <Picker
          mode="dropdown"
          iosIcon={<Icon name="arrow-down" />}
          placeholder="Select your SIM"
          placeholderStyle={{ color: "#bfc6ea" }}
          placeholderIconColor="#007aff"
          selectedValue={preferences.eatingHabits}
          onValueChange={eatingHabits =>
            onPreferencesChanged({ ...preferences, eatingHabits })
          }
        >
          <Picker.Item label="I eat everything" value="all" />
          <Picker.Item label="I am vegetarian" value="vegetarian" />
          <Picker.Item label="I am vegan" value="vegan" />
        </Picker>
      </Item>
    </Form>
  );
};

const mapStateToProps = state => {
  return {
    preferences: state.preferences
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPreferencesChanged: preferences =>
      dispatch({
        type: ON_PREFERENCES_CHANGED,
        payload: { preferences }
      })
  };
};

export const Preferences = connect(
  mapStateToProps,
  mapDispatchToProps
)(PreferencesComponent);
