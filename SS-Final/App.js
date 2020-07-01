import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider, connect } from "react-redux";

import { store } from "./store/store";

import HomeStack from "./screens/homeStack";
function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <HomeStack />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
