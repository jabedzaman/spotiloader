import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home";
import Settings from "./screens/Settings";
import About from "./screens/About";
import Searchhistory from "./screens/Searchhistory";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{
            headerShown: false,
          }}
          component={Home}
        />
        <Stack.Screen
          name="Settings"
          options={{
            headerShown: false,
          }}
          component={Settings}
        />
        <Stack.Screen
          name="About"
          options={{
            headerShown: false,
          }}
          component={About}
        />
        <Stack.Screen
          name="SearchHistory"
          options={{
            headerShown: false,
          }}
          component={Searchhistory}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
