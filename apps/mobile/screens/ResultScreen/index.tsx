import { Text, View, StyleSheet, useColorScheme, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { stringtoUrl } from "../../utils/convertor";
import { useTracks } from "../../contexts/trackContext";
import Item from "../../components/Item";
import * as React from "react";

export default function Index() {
  const colorScheme = useColorScheme();
  const params = useLocalSearchParams();
  const { searchTrack, isLoading, isError, track } = useTracks();
  console.log("tracks at search", track);
  React.useEffect(() => {
    // @ts-ignore
    const uri = stringtoUrl(params.query);
    searchTrack(uri);
  }, [params.query]);
  return (
    <View
      style={
        colorScheme === "light" ? stylesLight.container : stylesDark.container
      }
    >
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <Item
          isDownloaded={track?.isDownloaded}
          downloading={track?.downloading}
          downloadProgress={track?.downloadProgress}
          metadata={track?.metadata}
          url={track?.url}
          lastSearched={track?.lastSearched}
        />
      )}
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
