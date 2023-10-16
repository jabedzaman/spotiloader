import { View, TextInput, StyleSheet, Text } from "react-native";
import * as React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTracks } from "../../contexts/trackContext";
import Item from "../../components/Item";
import { FlashList } from "@shopify/flash-list";

export default function Index(): React.ReactElement {
  const router = useRouter();
  const { tracks } = useTracks();
  const handleSearch = (e: any) => {
    router.push({
      pathname: "/search/[query]",
      params: {
        query: e.nativeEvent.text,
      },
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Ionicons name="search-outline" size={24} color="#fff" />
        <TextInput
          placeholder="Search"
          placeholderTextColor={"#3A3A3A"}
          autoFocus={true}
          style={styles.textInput}
          keyboardAppearance="dark"
          onSubmitEditing={handleSearch}
        />
      </View>
      <Text style={styles.recentText}>Recent Searches</Text>
      <FlashList
        data={tracks}
        renderItem={({ item }) => <Item {...item} />}
        keyExtractor={(item) => item.url}
        horizontal={false}
        estimatedItemSize={80}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#111111",
    height: "100%",
    paddingHorizontal: 3,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 12,
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: "#3A3A3A",
    color: "#FFFFFF",
    borderWidth: 0.5,
    gap: 10,
  },
  textInput: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Nunito_400Regular",
  },
  recentText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "Nunito_700Bold",
    marginHorizontal: 12,
    marginTop: 20,
  },
  clearallText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Nunito_400Regular",
    marginHorizontal: 12,
  },
});
