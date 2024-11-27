import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

const Traditional = () => {
  return (
    <View style={styles.traditional}>
      <Image
        style={[styles.vectorIcon, styles.vectorIconLayout2]}
        contentFit="cover"
        source={require("../assets/vector.png")}
      />
      <Image
        style={[styles.vectorIcon1, styles.vectorIconLayout2]}
        contentFit="cover"
        source={require("../assets/vector1.png")}
      />
      <Image
        style={[styles.vectorIcon2, styles.vectorIconLayout2]}
        contentFit="cover"
        source={require("../assets/vector2.png")}
      />
      <Image
        style={[styles.vectorIcon3, styles.vectorIconLayout1]}
        contentFit="cover"
        source={require("../assets/vector3.png")}
      />
      <Image
        style={[styles.vectorIcon4, styles.vectorIconPosition]}
        contentFit="cover"
        source={require("../assets/vector4.png")}
      />
      <Image
        style={[styles.vectorIcon5, styles.vectorIconLayout1]}
        contentFit="cover"
        source={require("../assets/vector5.png")}
      />
      <Image
        style={[styles.vectorIcon6, styles.vectorIconPosition]}
        contentFit="cover"
        source={require("../assets/vector6.png")}
      />
      <Image
        style={[styles.vectorIcon7, styles.vectorIconLayout]}
        contentFit="cover"
        source={require("../assets/vector7.png")}
      />
      <Image
        style={[styles.vectorIcon8, styles.vectorIconLayout]}
        contentFit="cover"
        source={require("../assets/vector8.png")}
      />
      <Image
        style={[styles.vectorIcon9, styles.vectorIconLayout2]}
        contentFit="cover"
        source={require("../assets/vector9.png")}
      />
      <Image
        style={[styles.vectorIcon10, styles.vectorIconLayout2]}
        contentFit="cover"
        source={require("../assets/vector10.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  vectorIconLayout2: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  vectorIconLayout1: {
    bottom: "65.42%",
    top: "18.75%",
    width: "31.25%",
    height: "15.83%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  vectorIconPosition: {
    left: "17.08%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  vectorIconLayout: {
    bottom: "10.83%",
    top: "76.67%",
    width: "6.25%",
    maxHeight: "100%",
    maxWidth: "100%",
    height: "12.5%",
    position: "absolute",
    overflow: "hidden",
  },
  vectorIcon: {
    width: "37.5%",
    top: "32.92%",
    right: "31.25%",
    bottom: "54.58%",
    left: "31.25%",
    height: "12.5%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
  },
  vectorIcon1: {
    height: "37.5%",
    width: "43.75%",
    top: "39.17%",
    right: "27.92%",
    bottom: "23.33%",
    left: "28.33%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
  },
  vectorIcon2: {
    height: "29.58%",
    width: "9.58%",
    top: "4.58%",
    right: "45%",
    bottom: "65.83%",
    left: "45.42%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
  },
  vectorIcon3: {
    right: "18.75%",
    left: "50%",
  },
  vectorIcon4: {
    height: "18.75%",
    width: "65.42%",
    top: "29.58%",
    right: "17.5%",
    bottom: "51.67%",
  },
  vectorIcon5: {
    right: "50%",
    left: "18.75%",
  },
  vectorIcon6: {
    height: "25%",
    width: "65.83%",
    top: "70.42%",
    right: "17.08%",
    bottom: "4.58%",
  },
  vectorIcon7: {
    right: "25%",
    left: "68.75%",
  },
  vectorIcon8: {
    right: "68.75%",
    left: "25%",
  },
  vectorIcon9: {
    height: "93.75%",
    width: "68.75%",
    top: "2.92%",
    right: "15.42%",
    bottom: "3.33%",
    left: "15.83%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
  },
  vectorIcon10: {
    height: "20.42%",
    width: "25%",
    top: "48.33%",
    right: "37.5%",
    bottom: "31.25%",
    left: "37.5%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
  },
  traditional: {
    width: 24,
    height: 24,
    overflow: "hidden",
  },
});

export default Traditional;
