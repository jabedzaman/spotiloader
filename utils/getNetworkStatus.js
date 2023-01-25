import * as Network from "expo-network";

const getNetworkStatus = async () => {
  const networkState = await Network.getNetworkStateAsync();
  return networkState;
};

export default getNetworkStatus;
