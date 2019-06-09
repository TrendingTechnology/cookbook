import React from "react";
import { connect } from "react-redux";
import { StyleSheet, Image, Linking } from "react-native";
import { Text, Left, CardItem, Icon, Button, Card } from "native-base";

const RecipeComponent = ({ recipe, day }) => {
  return (
    <Card>
      <CardItem header>
        <Text>{day}</Text>
      </CardItem>
      <CardItem cardBody>
        <Image
          source={{
            uri: recipe.imageUrl
          }}
          style={{ height: 200, width: null, flex: 1 }}
        />
      </CardItem>
      <CardItem>
        <Text>{recipe.name}</Text>
      </CardItem>
      <CardItem>
        <Text>Preparation: 45min {"\n"}Servings: 2 people</Text>
      </CardItem>
      <CardItem>
        <Left>
          <Button transparent>
            <Icon type="Entypo" active name="shuffle" />
            <Text>Change</Text>
          </Button>
          <Button transparent>
            <Icon type="AntDesign" active name="staro" />
            <Text>Favorite</Text>
          </Button>
          <Button transparent onPress={() => Linking.openURL(recipe.url)}>
            <Icon type="Feather" active name="external-link" />
            <Text>View</Text>
          </Button>
        </Left>
      </CardItem>
    </Card>
  );
};

const styles = StyleSheet.create({});

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export const Recipe = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeComponent);
