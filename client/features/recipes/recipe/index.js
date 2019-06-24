import React from "react";
import { connect } from "react-redux";
import { StyleSheet, Image, Linking } from "react-native";
import { Text, Left, CardItem, Icon, Button, Card } from "native-base";

const RecipeComponent = ({ recipe, day }) => {
  return (
    <Card transparent>
      <CardItem header>
        <Text style={styles.recipeDay}>{day}</Text>
      </CardItem>
      <CardItem cardBody style={styles.recipeImageContainer}>
        <Image
          source={{
            uri: recipe.imageUrl
          }}
          style={styles.recipeImage}
        />
      </CardItem>
      <CardItem style={styles.recipeNameContainer}>
        <Text style={styles.recipeName}>{recipe.name}</Text>
      </CardItem>
      <CardItem style={styles.recipeDescriptionContainer}>
        <Text style={styles.recipeDescription}>
          Preparation: 45min {"\n"}Servings: 2 people
        </Text>
      </CardItem>
      {/* <CardItem>
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
      </CardItem> */}
    </Card>
  );
};

const styles = StyleSheet.create({
  recipeDay: {
    fontSize: 30,
    color: "#bcbcbc"
  },
  recipeImageContainer: {
    paddingLeft: 12,
    paddingRight: 12
  },
  recipeImage: {
    height: 200,
    flex: 1,
    borderRadius: 15
  },
  recipeNameContainer: {
    marginBottom: 0,
    paddingBottom: 0
  },
  recipeName: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: 20
  },
  recipeDescriptionContainer: {
    paddingTop: 0,
    marginTop: 0
  },
  recipeDescription: {
    color: "#bcbcbc"
  }
});

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
