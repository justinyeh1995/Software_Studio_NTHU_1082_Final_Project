import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";

import MaterialDetails from "./materialDetails";
import MaterialHomeScreen from "./materialHome";

import { getMaterialList } from "../states/material-action";
import Loader from "../shared/loader";
import Empty from "../shared/empty";
const materialStack = createStackNavigator();

class MaterialStack extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { courseID } = this.props.route.params;
    this.props.dispatch(getMaterialList(courseID));
  }
  render() {
    const { materialList, isLoading } = this.props;
    const { courseID } = this.props.route.params;
    if (isLoading) return <Loader />;
    else if (!isLoading && materialList.length === 0) return <Empty />;
    else if (!isLoading && materialList.length) {
      return (
        <materialStack.Navigator>
          <materialStack.Screen
            name="MaterialHome"
            options={{
              headerShown: false,
            }}
            component={MaterialHomeScreen}
          />
          {materialList.map((material) => {
            return (
              <materialStack.Screen
                key={material.id}
                name={material.title}
                options={{
                  headerShown: false,
                }}
                component={MaterialDetails}
                initialParams={{ courseID: courseID, materialID: material.id }}
              />
            );
          })}
        </materialStack.Navigator>
      );
    } else return <Empty />;
  }
}

export default connect((state) => ({
  materialList: state.materialList.materialList,
  isLoading: state.materialList.isLoading,
}))(MaterialStack);
