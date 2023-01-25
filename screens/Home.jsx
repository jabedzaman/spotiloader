import { SafeAreaView } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import Header from "../components/Header";

const Home = () => {
  return (
    <SafeAreaView>
      <StatusBar style="dark" />
      <Header />
    </SafeAreaView>
  );
};

export default Home;
