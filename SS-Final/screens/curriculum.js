import React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center'
  },
});


class Curriculum extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style = {styles.container}>
        <Image
          source={require('../img/sad-ghost.png')}
        />
        <Text >
          {"\n"}We're Sorry :(
        </Text>
        <Text>
          {"\n"}Curriculum Is Currently Unavailable
        </Text>
      </View>
    );
  }
}

export default connect()(Curriculum);
