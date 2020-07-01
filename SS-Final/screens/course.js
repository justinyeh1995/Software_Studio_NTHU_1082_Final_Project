import React from "react";
import { connect } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import AnnouncementStackScreen from "./announceStack";
import MaterialStackScreen from "./materialStack";
import HomeworkStackScreen from "./homeworkStack";
import GradeHomeScreen from "./gradeHome";
import ForumStackScreen from "./forumStack";
import Ionicons from "react-native-vector-icons/Ionicons";
const Tab = createBottomTabNavigator();

class Course extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { courseID } = this.props.route.params;
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Announcement") {
              iconName = focused
                ? "ios-information-circle"
                : "ios-information-circle-outline";
            } else if (route.name === "Material") {
              iconName = focused ? "ios-list-box" : "ios-list";
            } else if (route.name === "Homework") {
              iconName = "ios-beaker";
            } else if (route.name === "Grade") {
              iconName = "ios-beer";
            } else if (route.name === "Forum") {
              iconName = focused ? "ios-people" : "ios-person";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen
          name="Announcement"
          component={AnnouncementStackScreen}
          initialParams={{ courseID: courseID }}
        />
        <Tab.Screen
          name="Material"
          component={MaterialStackScreen}
          initialParams={{ courseID: courseID }}
        />
        <Tab.Screen
          name="Homework"
          component={HomeworkStackScreen}
          initialParams={{ courseID: courseID }}
        />
        <Tab.Screen
          name="Grade"
          component={GradeHomeScreen}
          initialParams={{ courseID: courseID }}
        />
        <Tab.Screen
          name="Forum"
          component={ForumStackScreen}
          initialParams={{ courseID: courseID }}
        />
      </Tab.Navigator>
    );
  }
}

export default connect()(Course);
