import { Text } from "@components/text";
import { View } from "@components/view";
import { StyleSheet } from "react-native";

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Text type="subtitle">Seems like you're lost! 🤷‍♂️</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
