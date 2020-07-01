import React from "react";
import { StyleSheet, Text, View, Alert, AsyncStorage } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { Logout } from "../states/home-action";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }
  logout() {
    Alert.alert(
      "Logout",
      "",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
        },
        {
          text: "OK",
          onPress: () => {
            this.props.dispatch(Logout());
          },
        },
      ],
      { cancelable: false }
    );
  }

  render() {
    return (
      <View style={styles.header}>
        <SimpleLineIcons
          name="logout"
          size={26}
          color="black"
          style={styles.icon}
          onPress={this.logout}
        />
        <View>
          <Text style={styles.headerText}>{this.props.title}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#333",
    letterSpacing: 1,
  },
  icon: {
    position: "absolute",
    left: 16,
  },
});

export default connect()(Header);
