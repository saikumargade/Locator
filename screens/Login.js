import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { Input, Button } from "galio-framework";

export default class Login extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={{ fontSize: 40, color: "white" }}>Welcome!</Text>
          <Text style={{ fontSize: 16, color: "white" }}>
            Please Login to continue
          </Text>
        </View>
        <Input
          style={styles.input}
          placeholder="email_id"
          right
          icon="user"
          family="antdesign"
          iconSize={18}
          iconColor="black"
        />
        <Input style={styles.input} placeholder="password" password viewPass />
        <Button style={styles.button} color="info">
          Login
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#37474f",
    alignItems: "center",
    paddingTop: "33%",
    width: "100%"
    // justifyContent: "center"
  },
  input: {
    width: "91%"
  },
  button: {
    marginTop: "5%"
  },
  heading: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: "12%",
    marginLeft: "-38%"
  }
});
