import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import {
  Button,
  Icon,
  Image,
  ListItem,
  Overlay,
  SearchBar,
} from "react-native-elements";
import axios from "axios";
import SongItem from "../components/SongItem";
import Header from "../components/Header";
import { StatusBar } from "expo-status-bar";
import getNetworkStatus from "../utils/getNetworkStatus";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import permissionRequest from "../utils/permissionRequest";
import secrets from "../config/apikey.config";
import { Picker } from "@react-native-picker/picker";
import { Alert } from "react-native";

const Home = () => {
  const [input, setInput] = useState("");
  const [tracklist, setTracklist] = useState([]);
  const [track, setTrack] = useState([]);
  const [info, setInfo] = useState([]);
  const [downloadlink, setDownloadlink] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const networkStatus = getNetworkStatus();
  const apiKey = secrets.apikey;
  const apiHost = secrets.apihost;

  const trackoptions = {
    method: "GET",
    url: "https://spotify-downloader.p.rapidapi.com/SpotifyDownloaderV2",
    params: { url: input },
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": apiHost,
    },
  };

  const getTracklist = async () => {
    if (selectedValue === "1") {
      getSpotifyPlaylist();
    } else if (selectedValue === "2") {
      getYoutbeTrack();
    } else {
      Alert.alert("WARNING!!", "Must select a source");
    }
  };

  const getSpotifyPlaylist = async () => {
    if (!networkStatus) {
      setNetworkError(true);
      return;
    }
    try {
      setLoading(true);
      const response = await axios.request(trackoptions);
      setTrack(response.data.metadata);
      setDownloadlink(response.data.link);
      setTracklist(response.data.trackList);
      setLoading(false);
      setInput("");
    } catch (error) {
      setError(true);
      console.log(error);
      setTimeout(() => {
        setError(false);
      }, 5000);
      setLoading(false);
    }
  };

  const getYoutbeTrack = async () => {
    if (!networkStatus) {
      setNetworkError(true);
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(
        `https://ytdlapi.jabed.me/info?url=${input}`
      );
      console.log(response.data.embedinfo);
      setInfo(response.data.embedinfo);
      setLoading(false);
    } catch (error) {
      setError(true);
      console.log(error);
      setTimeout(() => {
        setError(false);
      }, 5000);
      setLoading(false);
    }
  };

  const saveytTrack = async (uri, title) => {
    if (!networkStatus) {
      setNetworkError(true);
      return;
    }
    permissionRequest();
    setDownloading(true);
    const file = await FileSystem.downloadAsync(
      `https://ytdlapi.jabed.me/download?url=${uri}`,
      FileSystem.documentDirectory + `download.mp3`
    );
    setDownloading(false);
    await MediaLibrary.createAssetAsync(file.uri);
    setDownloaded(true);
  };

  const saveTrack = async (uri, title) => {
    if (!networkStatus) {
      setNetworkError(true);
      return;
    }
    permissionRequest();
    setDownloading(true);
    const file = await FileSystem.downloadAsync(
      uri,
      FileSystem.documentDirectory + title + ".mp3"
    );
    setDownloading(false);
    await MediaLibrary.createAssetAsync(file.uri);
    setDownloaded(true);
  };

  const clearTracks = () => {
    setTracklist([]);
    setTrack([]);
  };

  return (
    <SafeAreaView>
      <StatusBar style="dark" />
      <Header />
      <ScrollView>
        <View style={{ marginVertical: 25 }}>
          <SearchBar
            placeholder="Type Here..."
            lightTheme={true}
            round={true}
            containerStyle={{
              backgroundColor: "transparent",
              borderTopWidth: 0,
              borderBottomWidth: 0,
            }}
            inputContainerStyle={{
              backgroundColor: "white",
              borderRadius: 30,
            }}
            inputStyle={{
              fontSize: 16,
            }}
            value={input}
            onChangeText={(text) => setInput(text)}
          />
          <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue) => setSelectedValue(itemValue)}
            style={{
              marginHorizontal: 20,
            }}
          >
            <Picker.Item label="Select Source" value="0" />
            <Picker.Item label="Spotify" value="1" />
            <Picker.Item label="Youtube" value="2" />
          </Picker>
        </View>
        <View>
          {error && (
            <Text style={{ color: "red", textAlign: "center" }}>
              Something Went Wrong
            </Text>
          )}
        </View>

        <Button
          type="solid"
          title={
            tracklist?.length > 0 && !track && !input
              ? "       Clear tracks      "
              : "        Get tracks        "
          }
          disabled={!input && !tracklist?.length > 0}
          buttonStyle={{
            backgroundColor: "green",
            borderWidth: 2,
            borderColor: "white",
            borderRadius: 30,
            alignItems: "center",
            marginBottom: 20,
          }}
          containerStyle={{
            width: 500,
            alignSelf: "center",
            alignItems: "center",
          }}
          onPress={tracklist?.length > 0 && !input ? clearTracks : getTracklist}
        />
        {!tracklist?.length > 0 && !track && (
          <View>
            <Text
              style={{
                textAlign: "center",
                fontSize: 14,
              }}
            >
              No tracks to display
            </Text>
          </View>
        )}

        {networkError && (
          <Overlay>
            <Text style={{ textAlign: "center" }}>
              Please check your internet connection and try again
            </Text>
            <Button
              type="clear"
              title="Close"
              onPress={() => setNetworkError(false)}
            />
          </Overlay>
        )}

        <View
          style={{
            height: 10,
          }}
        ></View>
        <View>
          <View
            style={{
              display: loading ? "flex" : "none",
              justifyContent: "center",
              alignItems: "center",
              height: 100,
            }}
          >
            <ActivityIndicator size="large" color="green" />
          </View>
          <View
            style={{
              padding: 10,
              borderRadius: 10,
            }}
          >
            {tracklist &&
              tracklist?.map((track, key) => (
                <SongItem
                  key={key}
                  id={track.id}
                  title={track.title}
                  cover={track.cover}
                  artists={track.artists}
                />
              ))}
            {info?.title && (
              <View
                style={{
                  padding: 10,
                  borderRadius: 10,
                }}
              >
                <TouchableOpacity>
                  <ListItem>
                    <Image
                      source={{ uri: info?.thumbnail_url }}
                      style={{ width: 50, height: 50, alignSelf: "center" }}
                    />
                    <ListItem.Content>
                      <ListItem.Title style={{ fontWeight: "800" }}>
                        {info?.title}
                      </ListItem.Title>
                      <ListItem.Subtitle
                        style={{
                          color: "grey",
                        }}
                      >
                        {info?.author_name}
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
                          onPress={() => saveytTrack(input, info?.title)}
                        />
                      )}
                    </TouchableOpacity>
                  </ListItem>
                </TouchableOpacity>
              </View>
            )}
            {track?.title && (
              <View
                style={{
                  padding: 10,
                  borderRadius: 10,
                }}
              >
                <TouchableOpacity>
                  <ListItem>
                    <Image
                      source={{ uri: track?.cover }}
                      style={{ width: 50, height: 50, alignSelf: "center" }}
                    />
                    <ListItem.Content>
                      <ListItem.Title style={{ fontWeight: "800" }}>
                        {track?.title}
                      </ListItem.Title>
                      <ListItem.Subtitle
                        style={{
                          color: "grey",
                        }}
                      >
                        {track?.artists}
                      </ListItem.Subtitle>
                    </ListItem.Content>
                    <TouchableOpacity>
                      {downloading ? (
                        <ActivityIndicator size="small" color="grey" />
                      ) : downloaded ? (
                        <Icon name="check" type="material" color="green" />
                      ) : (
                        <Icon
                          onPress={() => saveTrack(downloadlink, track?.title)}
                          name="download"
                          type="material-community"
                          color="grey"
                        />
                      )}
                    </TouchableOpacity>
                  </ListItem>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
