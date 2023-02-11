import { ActivityIndicator, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Icon, Image, ListItem } from "react-native-elements";
import requestStoragePermission from "../../utils/permissionRequest";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import triggerNotification from "../../utils/triggerNotification";
import AsyncStorage from "@react-native-async-storage/async-storage";

const KeywordItem = ({ cover, name, primaryArtists, downloadUrl }) => {
  const [downloaded, setDownloaded] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [quality, setQuality] = useState("320kbps");
  const download = async (url) => {
    requestStoragePermission();
    setDownloading(true);
    const file = await FileSystem.downloadAsync(
      url,
      FileSystem.documentDirectory + name + ".mp3"
    );
    await MediaLibrary.createAssetAsync(file.uri);
    setDownloading(false);
    setDownloaded(true);
    triggerNotification("Downloaded", name + " has been downloaded");
  };
  const loadQuality = async () => {
    try {
      const value = await AsyncStorage.getItem("quality");
      if (value !== null) {
        setQuality(value);
      }
    } catch (e) {
      console.log(e);
    }
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
          source={{ uri: cover }}
          style={{ width: 50, height: 50, alignSelf: "center" }}
        />
        <ListItem.Content>
          <ListItem.Title style={{ fontWeight: "800" }}>{name}</ListItem.Title>
          <ListItem.Subtitle
            style={{
              color: "grey",
            }}
          >
            {primaryArtists}
          </ListItem.Subtitle>
        </ListItem.Content>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          onPress={() => {
            loadQuality();
            if (quality === "320kbps") {
              download(downloadUrl[4].link);
            } else if (quality === "160kbps") {
              download(downloadUrl[3].link);
            } else if (quality === "96kbps") {
              download(downloadUrl[2].link);
            }
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

export default KeywordItem;
