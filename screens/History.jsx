import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon, ListItem } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import * as Clipboard from "expo-clipboard";

const History = ({navigation}) => {
  const [searches, setSearches] = useState([]);
  async function loadAndDisplayRecentSearches() {
    try {
      const recentSearches = await AsyncStorage.getItem("recentSearches");
      const searches = recentSearches ? JSON.parse(recentSearches) : [];
      setSearches(searches);
    } catch (error) {
      Alert.alert("Error", error.message || "Something went wrong");
    }
  }
  const copyToClipboard = async (text) => {
    await Clipboard.setStringAsync(text);
    Alert.alert("Copied to Clipboard!", text);
  };
  loadAndDisplayRecentSearches();
  return (
    <SafeAreaView>
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          width: "40%",
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
          }}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back-ios" type="material" />
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              fontStyle: "italic",
              marginLeft: 10,
            }}
          >
            History
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View
          style={{
            marginHorizontal: 10,
          }}
        >
          {searches.length > 0 && (
            <TouchableOpacity onPress={() => AsyncStorage.clear()}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  alignSelf: "flex-end",
                  marginVertical: 10,
                }}
              >
                <Icon name="delete" type="material" />
                <Text>Clear History</Text>
              </View>
            </TouchableOpacity>
          )}

          {searches.length === 0 && (
            <View
              style={{
                height: 300,
                justifyContent: "center",
              }}
            >
              <Icon
                name="history"
                type="material"
                size={100}
                color="grey"
                containerStyle={{
                  alignSelf: "center",
                }}
              />
              <Text
                style={{
                  alignSelf: "center",
                  fontSize: 20,
                  color: "grey",
                }}
              >
                No History
              </Text>
            </View>
          )}
          {searches.map((search, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                copyToClipboard(search);
              }}
            >
              <ListItem
                style={{
                  marginVertical: 2,
                  borderRadius: 40,
                }}
              >
                <ListItem.Content
                  style={{
                    fontSize: 22,
                    fontWeight: "bold",
                    fontStyle: "italic",
                    marginLeft: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      marginLeft: 10,
                      color: "lightblue",
                      textDecorationLine: "underline",
                    }}
                  >
                    {search}
                  </Text>
                </ListItem.Content>
              </ListItem>
            </TouchableOpacity>
          ))}
        </View>
        <View
          style={{
            height: 100,
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default History;
