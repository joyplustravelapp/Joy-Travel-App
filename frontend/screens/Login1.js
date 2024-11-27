import * as React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
} from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import StatusBarwhite from "../components/StatusBarwhite";
import NavBarTextOnlyOne from "../components/NavBarTextOnlyOne";
import FrameComponent4 from "../components/FrameComponent4";
import { Border, Color } from "../GlobalStyles";

const Login1 = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  // Calculate responsive dimensions
  const logoSize = width * 0.21; // 21% of screen width
  const backIconSize = width * 0.067; // ~6.7% of screen width
  const logoLeftPosition = width * 0.1; // 10% of screen width

  const handleBackPress = () => {
    navigation?.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBarwhite
        signalIcon={require("../assets/signal-icon.png")}
        wifi={require("../assets/wifi.png")}
        buttary={require("../assets/buttary1.png")}
        visualsofdanaSKTSGbqeUnspIconMarginLeft={-197}
        visualsofdanaSKTSGbqeUnspIconLeft="50%"
        visualsofdanaSKTSGbqeUnspIconWidth={393}
        visualsofdanaSKTSGbqeUnspIconRight="unset"
        signalIconColor="#000"
      /> */}

      <NavBarTextOnlyOne />

      <View style={styles.contentContainer}>
        {/* Logo Image */}
        <View
          style={[
            styles.logoContainer,
            {
              left: "50%",
              transform: [{ translateX: -42 }],
              top: height * 0.23, // 23% of screen height
            },
          ]}
        >
          <Image
            style={[
              styles.logoImage,
              {
                width: logoSize,
                height: logoSize,
              },
            ]}
            contentFit="cover"
            source={require("../assets/img-4231-1.png")}
          />
        </View>

        {/* Main Content */}
        <FrameComponent4 />

        {/* Back Button */}
        <TouchableOpacity
          style={[
            styles.backButton,
            {
              top: Platform.OS === "ios" ? insets.top + 10 : 20,
              width: backIconSize,
              height: backIconSize * 1.84, // Maintain aspect ratio
            },
          ]}
          onPress={handleBackPress}
          activeOpacity={0.7}
        >
          <Image
            style={styles.backIcon}
            contentFit="cover"
            source={require("../assets/angleleft.png")}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.primaryBlack0,
  },
  contentContainer: {
    flex: 1,
    width: "100%",
    position: "relative",
  },
  logoContainer: {
    position: "absolute",
    zIndex: 1,
  },
  logoImage: {
    borderRadius: Border.br_xl,
  },
  backButton: {
    position: "absolute",
    left: 24,
    zIndex: 2,
  },
  backIcon: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
});

export default Login1;
