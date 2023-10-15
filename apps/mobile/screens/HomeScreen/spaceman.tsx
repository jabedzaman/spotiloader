import Lottie from "lottie-react-native";
import { View, StyleSheet, useColorScheme } from "react-native";
import spaceman from "../../assets/animations/spaceman.json";

export default function Spaceman() {
  const colorScheme = useColorScheme();
  return (
    <View
      style={
        colorScheme === "light" ? stylesLight.container : stylesDark.container
      }
    >
      <Lottie
        autoPlay
        style={
          colorScheme === "light" ? stylesLight.animation : stylesDark.animation
        }
        source={spaceman}
      />
    </View>
  );
}

const stylesLight = StyleSheet.create({
  container: {
    backgroundColor: "#EEEEEE",
    height: "100%",
  },
  animation: { width: 200, height: 200 },
});

const stylesDark = StyleSheet.create({
  container: {
    paddingHorizontal: 3,
    backgroundColor: "#111111",
    height: "100%",
  },
  animation: {
    width: 200,
    height: 200,
    marginTop: 50,
    alignSelf: "center",
  },
});
