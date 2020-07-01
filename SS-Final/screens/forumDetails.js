import React from "react";
import { connect } from "react-redux";
import { View, Text, Button, FlatList } from "react-native";
import { getForumDetail } from "../states/forum-action";
import { globalStyles } from "../styles/global";
import Loader from "../shared/loader";

class _ListItem extends React.PureComponent {
  render() {
    const { item } = this.props;
    return (
      <View>
        <Text>{item.author}</Text>
        <Text>{item.Note}</Text>
      </View>
    );
  }
}

class ForumDetails extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { courseID, forumID } = this.props.route.params;
    this.props.dispatch(getForumDetail(courseID, forumID));
  }
  renderItem = ({ item }) => <_ListItem item={item} />;
  render() {
    const { forumDetail, navigation, isLoading } = this.props;
    let children = <Loader />;
    if (!isLoading && forumDetail.length) {
      children = (
        <View style={globalStyles.container}>
          {/* <Text style={globalStyles.titleText}>{forumDetail[0].floor}</Text>
          <Text style={globalStyles.titleText}>{forumDetail[0].author}</Text> */}
          {/* <Text>{forumDetail[0].Forum}</Text> */}
          <FlatList
            style={globalStyles.detailBox}
            data={forumDetail}
            renderItem={this.renderItem}
            keyExtractor={(item) => `${item.floor}`}
          />
          <Button title="go back" onPress={() => navigation.goBack()} />
        </View>
      );
    }
    return children;
  }
}

export default connect((state) => ({
  forumDetail: state.forumDetail.forumDetail,
  isLoading: state.forumDetail.isLoading,
}))(ForumDetails);
