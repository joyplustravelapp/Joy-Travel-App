import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  useWindowDimensions,
  SafeAreaView,
} from "react-native";
import { Image } from "expo-image";
import StatusBarwhite from "../components/StatusBarwhite";
import Keyboards from "../components/Keyboards";
import { Color, Border, FontSize, FontFamily } from "../GlobalStyles";

const Login6 = () => {
  const [otp, setOtp] = React.useState(["", "", "", ""]);
  const [activeInput, setActiveInput] = React.useState(0);
  const { width, height } = useWindowDimensions();

  // Calculate responsive dimensions
  const inputWidth = Math.min(width * 0.15, 61);
  const inputHeight = Math.min(height * 0.06, 52);
  const spacing = width * 0.02;

  const getFontSize = (baseSize) => {
    const scaleFactor = Math.min(width / 400, height / 800);
    return Math.round(baseSize * scaleFactor);
  };

  // Handle keyboard input
  const handleKeyPress = (key) => {
    if (activeInput < 4) {
      const newOtp = [...otp];

      if (key === "delete") {
        // Handle backspace
        if (newOtp[activeInput]) {
          newOtp[activeInput] = "";
        } else if (activeInput > 0) {
          setActiveInput(activeInput - 1);
          newOtp[activeInput - 1] = "";
        }
      } else if (key === "done") {
        // Handle done button - you can add verification logic here
        console.log("OTP entered:", newOtp.join(""));
      } else {
        // Handle number input
        newOtp[activeInput] = key;
        if (activeInput < 3) {
          setActiveInput(activeInput + 1);
        }
      }

      setOtp(newOtp);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.login}>
        {/* <StatusBarwhite
          signalIcon={require("../assets/signal-icon.png")}
          wifi={require("../assets/wifi.png")}
          buttary={require("../assets/buttary1.png")}
          visualsofdanaSKTSGbqeUnspIconMarginLeft={-width * 0.5}
          visualsofdanaSKTSGbqeUnspIconLeft="50%"
          visualsofdanaSKTSGbqeUnspIconWidth={width}
          visualsofdanaSKTSGbqeUnspIconRight="unset"
          signalIconColor="#000"
        /> */}

        <View style={styles.contentContainer}>
          <Image
            style={[
              styles.angleLeftIcon,
              { width: width * 0.06, height: width * 0.06 },
            ]}
            contentFit="cover"
            source={require("../assets/angleleft.png")}
          />

          <Text style={[styles.verifyCode, { fontSize: getFontSize(24) }]}>
            Verify Code
          </Text>

          <Text
            style={[
              styles.pleaseEnterThe,
              { fontSize: getFontSize(FontSize.size_smi) },
            ]}
          >
            Please enter the code we just sent to email
          </Text>

          <Text
            style={[
              styles.example123gmailcom,
              { fontSize: getFontSize(FontSize.size_smi) },
            ]}
          >
            Example123@gmail.com
          </Text>

          <View style={[styles.otpContainer, { gap: spacing }]}>
            {otp.map((digit, index) => (
              <View
                key={index}
                style={[
                  styles.otpBox,
                  digit ? styles.otpBoxFilled : null,
                  activeInput === index && styles.otpBoxActive,
                  {
                    width: inputWidth,
                    height: inputHeight,
                  },
                ]}
                onTouchEnd={() => setActiveInput(index)}
              >
                <Text
                  style={[
                    styles.otpText,
                    { fontSize: getFontSize(FontSize.size_xl) },
                  ]}
                >
                  {digit}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.resendContainer}>
            <Text
              style={[
                styles.didntReceiveOtp,
                { fontSize: getFontSize(FontSize.size_smi) },
              ]}
            >
              Didn't receive OTP?
            </Text>
            <Text
              style={[
                styles.resendCode,
                { fontSize: getFontSize(FontSize.size_smi) },
              ]}
            >
              Resend code
            </Text>
          </View>
        </View>

        <Keyboards onKeyPress={handleKeyPress} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.primaryBlack0,
  },
  login: {
    flex: 1,
    width: "100%",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: "5%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: "15%",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: "10%",
  },
  otpBox: {
    borderWidth: 1,
    borderColor: Color.colorGray_600,
    borderRadius: Border.br_mini,
    justifyContent: "center",
    alignItems: "center",
  },
  otpBoxFilled: {
    borderColor: Color.lightInk,
    backgroundColor: Color.colorGray_100,
  },
  otpBoxActive: {
    borderColor: Color.lightInk,
    borderWidth: 2,
  },
  otpText: {
    fontFamily: FontFamily.poppinsSemiBold,
    color: Color.lightInk,
  },
  verifyCode: {
    color: Color.lightInk,
    textAlign: "center",
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    marginBottom: "5%",
  },
  pleaseEnterThe: {
    color: Color.colorGray_400,
    textAlign: "center",
    fontFamily: FontFamily.poppinsRegular,
    marginBottom: "2%",
  },
  example123gmailcom: {
    color: Color.colorGray_400,
    textAlign: "center",
    fontFamily: FontFamily.poppinsRegular,
  },
  resendContainer: {
    alignItems: "center",
    marginTop: "10%",
  },
  didntReceiveOtp: {
    color: Color.colorGray_400,
    fontFamily: FontFamily.poppinsRegular,
    marginBottom: "2%",
  },
  resendCode: {
    color: Color.colorGray_400,
    // textDecoration: "underline",
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
  },
  angleLeftIcon: {
    position: "absolute",
    left: 0,
    top: 0,
    overflow: "hidden",
  },
});

export default Login6;
