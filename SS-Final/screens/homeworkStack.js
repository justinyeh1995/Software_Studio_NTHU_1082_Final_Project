import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";

import HomeworkDetails from "./homeworkDetails";
import HomeworkHomeScreen from "./homeworkHome";

import { getHomeworkList } from "../states/homework-action";
import Loader from "../shared/loader";
import Empty from "../shared/empty";

const homeworkStack = createStackNavigator();

class HomeworkStack extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { courseID } = this.props.route.params;
    this.props.dispatch(getHomeworkList(courseID));
  }
  render() {
    const { homeworkList, isLoading } = this.props;
    const { courseID } = this.props.route.params;
    if (isLoading) return <Loader />;
    else if (!isLoading && homeworkList.length === 0) return <Empty />;
    else if (!isLoading && homeworkList.length) {
      return (
        <homeworkStack.Navigator>
          <homeworkStack.Screen
            name="HomeworkHome"
            options={{
              headerShown: false,
            }}
            component={HomeworkHomeScreen}
          />
          {homeworkList.map((homework) => {
            return (
              <homeworkStack.Screen
                key={homework.id}
                name={homework.title}
                options={{
                  headerShown: false,
                }}
                component={HomeworkDetails}
                initialParams={{ courseID: courseID, homeworkID: homework.id }}
              />
            );
          })}
        </homeworkStack.Navigator>
      );
    } else return <Empty />;
  }
}

export default connect((state) => ({
  homeworkList: state.homeworkList.homeworkList,
  isLoading: state.homeworkList.isLoading,
}))(HomeworkStack);
