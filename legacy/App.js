import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Settings from "./screens/Settings";
import About from "./screens/About";
import History from "./screens/History";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
          headerShown: false,
          }}
        name="Home" component={Home} />
        <Stack.Screen 
        options={{
          headerShown: false,
        }}
        name="Settings" component={Settings} />
        <Stack.Screen 
        options={{
          headerShown: false,
        }}
        name="About" component={About} />
        <Stack.Screen 
        options={{
          headerShown: false,
        }}
        name="History" component={History} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
