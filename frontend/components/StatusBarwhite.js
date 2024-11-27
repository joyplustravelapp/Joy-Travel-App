import React, { useMemo } from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, ImageSourcePropType } from "react-native";
import { FontSize, FontFamily, Color } from "../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const StatusBarwhite = ({
  signalIcon,
  wifi,
  buttary,
  visualsofdanaSKTSGbqeUnspIconMarginLeft,
  visualsofdanaSKTSGbqeUnspIconLeft,
  visualsofdanaSKTSGbqeUnspIconWidth,
  visualsofdanaSKTSGbqeUnspIconRight,
  signalIconColor,
}) => {
  const statusBarwhiteStyle = useMemo(() => {
    return {
      ...getStyleValue("marginLeft", visualsofdanaSKTSGbqeUnspIconMarginLeft),
      ...getStyleValue("left", visualsofdanaSKTSGbqeUnspIconLeft),
      ...getStyleValue("width", visualsofdanaSKTSGbqeUnspIconWidth),
      ...getStyleValue("right", visualsofdanaSKTSGbqeUnspIconRight),
    };
  }, [
    visualsofdanaSKTSGbqeUnspIconMarginLeft,
    visualsofdanaSKTSGbqeUnspIconLeft,
    visualsofdanaSKTSGbqeUnspIconWidth,
    visualsofdanaSKTSGbqeUnspIconRight,
  ]);

  const textStyle = useMemo(() => {
    return {
      ...getStyleValue("color", signalIconColor),
    };
  }, [signalIconColor]);

  return (
    <View
      style={[
        styles.statusBarwhite,
        styles.statusBarwhitePosition,
        statusBarwhiteStyle,
      ]}
    >
      <Image
        style={[styles.visualsofdanaS5ktsg6bqe0UnspIcon, styles.iconLayout]}
        contentFit="cover"
        source
      />
      <View style={styles.statusBarWhitePosition}>
        <Image
          style={[styles.backgroundIcon, styles.statusBarWhitePosition]}
          contentFit="cover"
          source={require("../assets/background.png")}
        />
        <Text style={[styles.text, textStyle]}>9:41</Text>
        <Image
          style={styles.signalIcon}
          contentFit="cover"
          source={signalIcon}
        />
        <Image style={styles.wifiIcon} contentFit="cover" source={wifi} />
        <Image
          style={[styles.buttaryIcon, styles.iconLayout]}
          contentFit="cover"
          source={buttary}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statusBarwhitePosition: {
    top: "0%",
    position: "absolute",
  },
  iconLayout: {
    maxHeight: "100%",
    overflow: "hidden",
    maxWidth: "100%",
  },
  statusBarWhitePosition: {
    left: "0%",
    bottom: "0%",
    right: "0%",
    width: "100%",
    height: "100%",
    top: "0%",
    position: "absolute",
  },
  visualsofdanaS5ktsg6bqe0UnspIcon: {
    height: "1936.36%",
    width: "149.62%",
    right: "-7.63%",
    bottom: "-1836.36%",
    left: "-41.98%",
    display: "none",
    top: "0%",
    position: "absolute",
  },
  backgroundIcon: {
    maxHeight: "100%",
    overflow: "hidden",
    maxWidth: "100%",
  },
  text: {
    top: 14,
    left: 34,
    fontSize: FontSize.size_mid,
    letterSpacing: -1,
    fontWeight: "600",
    fontFamily: FontFamily.sFProText,
    color: Color.lightInk,
    textAlign: "center",
    position: "absolute",
  },
  signalIcon: {
    width: 18,
    height: 11,
  },
  wifiIcon: {
    width: 17,
    height: 13,
  },
  buttaryIcon: {
    height: "27.5%",
    width: "6.59%",
    top: "37.95%",
    right: "3.66%",
    bottom: "34.55%",
    left: "89.75%",
    position: "absolute",
  },
  statusBarwhite: {
    height: "5.03%",
    marginLeft: -197,
    bottom: "94.97%",
    left: "50%",
    width: 393,
  },
});

export default StatusBarwhite;
