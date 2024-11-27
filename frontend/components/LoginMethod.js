import React, { useMemo } from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import {
  FontSize,
  FontFamily,
  Color,
  Gap,
  Border,
  Padding,
} from "../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const LoginMethod = ({
  continueWithDerlengAccount,
  showFacebookIcon,
  googleIcon,
  appleIcon,
  propAlignItems,
  propPaddingLeft,
  propPaddingTop,
  propPaddingRight,
  propPaddingBottom,
  propPadding,
}) => {
  const loginMethodStyle = useMemo(() => {
    return {
      ...getStyleValue("alignItems", propAlignItems),
      ...getStyleValue("paddingLeft", propPaddingLeft),
      ...getStyleValue("paddingTop", propPaddingTop),
      ...getStyleValue("paddingRight", propPaddingRight),
      ...getStyleValue("paddingBottom", propPaddingBottom),
      ...getStyleValue("padding", propPadding),
    };
  }, [
    propAlignItems,
    propPaddingLeft,
    propPaddingTop,
    propPaddingRight,
    propPaddingBottom,
    propPadding,
  ]);

  return (
    <View style={[styles.loginMethod, loginMethodStyle]}>
      <View style={styles.emailParent}>
        <Image
          style={[styles.emailIcon, styles.iconCommon]}
          contentFit="cover"
          source
        />
        <Image
          style={[styles.emailIcon, styles.iconCommon]}
          contentFit="cover"
          source
        />
        {showFacebookIcon && (
          <Image
            style={styles.iconLayout}
            contentFit="cover"
            source={require("../assets/facebook2.png")}
          />
        )}
        <Image
          style={[styles.emailIcon, styles.iconCommon]}
          contentFit="cover"
          source
        />
        {googleIcon && (
          <Image
            style={[styles.googleIcon, styles.iconCommon]}
            contentFit="cover"
            source
          />
        )}
        {appleIcon && <Image contentFit="cover" source />}
        <Text style={styles.continueWithDerleng}>
          {continueWithDerlengAccount}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconCommon: {
    overflow: "hidden",
    display: "none",
  },
  iconLayout: {
    height: 22,
    width: 22,
    overflow: "hidden",
  },
  emailIcon: {
    width: 20,
    height: 20,
    display: "none",
  },
  googleIcon: {
    width: 18,
    height: 18,
  },
  continueWithDerleng: {
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.lightInk,
    textAlign: "center",
  },
  emailParent: {
    flexDirection: "row",
    gap: Gap.gap_xs,
    alignItems: "center",
  },
  loginMethod: {
    alignSelf: "stretch",
    flex: 1,
    borderRadius: Border.br_mini,
    backgroundColor: Color.primaryBlack0,
    borderStyle: "solid",
    borderColor: Color.colorGray_600,
    borderWidth: 1,
    justifyContent: "center",
    paddingLeft: Padding.p_mini,
    paddingTop: Padding.p_mini,
    paddingRight: Padding.p_xl,
    paddingBottom: Padding.p_mini,
    alignItems: "center",
  },
});

export default LoginMethod;
