import React, { useState } from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { Icon, Image, ListItem } from "react-native-elements";
import axios from "axios";
import requestStoragePermission from "../../utils/permissionRequest";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import triggerNotification from "../../utils/triggerNotification";
import secrets from "../../config/apikey.config";

const SongItem = ({ id, cover, title, artists }) => {
  const apiKey = secrets.apikey;
  const apiHost = secrets.apihost;
  const [downloaded, setDownloaded] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const downloadTrack = async (id, title) => {
    requestStoragePermission();
    setDownloading(true);
    const downloadoptions = {
      method: "GET",
      url: "https://spotify-downloader.p.rapidapi.com/SpotifytrackDownloader",
      params: { id: id },
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": apiHost,
      },
    };
    const response = await axios.request(downloadoptions);
    const url = response.data.link;
    const file = await FileSystem.downloadAsync(
      url,
      FileSystem.documentDirectory + title + ".mp3"
    );
    let progress = 0;
    progress = (file.totalBytesWritten / file.totalBytesExpectedToWrite) * 100;
    await MediaLibrary.createAssetAsync(file.uri);
    triggerNotification("Success", "Your song has been downloaded");
    setDownloading(false);
    setDownloaded(true);
  };

  return (
    <TouchableOpacity>
      <ListItem id={id}
      style={{
        paddingHorizontal: 10,
        paddingVertical: 2,
      }}
      >
        <Image
          style={{
            width: 50,
            height: 50,
          }}
          source={{ uri: cover }}
        />
        <ListItem.Content>
          <ListItem.Title style={{ fontWeight: "800" }}>{title}</ListItem.Title>
          <ListItem.Subtitle style={{ color: "grey" }}>
            {artists}
          </ListItem.Subtitle>
        </ListItem.Content>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          onPress={() => {
            downloadTrack(id, title);
          }}
        >
          {downloading ? (
            <ActivityIndicator size="small" color="grey" />
          ) : downloaded ? (
            <Icon name="check" type="material" color="green" />
          ) : (
            <Icon name="download" type="material-community" color="grey" />
          )}
        </TouchableOpacity>
      </ListItem>
    </TouchableOpacity>
  );
};

export default SongItem;
