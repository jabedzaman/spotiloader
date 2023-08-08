import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Button, Icon, Overlay, SearchBar, Text } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./components/Header";
import axios from "axios";
import secrets from "../config/apikey.config";
import { ActivityIndicator, Alert, ScrollView, View } from "react-native";
import SongItem from "./components/SongItem";
import KeywordItem from "./components/KeywordItem";
import YoutubeItem from "./components/YoutubeItem";
import SpotifyTrack from "./components/SpotifyTrack";
import saveRecentSearch from "../utils/saveRecentSearch";
import * as Network from "expo-network";
import Hero from "./components/Hero";

const Home = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [networkStatus, setNetworkStatus] = useState(true);
  const [tracklist, setTracklist] = useState([]);
  const [searchItem, setSearchItem] = useState([]);
  const [ytSearchItem, setYtSearchItem] = useState([]);
  const [spotifyTrack, setSpotifyTrack] = useState([]);
  const [spotifyTrackdownloadurl, setSpotifyTrackdownloadurl] = useState([]);

  const getNetworkStatus = async () => {
    const networkState = await Network.getNetworkStateAsync();
    setNetworkStatus(networkState.isInternetReachable);
  };

  const getSpotifyPlaylist = async () => {
    setLoading(true);
    const trackoptions = {
      method: "GET",
      url: "https://spotify-downloader.p.rapidapi.com/SpotifyDownloaderV2",
      params: { url: input },
      headers: {
        "X-RapidAPI-Key": secrets.apikey,
        "X-RapidAPI-Host": secrets.apihost,
      },
    };
    try {
      clearTracks();
      const response = await axios.request(trackoptions);
      setTracklist(response.data.trackList);
      setInput("");
      setLoading(false);
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
      setLoading(false);
    }
  };

  const searchKeyword = async () => {
    clearTracks();
    setLoading(true);
    const uri = `https://saavn.me/search/songs?query=${input}`.replace(
      / /g,
      "+"
    );
    const response = await axios.get(uri);
    setSearchItem(response.data.data.results);
    setInput("");
    setLoading(false);
  };

  const clearTracks = () => {
    setTracklist([]);
    setSearchItem([]);
    setYtSearchItem([]);
    setSpotifyTrack([]);
  };

  const ytdlItem = async () => {
    setLoading(true);
    clearTracks();
    try {
      const response = await axios.get(
        `https://ytdlapi.jabed.me/info?url=${input}`
      );
      setYtSearchItem(response.data.embedinfo);
      setLoading(false);
    } catch (error) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 5000);
      setLoading(false);
    }
  };

  const getSpotifyTrack = async () => {
    setLoading(true);
    const trackoptions = {
      method: "GET",
      url: "https://spotify-downloader.p.rapidapi.com/SpotifyDownloaderV2",
      params: { url: input },
      headers: {
        "X-RapidAPI-Key": secrets.apikey,
        "X-RapidAPI-Host": secrets.apihost,
      },
    };
    try {
      clearTracks();
      const response = await axios.request(trackoptions);
      setSpotifyTrack(response.data.metadata);
      setSpotifyTrackdownloadurl(response.data.link);
      setInput("");
      setLoading(false);
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <StatusBar style="dark" />
      <ScrollView>
        <Header />
        <SearchBar
          placeholder="Enter Keyword or Playlist URL ..."
          lightTheme={true}
          round={true}
          containerStyle={{
            backgroundColor: "transparent",
            borderTopWidth: 0,
            borderBottomWidth: 0,
            marginVertical: 20,
          }}
          inputContainerStyle={{
            backgroundColor: "white",
            borderRadius: 30,
          }}
          inputStyle={{
            fontSize: 16,
          }}
          value={input}
          onChangeText={(text) => {
            setInput(text);
          }}
          onSubmitEditing={() => {
            getNetworkStatus();
            if (input.includes("open.spotify.com/track/")) {
              saveRecentSearch(input);
              getSpotifyTrack();
            } else if (input.includes("open.spotify.com/playlist/")) {
              saveRecentSearch(input);
              getSpotifyPlaylist();
            } else if (input.includes("youtube" || "youtu.be")) {
              saveRecentSearch(input);
              ytdlItem();
            } else {
              searchKeyword();
            }
          }}
        />
        <View>
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
          {searchItem &&
            searchItem?.map((result, key) => (
              <KeywordItem
                key={key}
                name={result.name}
                cover={result.image[2].link}
                primaryArtists={result.primaryArtists}
                downloadUrl={result.downloadUrl}
              />
            ))}
          {ytSearchItem.title && (
            <YoutubeItem
              title={ytSearchItem.title}
              author_name={ytSearchItem.author_name}
              thumbnail_url={ytSearchItem.thumbnail_url}
              link={input}
            />
          )}
          {spotifyTrack.title && (
            <SpotifyTrack
              title={spotifyTrack.title}
              artists={spotifyTrack.artists}
              cover={spotifyTrack.cover}
              downloadlink={spotifyTrackdownloadurl}
            />
          )}
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
        </View>
        {!tracklist.length &&
          !searchItem.length &&
          !ytSearchItem.title &&
          !spotifyTrack.title &&
          !input && <Hero />}
        {!networkStatus && (
          <Overlay
            onBackdropPress={() => {
              setNetworkStatus(true);
            }}
          >
            <Icon name="wifi" size={100} color="gray" />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginTop: 10,
                marginHorizontal: 20,
                marginBottom: 20,
              }}
            >
              No Internet Connection
            </Text>
            <Button
              title="Retry"
              onPress={() => {
                getNetworkStatus();
              }}
            />
          </Overlay>
        )}
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
