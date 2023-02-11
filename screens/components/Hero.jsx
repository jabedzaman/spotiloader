import { View, Text } from "react-native";
import React from "react";

const Hero = () => {
  return (
    <View
      style={{
        padding: 10,
      }}
    >
      <View
        style={
          {
            //   backgroundColor: "white",
            //   width: "100%",
            //   height: 400,
            //   padding: 20,
            //   borderRadius: 20,
            //   borderWidth: 3,
            //   borderColor: "lightgray",
          }
        }
      >
        <Text
            style={{
                fontSize: 30,
                fontWeight: "bold",
                marginBottom: 10,
                textAlign: "center",
            }}
        >Download your favorite songs !!!</Text>
        <Text
            style={{
                fontSize: 20,
                fontWeight: "semibold",
                marginBottom: 10,
                textAlign: "center",
            }}
        >
          Supported platforms: Youtube, Spotify, or just seacrh with keywords
        </Text>
      </View>
    </View>
  );
};

export default Hero;
