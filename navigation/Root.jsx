import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Settings from "../screens/Settings";

const RootStack = createNativeStackNavigator();

const Root = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Group
        screenOptions={{
          headerShown: false,
        }}
      >
        <RootStack.Screen name="Home" component={Home} />
      </RootStack.Group>
      <RootStack.Group screenOptions={{ presentation: "modal" }}>
        <RootStack.Screen
          name="Settings"
          options={{ headerShown: false }}
          component={Settings}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export default Root;
