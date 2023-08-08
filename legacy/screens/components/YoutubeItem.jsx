import { ActivityIndicator, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Icon, Image, ListItem } from "react-native-elements";
import requestStoragePermission from "../../utils/permissionRequest";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import triggerNotification from "../../utils/triggerNotification";

const YoutubeItem = ({ title, author_name, thumbnail_url, link }) => {
  const [downloaded, setDownloaded] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const download = async (link) => {
    const url = `https://ytdlapi.jabed.me/download?url=${link}`;
    requestStoragePermission();
    setDownloading(true);
    const file = await FileSystem.downloadAsync(
      url,
      FileSystem.documentDirectory + title + ".mp3"
    );
    await MediaLibrary.createAssetAsync(file.uri);
    setDownloading(false);
    setDownloaded(true);
    triggerNotification("Downloaded", title + " has been downloaded");
  };
  return (
    <TouchableOpacity>
      <ListItem
        style={{
          paddingHorizontal: 10,
          paddingVertical: 2,
        }}
      >
        <Image
          source={{ uri: thumbnail_url }}
          style={{ width: 50, height: 50, alignSelf: "center" }}
        />
        <ListItem.Content>
          <ListItem.Title style={{ fontWeight: "800" }}>{title}</ListItem.Title>
          <ListItem.Subtitle
            style={{
              color: "grey",
            }}
          >
            {author_name}
          </ListItem.Subtitle>
        </ListItem.Content>
        <TouchableOpacity>
          {downloading ? (
            <ActivityIndicator size="small" color="grey" />
          ) : downloaded ? (
            <Icon name="check" type="material" color="green" />
          ) : (
            <Icon
              name="download"
              type="material-community"
              color="grey"
              onPress={() => download(link)}
            />
          )}
        </TouchableOpacity>
      </ListItem>
    </TouchableOpacity>
  );
};

export default YoutubeItem;
