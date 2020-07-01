import React from "react";
import { View, Text, AsyncStorage } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";

import HomeScreen from "./home";
import CourseScreen from "./course";
import CurriculumScreen from "./curriculum";
import CalendarScreen from "./calendar";
import Header from "../shared/header";
import Login from "./login";

import { getCourseList } from "../states/home-action";
import Loader from "../shared/loader";
import { Value } from "react-native-reanimated";
const Stack = createStackNavigator();

class HomeStack extends React.Component {
  constructor(props) {
    super(props);
  }
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.isLogin) {
  //     AsyncStorage.getItem("courseList").then((value) => {
  //       if (!value) {
  //         console.log("gettttt");
  //         this.props.dispatch(getCourseList());
  //       } else {
  //         console.log("ggg");
  //       }
  //     });
  //   }
  // }

  render() {
    const { courseList, isLoading, isLogin } = this.props;
    let children = <Loader />;
    if (!isLogin) children = <Login />;
    if (isLogin && !isLoading && courseList.length) {
      children = (
        <Stack.Navigator>
          {/* <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerTitle: () => <Header title="NTHUer" />,
            }}
          /> */}
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerTitle: () => <Header title="NTHUer" />,
            }}
          />
          {courseList.map((course) => {
            return (
              <Stack.Screen
                name={course.name}
                key={course.id}
                initialParams={{ courseID: course.id }}
                component={CourseScreen}
              />
            );
          })}
          <Stack.Screen name="Curriculum" component={CurriculumScreen} />
          <Stack.Screen name="Calendar" component={CalendarScreen} />
        </Stack.Navigator>
      );
    }
    return children;
  }
}

export default connect((state) => ({
  courseList: state.home.courseList,
  isLoading: state.home.isLoading,
  isLogin: state.home.isLogin,
}))(HomeStack);
