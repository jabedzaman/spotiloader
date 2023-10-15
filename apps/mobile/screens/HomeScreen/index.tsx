import { View, useColorScheme, StyleSheet } from "react-native";
import Input from "./Input";
import Spaceman from "./spaceman";

export default function Index() {
  const colorScheme = useColorScheme();
  return (
    <View
      style={
        colorScheme === "light" ? stylesLight.container : stylesDark.container
      }
    >
      <Input />
      <Spaceman />
    </View>
  );
}

const stylesLight = StyleSheet.create({
  container: {
    backgroundColor: "#EEEEEE",
    height: "100%",
  },
});

const stylesDark = StyleSheet.create({
  container: {
    paddingHorizontal: 3,
    backgroundColor: "#111111",
    height: "100%",
  },
});
