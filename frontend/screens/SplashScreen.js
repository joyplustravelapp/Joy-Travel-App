import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import StatusBarwhite from "../components/StatusBarwhite";
import { Border, Color } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/core";

const SplashScreen = () => {
  const navigator = useNavigation();

  React.useEffect(() => {
    setTimeout(() => {
      navigator.navigate("Onboarding2");
    }, 3000);
  });

  return (
    <View style={styles.splashScreen}>
      <Image
        style={styles.img42311Icon}
        contentFit="cover"
        source={require("../assets/img-4231-11.png")}
      />
      <StatusBarwhite
        signalIcon={require("../assets/signal-icon.png")}
        wifi={require("../assets/wifi4.png")}
        buttary={require("../assets/buttary.png")}
        visualsofdanaSKTSGbqeUnspIconMarginLeft={-197}
        visualsofdanaSKTSGbqeUnspIconLeft="50%"
        visualsofdanaSKTSGbqeUnspIconWidth={393}
        visualsofdanaSKTSGbqeUnspIconRight="unset"
        signalIconColor="#000"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  img42311Icon: {
    margin: "auto",
    borderRadius: Border.br_xl,
    width: "25%",
    height: "15%",
  },
  splashScreen: {
    backgroundColor: Color.primaryBlack0,
    flex: 1,
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
});

export default SplashScreen;
