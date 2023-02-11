import React, { useState } from "react";
import { ActivityIndicator, Alert, TouchableOpacity } from "react-native";
import { Icon, Image, ListItem } from "react-native-elements";
import requestStoragePermission from "../../utils/permissionRequest";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import triggerNotification from "../../utils/triggerNotification";

const SpotifyTrack = ({ cover, title, artists, downloadlink }) => {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const saveTrack = async (uri) => {
    requestStoragePermission();
    setDownloading(true);
    const file = await FileSystem.downloadAsync(
      uri,
      FileSystem.documentDirectory + title + ".mp3"
    );
    await MediaLibrary.createAssetAsync(file.uri);
    triggerNotification("Success", `${title} is downloaded`);
    setDownloading(false);
    setDownloaded(true);
  };

  return (
    <ListItem
      style={{
        paddingHorizontal: 10,
        paddingVertical: 2,
      }}
    >
      <Image
        source={{ uri: cover }}
        style={{ width: 50, height: 50, alignSelf: "center" }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>{title}</ListItem.Title>
        <ListItem.Subtitle
          style={{
            color: "grey",
          }}
        >
          {artists}
        </ListItem.Subtitle>
      </ListItem.Content>
      <TouchableOpacity>
        {downloading ? (
          <ActivityIndicator size="small" color="grey" />
        ) : downloaded ? (
          <Icon name="check" type="material" color="green" />
        ) : (
          <Icon
            onPress={() => saveTrack(downloadlink)}
            name="download"
            type="material-community"
            color="grey"
          />
        )}
      </TouchableOpacity>
    </ListItem>
  );
};

export default SpotifyTrack;
