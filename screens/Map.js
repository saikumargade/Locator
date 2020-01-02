import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { connect } from "react-redux";
import { Button } from "galio-framework";
import usersinfo from "../usersinfo";
import addaction from "../actions/addaction";

class Maps extends React.Component {
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
  };
  render() {
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
          region={{
            latitude:
              added === undefined ? user.location.lat : added.location.lat,
            longitude:
              added === undefined ? user.location.long : added.location.long,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
          <Marker
            coordinate={{
              latitude: user.location.lat,
              longitude: user.location.long
            }}
            title="title"
            description="description"
            pinColor="#0000ff"
          />
          {added !== undefined ? (
            <Marker
              coordinate={{
                latitude: added.location.lat,
                longitude: added.location.long
              }}
              // title="add title"
              // description={list}
            >
              <Callout>
                <Text>{mails}</Text>
              </Callout>
            </Marker>
          ) : null}
        </MapView>
        {user.is_admin ? (
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
