import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const Navigation = useNavigation();
  return (
    <SafeAreaView>
      <StatusBar style="dark" />
      <View
        style={{
          marginHorizontal: 20,
          marginVertical: 20,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            marginTop: 20,
          }}
        >
          This is the home screen.
        </Text>
        <TouchableOpacity>
          <Button
            title={"Settings"}
            onPress={() => Navigation.navigate("Settings")}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;
