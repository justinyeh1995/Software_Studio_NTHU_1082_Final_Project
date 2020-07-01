import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";

import ForumDetails from "./forumDetails";
import ForumHomeScreen from "./forumHome";

import { getForumList } from "../states/forum-action";
import Loader from "../shared/loader";
import Empty from "../shared/empty";

const forumStack = createStackNavigator();

class ForumStack extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { courseID } = this.props.route.params;
    this.props.dispatch(getForumList(courseID));
  }
  render() {
    const { forumList, isLoading } = this.props;
    const { courseID } = this.props.route.params;
    if (isLoading) return <Loader />;
    else if (!isLoading && forumList.length === 0) return <Empty />;
    else if (!isLoading && forumList.length) {
      return (
        <forumStack.Navigator>
          <forumStack.Screen
            name="ForumHome"
            options={{
              headerShown: false,
            }}
            component={ForumHomeScreen}
          />
          {forumList.map((forum) => {
            return (
              <forumStack.Screen
                key={forum.id}
                name={forum.id}
                options={{
                  headerShown: false,
                }}
                component={ForumDetails}
                initialParams={{ courseID: courseID, forumID: forum.id }}
              />
            );
          })}
        </forumStack.Navigator>
      );
    } else return <Empty />;
  }
}

export default connect((state) => ({
  forumList: state.forumList.forumList,
  isLoading: state.forumList.isLoading,
}))(ForumStack);
