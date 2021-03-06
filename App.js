import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Login from "./screens/Login";
import Maps from "./screens/Map";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
// import { createStackNavigator } from "react-navigation-stack";
import reducers from "./reducers";
import { createStore } from "redux";
import { Provider } from "react-redux";

const store = createStore(reducers);

const AppNavigator = createSwitchNavigator({
  Login: Login,
  Map: Maps
});
const Container = createAppContainer(AppNavigator);
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container />
      </Provider>
    );
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
