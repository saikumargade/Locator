import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Login from "./screens/Login";
import Maps from "./screens/Map";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const AppNavigator = createStackNavigator({
  Login: Login,
  Map: Maps
});
const Container = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <Container />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
