import { Text, View, StyleSheet, useColorScheme } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { stringtoUrl } from "../../utils/convertor";

export default function Index() {
  const colorScheme = useColorScheme();
  const params = useLocalSearchParams();
  // @ts-ignore
  const q = stringtoUrl(params.query);
  return (
    <View
      style={
        colorScheme === "light" ? stylesLight.container : stylesDark.container
      }
    >
      <Text>{q}</Text>
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
