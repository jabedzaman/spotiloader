import { View, Text, Image } from "react-native";
import React from "react";

const Hero = () => {
  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          textAlign: "center",
          marginVertical: 20,
        }}
      >
        Download your favorite songs from Spotify
      </Text>
    </View>
  );
};

export default Hero;
