import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
const locations = [
  {
    title: "title0",
    description: "description0",
    coordinates: {
      latitude: 37.78825,
      longitude: -122.4324
    }
  },
  {
    title: "title1",
    description: "description1",
    coordinates: {
      latitude: 37.77825,
      longitude: -122.4224
    }
  },
  {
    title: "title2",
    description: "description2",
    coordinates: {
      latitude: 37.77825,
      longitude: -122.4524
    }
  }
];
export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {/* <Text>Open up App.js to start working on your app!</Text> */}
        <MapView
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
          {locations.map((l, i) => {
            return (
              <Marker
                key={i}
                coordinate={l.coordinates}
                title={l.title}
                description={l.description}
              />
            );
          })}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    // height: 400,
    // width: 400,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});
