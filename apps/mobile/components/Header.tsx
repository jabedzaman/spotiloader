import {
  Text,
  View,
  StyleSheet,
  useColorScheme,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import * as React from "react";

export default function Header() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const pathname = usePathname();
  let title: string;
  if (pathname === "/") {
    title = "Spotiloader";
  } else if (pathname.startsWith("/search")) {
    title = "Search";
  } else if (pathname.startsWith("/settings")) {
    title = "Settings";
  } else if (pathname.startsWith("/downloads")) {
    title = "Downloads";
  } else {
    title = "Spotiloader";
  }

  return (
    <View
      style={
        colorScheme === "light" ? stylesLight.container : stylesDark.container
      }
    >
      <Ionicons
        name="menu"
        style={
          colorScheme === "light"
            ? stylesLight.settingsMenu
            : stylesDark.settingsMenu
        }
      />
      <Text
        style={
          colorScheme === "light" ? stylesLight.heading : stylesDark.heading
        }
      >
        {title}
      </Text>

      <Pressable
        onPress={() => {
          console.log("pressed settings");
          router.push("/downloads");
        }}
      >
        <Ionicons
          name="download-outline"
          style={
            colorScheme === "light"
              ? stylesLight.settingsMenu
              : stylesDark.settingsMenu
          }
        />
      </Pressable>
    </View>
  );
}

const stylesLight = StyleSheet.create({
  container: {
    backgroundColor: "#EEEEEE",
  },
  heading: {
    color: "#000000",
    alignSelf: "center",
    fontFamily: "Nunito_700Bold",
    fontSize: 28,
  },
  settingsMenu: {
    color: "#000000",
    fontSize: 28,
  },
  rightContainer: {},
});

const stylesDark = StyleSheet.create({
  container: {
    backgroundColor: "#111111",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  heading: {
    color: "#FFFFFF",
    fontFamily: "Nunito_700Bold",
    fontSize: 28,
  },
  settingsMenu: {
    color: "#FFFFFF",
    fontSize: 28,
  },
  rightContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
});
