import React from "react";
import { View, Text, FlatList } from "react-native";

import { globalStyles } from "../styles/global";
import Card from "../shared/card";

import { connect } from "react-redux";
import Loader from "../shared/loader";
import Empty from "../shared/empty";
import { getGradeList } from "../states/grade-action";

class _ListItem extends React.PureComponent {
  render() {
    const { item } = this.props;
    return (
      <Card>
        <Text style={globalStyles.titleText}>{item.title}</Text>
        <Text style={globalStyles.titleText}>{item.score}</Text>
      </Card>
    );
  }
}

class GradeHomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { courseID } = this.props.route.params;
    this.props.dispatch(getGradeList(courseID));
  }
  renderItem = ({ item }) => <_ListItem item={item} />;

  render() {
    const { gradeList, navigation, isLoading } = this.props;
    if (isLoading) return <Loader />;
    else if (!isLoading && gradeList.length === 0) return <Empty />;
    else if (!isLoading && gradeList.length)
      return (
        <View style={globalStyles.container}>
          <FlatList
            data={gradeList}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.title}
          />
        </View>
      );
    else return <Empty />;
  }
}

export default connect((state) => ({
  gradeList: state.gradeList.gradeList,
  isLoading: state.gradeList.isLoading,
}))(GradeHomeScreen);
