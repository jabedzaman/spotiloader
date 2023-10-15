import * as React from "react";
import { SplashScreen, Stack } from "expo-router";

import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular,
  });

  React.useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
            headerShown: false,
        }}
      />
    </Stack>
  );
}
