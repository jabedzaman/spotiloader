import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { ITrack } from "../contexts/trackContext";
import { Ionicons } from "@expo/vector-icons";

export default function Item(track:ITrack) {
  return (
    <TouchableOpacity>
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
        {track.isDownloaded ? (
          <Ionicons
            name="download-outline"
            style={styles.downloadButton}
            size={24}
            color="#fff"
          />
        ) : track.downloading ? (
          <Ionicons
            name="ios-checkmark-circle-outline"
            style={styles.downloadButton}
            size={24}
            color="#fff"
          />
        ) : (
          <Ionicons
            name="download-outline"
            style={styles.downloadButton}
            size={24}
            color="#fff"
          />
        )}
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
  downloadButton: {
    marginLeft: "auto",
    alignSelf: "center",
    fontSize: 24,
  },
});
