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
import SongItem from "./components/SongItem";
import Header from "./components/Header";
import { StatusBar } from "expo-status-bar";
import getNetworkStatus from "../utils/getNetworkStatus";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import permissionRequest from "../utils/permissionRequest";
import secrets from "../config/apikey.config";
import { Picker } from "@react-native-picker/picker";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import saveRecentSearch from "../utils/saveRecentSearch";
import triggerNotification from "../utils/triggerNotification";

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
  const [results, setResults] = useState([]);
  const networkStatus = getNetworkStatus();
  const [quality, setQuality] = useState("320kbps");
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

  const download = async (url, title) => {
    Alert.alert("Downloading", "Downloading " + title);
    const file = await FileSystem.downloadAsync(
      url,
      FileSystem.documentDirectory + title + ".mp3"
    );
    await MediaLibrary.createAssetAsync(file.uri);
    triggerNotification("Downloaded", title + " has been downloaded");
  };

  const getTracklist = async () => {
    if (selectedValue === "2") {
      getSpotifyPlaylist();
      saveRecentSearch(input);
    } else if (selectedValue === "3") {
      getYoutbeTrack();
      saveRecentSearch(input);
    } else if (selectedValue === "1") {
      searchApi();
      saveRecentSearch(input);
    } else {
      Alert.alert("WARNING!!", "Must select a source");
      saveRecentSearch(input);
    }
  };

  const searchApi = async () => {
    const uri = `https://saavn.me/search/songs?query=${input}`.replace(
      / /g,
      "+"
    );
    const response = await axios.get(uri);
    setResults(response.data.data.results);
    console.log(response.data.data.results);
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
      setInfo(response.data.embedinfo);
      setLoading(false);
    } catch (error) {
      setError(true);
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

  // const downloadtest = async (downloadUrl, tittle) => {
  //   loadQuality();
  //   if (quality === "320kbps") {
  //     download(downloadUrl, track.title);
  //   } else if (quality === "160kbps") {
  //     Alert.alert("WARNING!!", "Must select a 160");
  //   } else if (quality === "96kbps") {
  //     Alert.alert("WARNING!!", "Must select a 96");
  //   }
  // };

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
            <Picker.Item label="Search Keyword" value="1" />
            <Picker.Item label="Spotify" value="2" />
            <Picker.Item label="Youtube" value="3" />
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

            {results?.length > 0 && (
              <View>
                {results?.map((result, key) => (
                  <View key={key}>
                    <TouchableOpacity>
                      <ListItem>
                        <Image
                          source={{ uri: result.image[2].link }}
                          style={{ width: 50, height: 50, alignSelf: "center" }}
                        />
                        <ListItem.Content>
                          <ListItem.Title style={{ fontWeight: "800" }}>
                            {result.name}
                          </ListItem.Title>
                          <ListItem.Subtitle
                            style={{
                              color: "grey",
                            }}
                          >
                            {result.primaryArtists}
                          </ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Chevron
                          onPress={() => {
                            loadQuality();
                            if (quality === "320kbps") {
                              console.log(result.downloadUrl[4].link);
                              download(result.downloadUrl[4].link, result.name);
                            } else if (quality === "160kbps") {
                              console.log(result.downloadUrl[3].link);
                              download(result.downloadUrl[3].link, result.name);
                            } else if (quality === "96kbps") {
                              console.log(result.downloadUrl[2].link);
                              download(result.downloadUrl[2].link, result.name);
                            }
                          }}
                        />
                      </ListItem>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
