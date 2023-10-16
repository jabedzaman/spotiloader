import { Text, View, StyleSheet, useColorScheme, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { stringtoUrl } from "../../utils/convertor";
import { useTracks } from "../../contexts/trackContext";
import * as React from "react";

export default function Index() {
  const colorScheme = useColorScheme();
  const params = useLocalSearchParams();
  console.log(params.query);
  const { searchTrack, tracks } = useTracks();
  React.useEffect(() => {
    // @ts-ignore
    searchTrack(stringtoUrl(params.query));
  }, [params.query]);
  return (
    <View
      style={
        colorScheme === "light" ? stylesLight.container : stylesDark.container
      }
    >
      <View>
        <Image
          source={{
            uri: tracks[0].metadata.cover_url,
          }}
          width={200}
          height={200}
        />
        <Text>{tracks[0].metadata.name}</Text>
      </View>
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
