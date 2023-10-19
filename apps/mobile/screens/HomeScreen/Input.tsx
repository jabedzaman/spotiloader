import {
  View,
  useColorScheme,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as Clipboard from "expo-clipboard";

export default function Input() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  return (
    <View
      style={
        colorScheme === "light" ? stylesLight.container : stylesDark.container
      }
    >
      <View
        style={
          colorScheme === "light"
            ? stylesLight.inputContainer
            : stylesDark.inputContainer
        }
      >
        <View
          style={colorScheme === "light" ? stylesLight.input : stylesDark.input}
        >
          <Ionicons
            name="search-outline"
            style={
              colorScheme === "light" ? stylesLight.icons : stylesDark.icons
            }
          />
          <TextInput
            style={
              colorScheme === "light"
                ? stylesLight.inputText
                : stylesDark.inputText
            }
            onSubmitEditing={(e) => {
              router.push({
                pathname: "/search/[query]",
                params: {
                  query: e.nativeEvent.text,
                },
              });
            }}
            placeholder="Search for track.."
            placeholderTextColor="#AAAAAA"
          />
        </View>
        <TouchableOpacity
          onPress={async () => {
            const url = await Clipboard.getStringAsync();
            router.push({
              pathname: "/search/[query]",
              params: {
                query: url,
              },
            });
          }}
        >
          <Ionicons
            name="clipboard-outline"
            style={
              colorScheme === "light" ? stylesLight.icons : stylesDark.icons
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const stylesLight = StyleSheet.create({
  container: {
    backgroundColor: "#EEEEEE",
  },
  input: {},
  inputText: {},
  icons: {},
  inputContainer: {},
});

const stylesDark = StyleSheet.create({
  container: {
    backgroundColor: "#111111",
  },
  input: {
    color: "#FFFFFF",
    padding: 10,
    borderColor: "#3A3A3A",
    borderWidth: 0.5,
    borderRadius: 10,
    width: "90%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    fontSize: 16,
  },
  inputText: {
    color: "#FFFFFF",
    fontFamily: "Nunito_400Regular",
  },
  icons: {
    color: "#FFFFFF",
    fontSize: 20,
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
});
