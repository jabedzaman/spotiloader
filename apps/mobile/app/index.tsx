import { SafeAreaView } from "@components/safe-area";
import { ScrollView } from "@components/scroll-view";
import { Text } from "@components/text";
import { View } from "@components/view";
import { Image } from "expo-image";

export default function Home() {
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
      </ScrollView>
    </SafeAreaView>
  );
}
