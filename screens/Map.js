import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { connect } from "react-redux";
import { Button } from "galio-framework";

class Maps extends React.Component {
  static navigationOptions = {
    headerShown: false
  };
  render() {
    // console.log("map_props", this.props.user);
    const { user } = this.props;
    console.log(user);
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitude: user.location.lat,
            longitude: user.location.long,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
          {/* {locations.map((l, i) => {
            return (
              <Marker
                key={i}
                coordinate={l.coordinates}
                title={l.title}
                description={l.description}
              />
            );
          })} */}
          <Marker
            coordinate={{
              latitude: user.location.lat,
              longitude: user.location.long
            }}
            title="title"
            description="description"
            pinColor="#0000ff"
          />
        </MapView>
        {user.is_admin ? (
          <Button round size="small" color="green" style={styles.button}>
            Add People
          </Button>
        ) : null}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Maps);

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
