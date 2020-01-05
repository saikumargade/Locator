import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  ActivityIndicator,
  Image
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { connect } from "react-redux";
import { Button } from "galio-framework";
import usersinfo from "../usersinfo";
import addaction from "../actions/addaction";
import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

class Maps extends React.Component {
  constructor(props) {
    super(props);
    const { location } = this.props.user;
    this.state = {
      location: {
        latitude: location.lat,
        longitude: location.long
      },
      isVisible: true,
      fetching: false
    };
  }
  componentDidMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    try {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
      }
      this.setState({ fetching: true });
      let location = await Location.getCurrentPositionAsync({});
      this.setState({ fetching: false });
      this.setState({ location: location.coords });
    } catch (err) {
      this.setState({ fetching: false });
      Alert.alert(
        "Location request failed due to unsatisfied device settings."
      );
    }
  };

  static navigationOptions = {
    headerShown: false
  };
  handleAdd = () => {
    const remaining = usersinfo.filter(
      u => u.email_id !== this.props.user.email_id
    );
    // console.log(remaining);
    const to_add = remaining[Math.floor(Math.random() * remaining.length)];
    // console.log(to_add);
    this.props.addaction(to_add);
    this.setState({ isVisible: !this.state.isVisible });
  };
  render() {
    const { location, isVisible } = this.state;
    // console.log("map_props", this.props.user);
    const { user, added } = this.props;
    // console.log(user);
    if (added !== undefined) {
      var list = usersinfo.filter(e => {
        return (
          e.location.lat === added.location.lat &&
          e.location.long === added.location.long
        );
      });
      // console.log(list);
      var mails = list.map(e => e.email_id).join("\n");
    }
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          showsUserLocation={true}
          region={{
            latitude:
              added === undefined ? location.latitude : added.location.lat,
            longitude:
              added === undefined ? location.longitude : added.location.long,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude
            }}
            title="title"
            description="description"
            pinColor="#0000ff"
          >
            <View>
              <Image
                source={require("../Images/MapMarker.png")}
                style={{ width: 23, height: 40 }}
              />
            </View>
          </Marker>
          {added !== undefined ? (
            <Marker
              coordinate={{
                latitude: added.location.lat,
                longitude: added.location.long
              }}
              // icon={require("../Images/MapMarker.png")}
              // title="add title"
              // description={list}
            >
              <View>
                <Text
                  style={{
                    backgroundColor: "blue",
                    height: 17,
                    width: 17,
                    borderRadius: 70,
                    paddingLeft: 4.5,
                    borderBottomWidth: -2.5,
                    marginLeft: 12,
                    zIndex: 100,
                    color: "white",
                    position: "relative",
                    marginBottom: -7
                  }}
                >
                  {list.length}
                </Text>
                <Image
                  source={require("../Images/MapMarker.png")}
                  style={{ width: 23, height: 40 }}
                />
              </View>
              <Callout style={{ width: 105, height: 55 }}>
                <Text>{mails}</Text>
              </Callout>
            </Marker>
          ) : null}
        </MapView>
        {this.state.fetching && (
          <ActivityIndicator style={{ marginBottom: "65%" }} size="large" />
        )}
        {user.is_admin && isVisible ? (
          <Button
            round
            size="small"
            color="green"
            style={styles.button}
            onPress={this.handleAdd}
          >
            Add People
          </Button>
        ) : null}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.logreducer.user,
    added: state.addreducer.added
  };
};

export default connect(mapStateToProps, { addaction })(Maps);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  button: {
    marginBottom: 25,
    shadowColor: "black",
    width: "30%"
  }
});
