import React from "react";
import { connect } from "react-redux";
import { View, Text, Button, FlatList, ScrollView, Linking, TouchableOpacity } from "react-native";
import { getHomeworkDetail } from "../states/homework-action";
import { globalStyles } from "../styles/global";
import Loader from "../shared/loader";

class _ListItem extends React.PureComponent {
  
  handleSubmit(link) {
    Linking.openURL(`${link}`)
  }

  render() {
    const { item } = this.props;
    return (
      <View>
        <TouchableOpacity onPress = {() => { this.handleSubmit(item.link)}}>
          <Text style={{color: "#147efb"}}>{item.attachname}</Text>
        </TouchableOpacity >
      </View>
    );
  }
}



class HomeworkDetails extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { courseID, homeworkID } = this.props.route.params;
    this.props.dispatch(getHomeworkDetail(courseID, homeworkID));
  }
  renderItem = ({ item }) => <_ListItem item={item} />;
  render() {
    const { homeworkDetail, navigation, isLoading } = this.props;
    let children = <Loader />;
    if (!isLoading && homeworkDetail.length) {
      children = (
        <View style={globalStyles.container}>
          {/* Need Title ? */}
          <ScrollView>
            <View style={globalStyles.detailBox}>
              <Text style={globalStyles.detailText}>
                {homeworkDetail[0].Content}
              </Text>
            </View>
          </ScrollView>
          {/* <Text>{homeworkDetail[0].Homework}</Text> */}
          <FlatList
            data={homeworkDetail[0].attachment}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.attachname}
          />
          <Button title="go back" onPress={() => navigation.goBack()} />
        </View>
      );
    }
    return children;
  }
}

export default connect((state) => ({
  homeworkDetail: state.homeworkDetail.homeworkDetail,
  isLoading: state.homeworkDetail.isLoading,
}))(HomeworkDetails);
