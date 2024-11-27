import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  TextInput,
  Image,
} from "react-native";
import Email from "./Email";
import Button1 from "./Button1";
import {
  FontFamily,
  FontSize,
  Color,
  Border,
  Padding,
  Gap,
} from "../GlobalStyles";
import axios from "axios"; // Import axios for making HTTP requests
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

const { width, height } = Dimensions.get("window");

const FrameComponent = ({
  email,
  setEmail,
  password,
  setPassword,
  apiCall,
  loading,
  errorMessage,
  signInOrUp,
  handleClick,
  handleForgotPassword,
  buttonText,
}) => {
  const navigation = useNavigation(); // Get navigation object

  return (
    <View style={styles.frameParent}>
      <View style={styles.emailParent}>
        <Email
          email="Email"
          enterYourEmailAddress="Enter your email address"
          value={email}
          onChangeText={setEmail}
        />
        <View style={styles.email}>
          <Text style={[styles.password, styles.passwordTypo]}>Password</Text>
          <View style={[styles.emailInner, styles.emailInnerFlexBox]}>
            <View
              style={[styles.enterYourpasswordParent, styles.emailInnerFlexBox]}
            >
              <TextInput
                style={[styles.password, styles.passwordTypo]}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password" // Add placeholder here
                secureTextEntry // Hide password input
              />
              <Image
                style={styles.eyeIcon}
                contentFit="cover"
                source={require("../assets/eye.png")}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={[styles.forgotPasswordContainer]}>
        <Text
          style={[styles.forgotPassword, styles.passwordTypo]}
          onPress={handleForgotPassword}
        >
          {signInOrUp === "Sign Up?" ? "Forgot Password?" : null}
        </Text>
        <Text
          style={[styles.SignUp, styles.passwordTypo]}
          onPress={handleClick}
        >
          {signInOrUp}
        </Text>
      </View>
      {/* <Text
        style={[styles.forgotPassword, styles.passwordTypo]}
        onPress={handleClick}
      >
        {signInOrUp}
      </Text> */}
      <Button1 next={buttonText} onPress={apiCall} disabled={loading} />
      {/* Disable button while loading */}
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      {/* Display error message */}
    </View>
  );
};

const styles = StyleSheet.create({
  passwordTypo: {
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_xs,
  },
  emailInnerFlexBox: {
    alignItems: "center",
    flexDirection: "row",
  },
  forgotPasswordContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  password: {
    color: Color.colorGray_400,
    textAlign: "left",
    width: "98%",
  },
  eyeIcon: {
    width: width * 0.05, // Responsive width
    height: width * 0.05, // Responsive height
    overflow: "hidden",
  },
  enterYourpasswordParent: {
    flex: 1,
    justifyContent: "space-between",
  },
  emailInner: {
    borderRadius: Border.br_mini,
    borderStyle: "solid",
    borderColor: Color.colorGray_600,
    borderWidth: 1,
    width: width * 0.85, // Responsive width (85% of screen width)
    height: height * 0.07, // Responsive height (7% of screen height)
    paddingHorizontal: Padding.p_mini,
    // Responsive padding
    paddingVertical: Padding.p_3xs,
    // Responsive padding
  },
  emailParent: {
    gap: Gap.gap_lg,
    // Space between elements
  },
  forgotPassword: {
    // alignSelf: "stretch",
    color: Color.colorDarkslategray,
    // Text color for forgot password link
    // textAlign: "left",
    // marginLeft: "5%",
    // Align text to right
  },
  SignUp: {
    // alignSelf: "stretch",
    color: Color.colorDarkslategray,
    // Text color for forgot password link
    // textAlign: "right",
    // marginRight: "5%",
    // Align text to right
  },
  frameParent: {
    gap: Gap.gap_md,
    // Space between elements
    paddingHorizontal: width * 0.05,
    // Responsive padding
  },
});

export default FrameComponent;
