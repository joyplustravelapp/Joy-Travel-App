import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View, Dimensions } from "react-native";
import FrameComponent from "../components/FrameComponent";
import FrameComponent1 from "../components/FrameComponent1";
import NavBarTextOnlyOne from "../components/NavBarTextOnlyOne";
import { FontSize, FontFamily, Border, Color } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import {
  createAccount,
  setEmail,
  setPassword,
  clearError,
} from "../ReduxToolkit/slices/authSlice";

const { width, height } = Dimensions.get("window");

const CreateAccount = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation(); // Get navigation object

  const { email, password, loading, errorMessage } = useSelector(
    (state) => state.auth
  );

  const handleClick = async () => {
    navigation.navigate("Signin");
  };

  const handleCreateAccount = async () => {
    dispatch(clearError()); // Clear previous error
    dispatch(createAccount({ email, password }));
    navigation.navigate("Homepage2");
  };

  useEffect(() => {
    if (errorMessage === "") return;

    if (!loading && !errorMessage) {
      // Navigate to login after successful account creation
      AsyncStorage.setItem("token", JSON.stringify(errorMessage.token));
      navigation.navigate("Login2");
    }
  }, [errorMessage, loading]);

  return (
    <View style={styles.login}>
      <Image
        style={styles.img42311Icon}
        contentFit="cover"
        source={require("../assets/img-4231-1.png")}
      />
      <View style={styles.loginInner}>
        <View style={styles.parentFlexBox}>
          <Text style={styles.getStarted}>Get Started</Text>
          <Text style={[styles.createAnAccount, styles.orSignUpTypo]}>
            Create an account by using the form below
          </Text>
          <Text style={{ color: "red" }}>
            {errorMessage ? (
              <Text style={styles.error}>{errorMessage}</Text>
            ) : null}
          </Text>
        </View>
      </View>
      <View style={styles.frameParent}>
        {/* Use FrameComponent for email and password input */}
        <FrameComponent
          email={email}
          setEmail={(text) => dispatch(setEmail(text))}
          password={password}
          setPassword={(text) => dispatch(setPassword(text))}
          apiCall={handleCreateAccount}
          loading={loading}
          errorMessage={errorMessage}
          signInOrUp="Sign In?"
          handleClick={handleClick}
          buttonText="Create Account"
        />
        <View style={[styles.rectangleParent, styles.parentFlexBox]}>
          <View style={styles.frameChild} />
          <Text style={[styles.orSignUp, styles.orSignUpTypo]}>
            Or sign up with
          </Text>
          <View style={styles.frameChild} />
        </View>
        <FrameComponent1 />
      </View>
      <NavBarTextOnlyOne />
    </View>
  );
};

const styles = StyleSheet.create({
  orSignUpTypo: {
    fontSize: FontSize.size_xs,
    textAlign: "center",
    fontFamily: FontFamily.poppinsRegular,
  },
  parentFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  img42311Icon: {
    marginLeft: -41,
    top: height * 0.15, // Responsive top position based on screen height
    borderRadius: Border.br_xl,
    width: width * 0.2, // Responsive width (20% of screen width)
    height: width * 0.2, // Responsive height (20% of screen width)
    left: "50%",
    position: "absolute",
    // transform: [{ translateX: -width * 0.1 }], // Centering the image
  },
  alreadyHaveAn: {
    fontFamily: FontFamily.poppinsRegular,
  },
  signInHere: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
  },
  alreadyHaveAnContainer: {
    marginLeft: -97,
    top: height * 0.82, // Responsive top position based on screen height
    fontSize: FontSize.size_3xs,
    textAlign: "left",
    color: Color.lightInk,
    left: "50%",
    position: "absolute",
  },
  getStarted: {
    fontSize: FontSize.size_lg, // Adjusted for better visibility on larger screens
    textAlign: "center",
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    color: Color.lightInk,
  },
  createAnAccount: {
    color: Color.colorGray_300,
  },
  loginInner: {
    marginLeft: -130,
    top: height * 0.3, // Responsive top position based on screen height
    alignItems: "center",
    left: "50%",
    position: "absolute",
  },
  frameChild: {
    backgroundColor: Color.colorGray_500,
    height: 1,
    flex: 1,
  },
  orSignUp: {
    color: Color.colorGray_400,
    width: "auto", // Allowing it to adjust based on content
  },
  rectangleParent: {
    alignSelf: "stretch",
    flexDirection: "row",
  },
  frameParent: {
    top: height * 0.4, // Responsive top position based on screen height
    width: "96%",
    marginHorizontal: "auto",
    gap: 20,
    position: "absolute",
  },
  login: {
    backgroundColor: Color.primaryBlack0,
    width: "100%",
    alignItems: "center",
    flexGrow: 1, // Use flexGrow for better responsiveness
  },
});

export default CreateAccount;
