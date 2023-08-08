import AsyncStorage from "@react-native-async-storage/async-storage";

async function saveRecentSearch(searchTerm) {
    try {
      const recentSearches = await AsyncStorage.getItem("recentSearches");
      let searches = [];
      if (recentSearches) {
        searches = JSON.parse(recentSearches);
      }
      searches.unshift(searchTerm);
      await AsyncStorage.setItem("recentSearches", JSON.stringify(searches));
    } catch (error) {
      console.error(error);
    }
  }

    export default saveRecentSearch;