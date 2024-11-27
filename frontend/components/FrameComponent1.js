import * as React from "react";
import { StyleSheet, View } from "react-native";
import LoginMethod from "./LoginMethod";
import { Gap } from "../GlobalStyles";

const FrameComponent1 = () => {
  return (
    <View style={styles.frameWrapper}>
      <View style={styles.loginMethodParent}>
        <LoginMethod
          continueWithDerlengAccount="Apple"
          showFacebookIcon={false}
          googleIcon={false}
          appleIcon
          propAlignItems="flex-start"
          propPaddingLeft="unset"
          propPaddingTop="unset"
          propPaddingRight="unset"
          propPaddingBottom="unset"
          propPadding={15}
        />
        <LoginMethod
          continueWithDerlengAccount="Gmail"
          showFacebookIcon={false}
          googleIcon
          appleIcon={false}
          propAlignItems="flex-start"
          propPaddingLeft="unset"
          propPaddingTop="unset"
          propPaddingRight="unset"
          propPaddingBottom="unset"
          propPadding={15}
        />
        <LoginMethod
          continueWithDerlengAccount="Facebook"
          showFacebookIcon
          googleIcon
          appleIcon
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginMethodParent: {
    height: 52,
    flexDirection: "row",
    gap: Gap.gap_sm,
    alignSelf: "stretch",
  },
  frameWrapper: {
    alignSelf: "stretch",
  },
});

export default FrameComponent1;
