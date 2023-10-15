import { View, Text, TextInput } from "react-native";
import * as React from "react";
import { useRouter } from "expo-router";

export default function Index(): React.ReactElement {
  const router = useRouter();
  return (
    <View
      style={{
        backgroundColor: "#111111",
        paddingHorizontal: 3,
        height: "100%",
      }}
    >
      <TextInput
        placeholder="Search"
        autoFocus={true}
        style={{
          color: "#FFFFFF",
          fontSize: 20,
          fontWeight: "bold",
        }}
        keyboardAppearance="dark"
        onSubmitEditing={(e) => {
          console.log(e.nativeEvent.text);
          router.push({
            pathname: "/search/[query]",
            params: {
              query: e.nativeEvent.text,
            },
          });
        }}
      />
    </View>
  );
}
