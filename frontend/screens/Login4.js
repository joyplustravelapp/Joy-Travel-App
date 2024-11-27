import * as React from "react";
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  SafeAreaView,
  Platform,
  useWindowDimensions,
} from "react-native";
import NavBarTextOnlyOne from "../components/NavBarTextOnlyOne";
import StatusBarwhite from "../components/StatusBarwhite";
import Button1 from "../components/Button1";

// Constants for theming and responsive calculations
const THEME = {
  colors: {
    background: "#2F4F4F", // darkslategray
    primary: "#000000",
    text: {
      primary: "#FFFFFF",
      secondary: "rgba(255, 255, 255, 0.8)",
    },
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
  },
  typography: {
    heading: {
      fontSize: Platform.select({ ios: 29, android: 27 }),
      lineHeight: Platform.select({ ios: 40, android: 36 }),
      fontFamily: Platform.select({
        ios: "Poppins-Bold",
        android: "Poppins-Bold",
      }),
      fontWeight: "700",
    },
    body: {
      fontSize: Platform.select({ ios: 14, android: 14 }),
      lineHeight: Platform.select({ ios: 20, android: 20 }),
      fontFamily: Platform.select({
        ios: "Poppins-Regular",
        android: "Poppins-Regular",
      }),
    },
  },
};

const Login4 = () => {
  // Using React Native's built-in hook for window dimensions
  const { width, height } = useWindowDimensions();

  // Responsive calculations
  const containerPadding = width * 0.08; // 8% of screen width
  const contentWidth = width * 0.84; // 84% of screen width
  const contentHeight = height * 0.43; // 43% of screen height

  return (
    <SafeAreaView style={styles.container}>
      <NavBarTextOnlyOne />
      <StatusBarwhite
        signalIcon={require("../assets/signal-icon1.png")}
        wifi={require("../assets/wifi2.png")}
        buttary={require("../assets/buttary2.png")}
        visualsofdanaSKTSGbqeUnspIconMarginLeft="unset"
        visualsofdanaSKTSGbqeUnspIconLeft="1%"
        visualsofdanaSKTSGbqeUnspIconWidth="97.76%"
        visualsofdanaSKTSGbqeUnspIconRight="1.24%"
        signalIconColor={THEME.colors.text.primary}
      />

      <View
        style={[styles.content, { width: contentWidth, height: contentHeight }]}
      >
        <View style={styles.messageContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.heading}>
              You successfully{"\n"}created your profile
            </Text>
            <Text style={styles.subText}>
              You can now explore any destination you want. Enjoy your trips!
            </Text>
          </View>

          <Button1
            next="Let's Explore"
            propBackgroundColor={THEME.colors.text.primary}
            propColor={THEME.colors.primary}
            propAlignSelf="stretch"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  content: {
    position: "absolute",
    top: "44%",
    alignSelf: "center",
    justifyContent: "center",
  },
  messageContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: THEME.spacing.xl,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: THEME.spacing.xl,
  },
  heading: {
    ...THEME.typography.heading,
    color: THEME.colors.text.primary,
    textAlign: "center",
    marginBottom: THEME.spacing.m,
  },
  subText: {
    ...THEME.typography.body,
    color: THEME.colors.text.secondary,
    textAlign: "center",
    paddingHorizontal: THEME.spacing.m,
  },
});

export default Login4;
