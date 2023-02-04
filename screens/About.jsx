import {
  View,
  Image,
  Text,
  SafeAreaView,
  Platform,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import config from "../config/app.config";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";

const About = () => {
  const Navigation = useNavigation();
  const version = config.version;
  const name = config.name;
  const author = config.author;
  const [fontsLoaded] = useFonts({
    Pacifico: require("../assets/fonts/Pacifico.ttf"),
  });

  return (
    <SafeAreaView>
      <StatusBar style="dark" />
      {Platform.OS === "android" && (
        <View
          style={{
            marginVertical: 25,
          }}
        />
      )}
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          width: "40%",
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
          }}
          onPress={() => Navigation.goBack()}
        >
          <Icon name="arrow-back-ios" type="material" />
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              fontStyle: "italic",
              marginLeft: 10,
            }}
          >
            About
          </Text>
        </TouchableOpacity>
      </View>
      <Image
        source={require("../assets/spotiloader.png")}
        style={{ width: 200, height: 200, alignSelf: "center", marginTop: 50 }}
      />
      <Text
        style={{
          fontSize: 40,
          fontWeight: "bold",
          textAlign: "center",
          marginTop: 30,
        }}
      >
        {name}
      </Text>
      <Text
        style={{
          fontSize: 12,
          textAlign: "center",
          marginTop: 10,
          marginBottom: 20,
        }}
      >
        v {version}
      </Text>
      <View>
        <Text
          style={{
            fontSize: 20,
            textAlign: "center",
            fontFamily: "Pacifico",
          }}
        >
          Made with ❤️ by{author}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default About;
