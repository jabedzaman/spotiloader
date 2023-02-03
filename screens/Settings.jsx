import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Share,
  Linking,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Button, Icon, ListItem, Overlay, Text } from "react-native-elements";
import config from "../config/app.config";
import { StatusBar } from "expo-status-bar";

const Info = () => {
  const [visible, setVisible] = useState(false);
  const Navigation = useNavigation();
  const appShareUrl = config.downloadUrl;
  const githubUrl = config.githubUrl;
  const shareApp = () => {
    Share.share({
      message: `Hey, check out this awesome app to download songs from Spotify! \n${appShareUrl}`,
    });
  };
  async function openInBrowser(url) {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <SafeAreaView>
      <StatusBar style="dark" />
      {Platform.OS === "android" && (
        <View
          style={{
            marginVertical: 25,
          }}
        />
      )}
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
          onPress={() => Navigation.goBack()}
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
            Settings
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          borderRadius: 20,
        }}
      >
        <ListItem onPress={() => Navigation.navigate("About")}>
          <Icon
            name="person"
            type="material"
            color="#000"
            style={{ marginRight: 10 }}
          />
          <ListItem.Content>
            <ListItem.Title style={{ fontWeight: "700" }}>About</ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem onPress={shareApp}>
          <Icon
            name="share"
            type="material"
            color="#000"
            style={{ marginRight: 10 }}
          />
          <ListItem.Content>
            <ListItem.Title style={{ fontWeight: "700" }}>
              Share with friends
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem
          onPress={() =>
            openInBrowser(
              githubUrl +
                "/issues/new?assignees=&labels=bug&template=bug_report.md&title="
            )
          }
        >
          <Icon
            name="bug"
            type="font-awesome"
            style={{ marginRight: 10 }}
            color="#000"
          />
          <ListItem.Content>
            <ListItem.Title style={{ fontWeight: "700" }}>
              Report a bug
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem
          onPress={() =>
            openInBrowser(
              githubUrl +
                "/issues/new?assignees=&labels=enhancement&template=feature_request.md&title="
            )
          }
        >
          <Icon
            name="mail-outline"
            type="material"
            style={{ marginRight: 10 }}
            color="#000"
          />
          <ListItem.Content>
            <ListItem.Title style={{ fontWeight: "700" }}>
              Feedback and suggestions
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </View>
      <View
        style={{
          marginTop: 20,
          paddingHorizontal: 20,
          borderRadius: 20,
        }}
      >
        <ListItem
          onPress={() => {
            setVisible(true);
          }}
        >
          <Icon
            name="payment"
            type="material"
            color="#000"
            style={{ marginRight: 10 }}
          />
          <ListItem.Content>
            <ListItem.Title style={{ fontWeight: "700" }}>
              Support
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </View>
      <Overlay
        isVisible={visible}
        onBackdropPress={() => {
          setVisible(false);
        }}
        overlayStyle={{
          padding: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Icon name="attach-money" type="material" size={26} color="#000" />
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
            }}
          >
            Support
          </Text>
        </View>
        <Text
          style={{
            fontSize: 14,
          }}
        >
          If you like this app, please consider supporting the developer
        </Text>
        <View>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 20,
            }}
            onPress={() => openInBrowser(config.patreonUrl)}
          >
            <Icon
              type="material-community"
              name="patreon"
              size={26}
              color="#000"
              style={{ marginRight: 10 }}
            />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              Patreon
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 20,
              justifyContent: "space-between",
            }}
          >
            <Button
              title="   Remind me later   "
              type="clear"
              onPress={() => setVisible(false)}
            />
          </View>
        </View>
      </Overlay>
    </SafeAreaView>
  );
};

export default Info;
