import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { FontSize, FontFamily, Color } from "../GlobalStyles";

const StatusBar1 = () => {
  return (
    <View style={styles.statusBar}>
      <View style={[styles.action, styles.timeLayout]}>
        <Text style={[styles.time, styles.timeLayout]}>9:41</Text>
      </View>
      <View style={[styles.container, styles.containerPosition]}>
        <Image
          style={[styles.batteryIcon, styles.containerPosition]}
          contentFit="cover"
          source={require("../assets/battery.png")}
        />
        <Image
          style={styles.combinedShapeIcon}
          contentFit="cover"
          source={require("../assets/combined-shape.png")}
        />
        <Image
          style={styles.wiFiIcon}
          contentFit="cover"
          source={require("../assets/wifi3.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  timeLayout: {
    width: 54,
    position: "absolute",
  },
  containerPosition: {
    height: 12,
    top: "50%",
    position: "absolute",
  },
  time: {
    left: 0,
    fontSize: FontSize.size_mini,
    letterSpacing: 0,
    lineHeight: 18,
    fontWeight: "600",
    fontFamily: FontFamily.sFProText,
    color: Color.primaryBlack0,
    textAlign: "center",
    top: 0,
  },
  action: {
    top: 14,
    left: 20,
    height: 18,
  },
  batteryIcon: {
    marginTop: -5.75,
    right: 0,
    width: 25,
  },
  combinedShapeIcon: {
    width: 17,
    height: 11,
  },
  wiFiIcon: {
    width: 15,
    height: 11,
  },
  container: {
    marginTop: -5.8,
    right: 15,
    width: 67,
  },
  statusBar: {
    marginLeft: -187,
    left: "50%",
    width: 375,
    height: 44,
    top: 0,
    position: "absolute",
  },
});

export default StatusBar1;
