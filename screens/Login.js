import React from "react";
import { Text, View, StyleSheet, Image, Alert } from "react-native";
import { Input, Button } from "galio-framework";
import usersinfo from "../usersinfo";
import logaction from "../actions/logaction";
import { connect } from "react-redux";

class Login extends React.Component {
  state = {
    email_id: "",
    password: ""
  };
  static navigationOptions = {
    headerShown: false
  };
  handleEmail = text => {
    this.setState({ email_id: text });
    // console.log(this.state.email_id);
  };
  handlePassword = text => {
    this.setState({ password: text });
    // console.log(this.state.password);
  };
  handleLogin = () => {
    const { email_id, password } = this.state;
    const result = usersinfo.find(
      u => u.email_id === email_id && u.password === password
    );
    if (result) {
      // console.log(this.props);
      this.props.logaction(result);
      this.props.navigation.navigate("Map");
      this.setState({ email_id: "", password: "" });
    } else {
      Alert.alert("please enter valid email and password");
      this.setState({ email_id: "", password: "" });
    }
  };
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
          value={this.state.email_id}
          placeholder="email_id"
          right
          icon="user"
          family="antdesign"
          iconSize={18}
          iconColor="black"
          onChangeText={text => this.handleEmail(text)}
        />
        <Input
          style={styles.input}
          value={this.state.password}
          placeholder="password"
          password
          viewPass
          onChangeText={text => this.handlePassword(text)}
        />
        <Button color="info" style={styles.button} onPress={this.handleLogin}>
          Login
        </Button>
      </View>
    );
  }
}

export default connect(null, { logaction })(Login);

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
    marginTop: "5%",
    width: "91%"
  },
  heading: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: "12%",
    marginLeft: "-38%"
  }
});
