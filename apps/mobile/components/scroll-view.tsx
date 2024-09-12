import { ScrollView as ScrollViewBase, ScrollViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedViewProps = ScrollViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ScrollView({
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
    <ScrollViewBase style={[{ backgroundColor }, style]} {...otherProps} />
  );
}
