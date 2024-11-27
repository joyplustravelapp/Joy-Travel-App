import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import Button1 from "./Button1";
import {
  FontFamily,
  FontSize,
  Gap,
  Padding,
  Color,
  Border,
} from "../GlobalStyles";

const FrameComponent4 = () => {
  return (
    <View style={styles.frameParent}>
      <View>
        <View style={styles.createNewPasswordParent}>
          <Text style={styles.createNewPassword}>Create new password</Text>
          <Text style={[styles.keepYourAccount, styles.textTypo]}>
            Keep your account secure by creating a strong password
          </Text>
        </View>
      </View>
      <View style={styles.createNewPassword1}>
        <View style={styles.emailLayout}>
          <Text style={[styles.email1, styles.textTypo]}>Email</Text>
          <View style={styles.frameGroup}>
            <View style={[styles.frameContainer, styles.parentFlexBox]}>
              <View style={styles.parentFlexBox1}>
                <Image
                  style={styles.frameChild}
                  contentFit="cover"
                  source={require("../assets/ellipse-2.png")}
                />
                <Image
                  style={styles.frameChild}
                  contentFit="cover"
                  source={require("../assets/ellipse-2.png")}
                />
                <Image
                  style={styles.frameChild}
                  contentFit="cover"
                  source={require("../assets/ellipse-2.png")}
                />
                <Image
                  style={styles.frameChild}
                  contentFit="cover"
                  source={require("../assets/ellipse-2.png")}
                />
                <Image
                  style={styles.frameChild}
                  contentFit="cover"
                  source={require("../assets/ellipse-2.png")}
                />
                <Image
                  style={styles.frameChild}
                  contentFit="cover"
                  source={require("../assets/ellipse-2.png")}
                />
                <Image
                  style={styles.frameChild}
                  contentFit="cover"
                  source={require("../assets/ellipse-2.png")}
                />
                <Image
                  style={styles.frameChild}
                  contentFit="cover"
                  source={require("../assets/ellipse-2.png")}
                />
              </View>
              <Image
                style={[styles.eyeIcon, styles.iconLayout]}
                contentFit="cover"
                source={require("../assets/eye.png")}
              />
            </View>
            <Text style={[styles.pleaseEnterYour, styles.enterTypo]}>
              *please enter your password
            </Text>
            <Text style={[styles.yourPasswordShould, styles.enterTypo]}>
              Your password should be at least contain upper character
            </Text>
          </View>
        </View>
        <View style={[styles.phone, styles.emailLayout]}>
          <Text style={[styles.email1, styles.textTypo]}>Email</Text>
          <View style={styles.frameGroup}>
            <View style={[styles.frameParent1, styles.parentFlexBox1]}>
              <View style={[styles.parent, styles.parentSpaceBlock]}>
                <Text style={[styles.text, styles.textTypo]}>+855</Text>
                <Image
                  style={[styles.caretDownIcon, styles.iconLayout]}
                  contentFit="cover"
                  source
                />
              </View>
              <View
                style={[
                  styles.enterYourPhoneNumberWrapper,
                  styles.parentSpaceBlock,
                ]}
              >
                <Text style={[styles.enterYourPhone, styles.enterTypo]}>
                  Enter your phone number
                </Text>
              </View>
            </View>
            <Text style={[styles.resetWithEmail, styles.enterTypo]}>
              Reset with email address
            </Text>
          </View>
        </View>
        <Button1
          propBackgroundColor="#2b3d4b"
          propAlignSelf="stretch"
          propPosition="unset"
          propTop="unset"
          propLeft="unset"
          propWidth="unset"
          next="Create new password"
          propColor="#fff"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textTypo: {
    fontFamily: FontFamily.poppinsRegular,
    textAlign: "left",
  },
  parentFlexBox: {
    justifyContent: "space-between",
    borderWidth: 1,
  },
  iconLayout: {
    overflow: "hidden",
    width: 19,
  },
  enterTypo: {
    fontSize: FontSize.size_3xs,
    fontFamily: FontFamily.poppinsRegular,
    textAlign: "left",
  },
  emailLayout: {
    gap: Gap.gap_xl,
    width: 323,
  },
  parentFlexBox1: {
    flexDirection: "row",
    gap: Gap.gap_xs,
  },
  parentSpaceBlock: {
    paddingBottom: Padding.p_3xs,
    paddingTop: Padding.p_3xs,
    paddingLeft: Padding.p_mini,
    height: 46,
    borderColor: Color.colorGray_500,
    borderRadius: Border.br_10xs,
    alignItems: "center",
    flexDirection: "row",
    borderStyle: "solid",
  },
  createNewPassword: {
    fontSize: FontSize.size_xl,
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemiBold,
    textAlign: "center",
    color: Color.lightInk,
    letterSpacing: 0,
  },
  keepYourAccount: {
    color: Color.colorGray_400,
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.poppinsRegular,
    alignSelf: "stretch",
    letterSpacing: 0,
  },
  createNewPasswordParent: {
    gap: Gap.gap_xs,
    width: 323,
  },
  email1: {
    color: Color.colorGray_300,
    display: "none",
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.poppinsRegular,
  },
  frameChild: {
    width: 7,
    height: 7,
  },
  eyeIcon: {
    height: 19,
  },
  frameContainer: {
    borderRadius: Border.br_mini,
    borderColor: Color.colorGray_600,
    height: 52,
    paddingHorizontal: Padding.p_mini,
    paddingVertical: Padding.p_3xs,
    alignItems: "center",
    borderStyle: "solid",
    justifyContent: "space-between",
    flexDirection: "row",
    borderWidth: 1,
    alignSelf: "stretch",
  },
  pleaseEnterYour: {
    color: Color.colorTomato_100,
    display: "none",
  },
  yourPasswordShould: {
    color: Color.colorGray_100,
  },
  frameGroup: {
    gap: Gap.gap_md,
    alignSelf: "stretch",
  },
  text: {
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.lightInk,
  },
  caretDownIcon: {
    height: 18,
  },
  parent: {
    width: 85,
    paddingRight: Padding.p_3xs,
    justifyContent: "space-between",
    borderWidth: 1,
    paddingBottom: Padding.p_3xs,
    paddingTop: Padding.p_3xs,
    paddingLeft: Padding.p_mini,
    height: 46,
    borderColor: Color.colorGray_500,
    borderRadius: Border.br_10xs,
  },
  enterYourPhone: {
    color: Color.colorGray_400,
  },
  enterYourPhoneNumberWrapper: {
    flex: 1,
    borderWidth: 2,
  },
  frameParent1: {
    alignSelf: "stretch",
  },
  resetWithEmail: {
    color: Color.colorRoyalblue,
  },
  phone: {
    display: "none",
  },
  createNewPassword1: {
    gap: Gap.gap_2xl,
  },
  frameParent: {
    position: "absolute",
    marginLeft: -162,
    top: "40%",
    left: "50%",
    textAlign: "center",
    gap: Gap.gap_2xl,
  },
});

export default FrameComponent4;
