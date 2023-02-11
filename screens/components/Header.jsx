import { View, Text } from "react-native";
import React from "react";
import { Icon, Image } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";

const Header = (props) => {
  const Navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    Pacifico: require("../../assets/fonts/Pacifico.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Image
            source={require("./iconlarge.png")}
            style={{ width: 42, height: 42 }}
          />
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              fontFamily: "Pacifico",
            }}
          >
            {props.title || "Spotiloader"}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <Icon
            name="history"
            type="material"
            onPress={() => {
              Navigation.navigate("History");
            }}
          />
          <View style={{ width: 20 }} />
          <Icon
            name="settings"
            type="material"
            onPress={() => {
              Navigation.navigate("Settings");
            }}
          />
        </View>
      </View>
    );
  }
};

export default Header;
