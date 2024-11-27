import React, { useMemo } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native"; // Import TouchableOpacity
import { FontSize, FontFamily, Color, Border, Padding } from "../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};

const Button1 = ({
  onPress, // Add onPress prop
  propBackgroundColor,
  propAlignSelf,
  propPosition,
  propTop,
  propLeft,
  propWidth,
  next,
  propColor,
}) => {
  const buttonStyle = useMemo(() => {
    return {
      ...getStyleValue("backgroundColor", propBackgroundColor),
      ...getStyleValue("alignSelf", propAlignSelf),
      ...getStyleValue("position", propPosition),
      ...getStyleValue("top", propTop),
      ...getStyleValue("left", propLeft),
      ...getStyleValue("width", propWidth),
    };
  }, [
    propBackgroundColor,
    propAlignSelf,
    propPosition,
    propTop,
    propLeft,
    propWidth,
  ]);

  const nextStyle = useMemo(() => {
    return {
      ...getStyleValue("color", propColor),
    };
  }, [propColor]);

  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      {/* {" "} */}
      {/* Use TouchableOpacity */}
      <Text style={[styles.next, nextStyle]}>{next}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  next: {
    flex: 1,
    fontSize: FontSize.size_sm,
    letterSpacing: 0,
    lineHeight: 18,
    fontWeight: "500",
    fontFamily: FontFamily.poppinsMedium,
    color: Color.primaryBlack0,
    textAlign: "center",
  },
  button: {
    alignSelf: "stretch",
    borderRadius: Border.br_mini,
    backgroundColor: Color.colorDarkslategray,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Padding.p_xl,
    paddingVertical: Padding.p_mid,
  },
});

export default Button1;
