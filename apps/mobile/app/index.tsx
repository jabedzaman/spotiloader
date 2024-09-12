import { Link, Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: "Home" }} />
      <View style={styles.container}>
        <Link href={"/"}>HI</Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
