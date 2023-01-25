import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Settings from "../screens/Settings";
import About from "../screens/About";

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
      <RootStack.Group screenOptions={{ presentation: "modal" }}>
        <RootStack.Screen
          name="About"
          options={{ headerShown: false }}
          component={About}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export default Root;
