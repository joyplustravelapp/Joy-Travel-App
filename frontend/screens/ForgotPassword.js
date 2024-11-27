import React, { useState } from "react";
import { Image } from "expo-image";
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import StatusBarwhite from "../components/StatusBarwhite";
import NavBarTextOnlyOne from "../components/NavBarTextOnlyOne";
import FrameComponent3 from "../components/FrameComponent3";
import NumberKeyboard from "../components/Keyboards"; // Importing NumberKeyboard
import { Border, Color } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import { useDispatch } from "react-redux";

const ForgotPassword = () => {
  const navigation = useNavigation(); // Get navigation object
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  
  const { email, errorMessage, loading } = useSelector(
    (state) => state.auth
  );
  const handleClick = async () => {
    navigation.navigate("CreateAccount");
  };

  const handleLogin = () => {
    dispatch(clearError());
    dispatch(loginAccount({ email, password }));
    navigation.navigate("Homepage2");
  };

  const handleForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  useEffect(() => {
    if (errorMessage === "") return;

    if (!loading && !errorMessage) {
      // Navigate to login after successful account creation
      AsyncStorage.setItem("token", JSON.stringify(errorMessage.token));
      navigation.navigate("Login2");
    }
  }, [errorMessage, loading]);

  // State to control visibility of NumberKeyboard
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  // Function to handle back press
  const handleBackPress = () => {
    navigation?.goBack();
  };

  // Function to close keyboard
  const handleCloseKeyboard = () => {
    setIsKeyboardVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavBarTextOnlyOne />

      <View style={styles.contentContainer}>
        {/* Logo Image */}
        <Image
          style={[
            styles.logoImage,
            {
              width: "25%",
              height: "15%",
              aspectRatio: "auto",
            },
          ]}
          contentFit="cover"
          source={require("../assets/img-4231-1.png")}
        />

        {/* Main Content */}
        <FrameComponent3 />

        {/* Back Button */}
        <TouchableOpacity
          style={[
            styles.backButton,
            {
              top: Platform.OS === "ios" ? insets.top + 10 : 20,
              width: 20,
              height: 20, // Maintain aspect ratio
            },
          ]}
          onPress={handleBackPress}
          activeOpacity={0.7}
        >
          <Image
            style={styles.backIcon}
            contentFit="cover"
            source={require("../assets/angleleft.png")}
          />
        </TouchableOpacity>

        {/* Show Number Keyboard */}
        {isKeyboardVisible && (
          <NumberKeyboard
            onKeyPress={(value) => console.log(value)}
            onDelete={() => console.log("Deleted")}
            onClose={handleCloseKeyboard}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.primaryBlack0,
  },
  contentContainer: {
    flex: 1,
    width: "100%",
    alignItems: "left",
    position: "relative",
    marginLeft: "10%",
  },
  logoImage: {
    position: "absolute",
    top: "20%",
    borderRadius: Border.br_xl,
  },
  backButton: {
    position: "absolute",
    zIndex: 1,
  },
  backIcon: {
    width: "100%",
    height: "100%",
  },
});

export default ForgotPassword;
