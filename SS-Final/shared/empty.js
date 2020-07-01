import React from "react";
import { View, Text, StyleSheet, Image, } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center'
  },
});

export default class Empty extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style = {styles.container}>
        <Text >No Data Available</Text>
        <Image
            source={require('../img/nodata-bg.png')}
            marginTop = {20}
        />
      </View>
    );
  }
}
