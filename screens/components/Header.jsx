import { View, Text, SafeAreaView, Platform } from "react-native";
import React from "react";
import { Icon, Image } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const Header = (props) => {
  const Navigation = useNavigation();
  return (
    <SafeAreaView>
      {Platform.OS === "android" && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 10,
            marginTop: 35,
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
              source={require("../assets/iconlarge.png")}
              style={{ width: 42, height: 42 }}
            />
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                fontStyle: "italic",
              }}
            >
              {props.title || "Spotiloader"}
            </Text>
          </View>
          <View>
            <Icon
              name="settings"
              type="material"
              onPress={() => {
                Navigation.navigate("Settings");
              }}
            />
          </View>
        </View>
      )}
      {Platform.OS === "ios" && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 10,
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
              source={require("../assets/iconlarge.png")}
              style={{ width: 42, height: 42 }}
            />
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                fontStyle: "italic",
              }}
            >
              {props.title || "Spotiloader"}
            </Text>
          </View>
          <View>
            <Icon
              name="settings"
              type="material"
              onPress={() => {
                Navigation.navigate("Settings");
              }}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Header;
