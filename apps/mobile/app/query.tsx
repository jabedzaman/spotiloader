import { ScrollView } from "@components/scroll-view";
import { TextInput } from "react-native";

export default function Page() {
  return (
    <ScrollView>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 0.2,
          margin: 10,
          paddingHorizontal: 10,
          borderRadius: 5,
        }}
        autoFocus
        placeholder="Search for a track, playlist or album"
      />
    </ScrollView>
  );
}
