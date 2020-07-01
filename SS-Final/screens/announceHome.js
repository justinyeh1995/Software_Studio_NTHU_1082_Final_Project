import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";

import { globalStyles } from "../styles/global";
import Card from "../shared/card";

import { getAnnouncementList } from "../states/announce-action";
import { connect } from "react-redux";
import announceDetails from "./announceDetails";
import Empty from "../shared/empty";

class _ListItem extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const { item, navigation } = this.props;
    return (
      <TouchableOpacity onPress={() => navigation.navigate(item.title)}>
        <Card>
          <View style={globalStyles.cardContainer}>
            <Text style={globalStyles.cardDate}>
              {item.date.month}/{item.date.day}
            </Text>
            <Text style={globalStyles.cardText}>{item.title}</Text>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
}

class AnnouncementHomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  renderItem = ({ item }) => (
    <_ListItem item={item} navigation={this.props.navigation} />
  );

  render() {
    const { announcementList, navigation } = this.props;
    if (!announcementList.length) return <Empty />;
    return (
      <View style={globalStyles.container}>
        <FlatList
          data={announcementList}
          // renderItem={({ item }) => {
          //   return (
          //     <TouchableOpacity onPress={() => navigation.navigate(item.title)}>
          //       <Card>
          //         <Text style={globalStyles.titleText}>{item.title}</Text>
          //       </Card>
          //     </TouchableOpacity>
          //   );
          // }}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }
}

export default connect((state) => ({
  announcementList: state.announcementList.announcementList,
}))(AnnouncementHomeScreen);
