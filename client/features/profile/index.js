import React from "react";
import { connect } from "react-redux";
import { StyleSheet } from "react-native";
import {
  Header,
  Card,
  CardItem,
  Text,
  Icon,
  Right,
  Body,
  Title,
  Container,
  Content,
  Left,
  Footer,
  FooterTab
} from "native-base";
import firebase from "firebase";

import { StyledButton } from "../../components/StyledButton";
import { StyledText } from "../../components/StyledText";
import { SIGN_OUT_REQUEST } from "./actions";

const ProfileComponent = ({ onRequestSignOut }) => {
  return (
    <Container>
      <Header>
        <Left />
        <Body>
          <Title>Profile</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <Card>
          <CardItem header>
            <Text>Account</Text>
          </CardItem>
          <CardItem>
            <Icon active name="idcard" type="AntDesign" />
            <Text>Information</Text>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </CardItem>
          <CardItem>
            <Icon active name="lock" type="AntDesign" />
            <Text>Security</Text>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </CardItem>
          <CardItem header>
            <Text>Recipes</Text>
          </CardItem>
          <CardItem>
            <Icon active name="filter" type="AntDesign" />
            <Text>Preferences</Text>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </CardItem>
          <CardItem>
            <Icon active name="staro" type="AntDesign" />
            <Text>Favorites</Text>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </CardItem>
        </Card>
      </Content>
      <Footer>
        <FooterTab>
          <StyledButton block onPress={() => onRequestSignOut()} danger>
            <StyledText style={styles.signOutBtnText}>Sign Out</StyledText>
          </StyledButton>
        </FooterTab>
      </Footer>
    </Container>
  );
};

const styles = StyleSheet.create({
  signOutBtnText: {
    color: "white"
  }
});

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    onRequestSignOut: () => {
      dispatch({ type: SIGN_OUT_REQUEST });
      firebase.auth().signOut();
    }
  };
};

export const Profile = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileComponent);
