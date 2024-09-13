import { SafeAreaView } from "@components/safe-area";
import { ScrollView } from "@components/scroll-view";
import { Text } from "@components/text";
import { View } from "@components/view";
import { Colors } from "@constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@hooks/useThemeColor";
import { Image } from "expo-image";
import { useExpoRouter } from "expo-router/build/global-state/router-store";
import { Pressable } from "react-native";

export default function Home() {
  const color = useThemeColor(
    { light: Colors.light.icon, dark: Colors.dark.icon },
    "icon"
  );
  const router = useExpoRouter();
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("../assets/images/spotiloader.png")}
            style={{ width: 80, height: 80 }}
          />
          <Text
            style={{
              marginTop: 10,
            }}
            type="title"
          >
            Spotiloader
          </Text>
        </View>
        <Pressable
          onPress={() => router.push("/query")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
            flex: 1,
            borderRadius: 10,
            marginHorizontal: 10,
            gap: 10,
            borderWidth: 0.2,
            borderColor: color,
          }}
        >
          <Ionicons name="search" size={24} color={color} />
          <Text>Search for a track, playlist or album</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
