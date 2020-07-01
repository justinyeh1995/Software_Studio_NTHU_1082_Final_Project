import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { connect } from "react-redux";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

import { globalStyles } from "../styles/global";
import Card from "../shared/card";

import { getCourseList } from "../states/home-action";
class _ListItem extends React.PureComponent {
  render() {
    const { item, navigation } = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(item.name);
        }}
      >
        <Card>
          <Text style={globalStyles.titleText}>{item.name}</Text>
        </Card>
      </TouchableOpacity>
    );
  }
}

class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  renderItem = ({ item }) => (
    <_ListItem item={item} navigation={this.props.navigation} />
  );
  render() {
    const { courseList, navigation } = this.props;
    return (
      <View style={globalStyles.container}>
        <FlatList
          data={courseList}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}
        />
        <View style={styles.footer}>
          <AntDesign
            name="left"
            size={30}
            color="black"
            style={styles.left}
            onPress={() => navigation.navigate("Curriculum")}
          />
          <FontAwesome
            name="calendar"
            size={46}
            color="black"
            style={styles.curriculum}
            onPress={() => navigation.navigate("Curriculum")}
          />
          <Text style={styles.text1}>Curriculum</Text>
          <Text style={styles.text2}>Calendar</Text>
          <FontAwesome
            name="calendar-check-o"
            size={46}
            color="black"
            style={styles.calendar}
            onPress={() => navigation.navigate("Calendar")}
          />
          <AntDesign
            name="right"
            size={30}
            color="black"
            style={styles.right}
            onPress={() => navigation.navigate("Calendar")}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  footer: {
    width: "100%",
    height: "10%",
    flexDirection: "row",
  },
  left: {
    position: "absolute",
    left: 0,
    top: 10,
  },
  curriculum: {
    position: "absolute",
    left: 32,
  },
  calendar: {
    position: "absolute",
    right: 32,
  },
  right: {
    position: "absolute",
    right: 0,
    top: 10,
  },
  text1: {
    position: "absolute",
    left: 16,
    top: 46,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  text2: {
    position: "absolute",
    right: 22,
    top: 46,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

export default connect((state) => ({
  courseList: state.home.courseList,
}))(Home);
