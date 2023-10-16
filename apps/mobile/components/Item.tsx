import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { ITrack } from "../contexts/trackContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Item(track: ITrack) {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: "/search",
        });
      }}
    >
      <View style={styles.container}>
        <Image
          source={{ uri: track.metadata.cover_url }}
          style={styles.image}
        />
        <View>
          <Text style={styles.name}>
            {track.metadata.name.slice(0, 30)}
            {track.metadata.name.length > 30 ? "..." : ""}
          </Text>
          <Text style={styles.artists}>
            Song •{" "}
            {track.metadata.artists.map((artist: string) => artist).join(", ")}
          </Text>
        </View>
        <Ionicons
          name="add"
          style={styles.deleteButton}
          size={24}
          color="#fff"
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  image: { width: 60, height: 60, marginRight: 10 },
  name: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 16,
    color: "#fff",
  },
  artists: {
    fontFamily: "Nunito_400Regular",
    fontSize: 14,
    color: "#484848",
  },
  deleteButton: {
    marginLeft: "auto",
    alignSelf: "center",
    transform: [{ rotate: "45deg" }],
    fontSize: 24,
  },
});
