import {
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { usePathname } from "expo-router";
import { stringtoUrl } from "../../utils/convertor";

export default function Search() {
  const pathname = usePathname();
  const colorScheme = useColorScheme();
  const hasQuery = pathname.split("/").length > 2;
  if (hasQuery) {
    const q = stringtoUrl(pathname.split("/")[2]);
    return (
      <View>
        <Text>Search for {q}</Text>
      </View>
    );
  }
  return (
    <View
      style={
        colorScheme === "light" ? stylesLight.container : stylesDark.container
      }
    >
      <Button
        title="Back"
        onPress={() => {
          console.log(pathname);
        }}
      />
      <TextInput placeholder="Search" autoFocus={true} />
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
