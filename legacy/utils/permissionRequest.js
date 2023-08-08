import * as Permissions from "expo-permissions";

const requestMediaLibraryPermission = async () => {
  const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
  if (status !== "granted") {
    alert("Sorry, we need camera roll permissions to make this work!");
  }
};

export default requestMediaLibraryPermission;

// Path: utils/permissionRequest.js
