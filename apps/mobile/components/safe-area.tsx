import { useThemeColor } from "@/hooks/useThemeColor";
import {
  SafeAreaView as SafeAreaViewBase,
  SafeAreaViewProps,
} from "react-native-safe-area-context";

export type ThemedViewProps = SafeAreaViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function SafeAreaView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <SafeAreaViewBase
      style={[
        { backgroundColor },
        style,
        {
          flex: 1,
        },
      ]}
      {...otherProps}
    />
  );
}
