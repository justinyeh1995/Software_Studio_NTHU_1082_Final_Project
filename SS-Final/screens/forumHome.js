import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";

import { globalStyles } from "../styles/global";
import Card from "../shared/card";

import { connect } from "react-redux";
import Empty from "../shared/empty";
class _ListItem extends React.PureComponent {
  render() {
    const { item, navigation } = this.props;
    return (
      <TouchableOpacity onPress={() => navigation.navigate(item.id)}>
        <Card>
          <View style={globalStyles.cardContainer}>
            <Text style={globalStyles.cardDate}>
              {item.time.month}/{item.time.day}
            </Text>
            <Text style={globalStyles.cardText}>{item.title}</Text>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
}

class ForumHomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  renderItem = ({ item }) => (
    <_ListItem item={item} navigation={this.props.navigation} />
  );

  render() {
    const { forumList, navigation } = this.props;
    return (
      <View style={globalStyles.container}>
        <FlatList
          data={forumList}
          renderItem={this.renderItem}
          keyExtractor={(item) => `${item.id}`}
        />
      </View>
    );
  }
}

export default connect((state) => ({
  forumList: state.forumList.forumList,
}))(ForumHomeScreen);
