import * as React from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Dimensions,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button1 from "./Button1";
import {
  FontFamily,
  FontSize,
  Gap,
  Color,
  Border,
  Padding,
} from "../GlobalStyles";
import Email from "./Email";
import SendDirectSms from "react-native-send-direct-sms";
import email from "react-native-email";

const { width } = Dimensions.get("window"); // Get screen width

const FrameComponent3 = () => {
  const [emailInp, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [mailInput, setMailInput] = React.useState(true);
  const navigation = useNavigation(); // Initialize navigation

  const handleClick = () => {
    setMailInput(!mailInput);
  };

  const generateRandomCode = () => {
    return Math.floor(1000 + Math.random() * 9000).toString(); // Generate a random 4-digit code
  };

  const sendSms = (phoneNumber, code) => {
    SendDirectSms(phoneNumber, `Your verification code is: ${code}`)
      .then((res) => {
        Alert.alert("Success", "SMS sent successfully!");
      })
      .catch((err) => {
        Alert.alert("Error", "Failed to send SMS: " + err);
      });
  };

  const sendEmail = (emailAddress, code) => {
    const to = [emailAddress]; // Can be string or array of email addresses

    email(to, {
      subject: "Verification Code",
      body: `Your verification code is: ${code}`,
    })
      .then(() => {
        Alert.alert("Success", "Email sent successfully!");
      })
      .catch((err) => {
        Alert.alert("Error", "Failed to send email: " + err);
      });
  };

  const handleSubmit = () => {
    if (mailInput && emailInp) {
      const code = generateRandomCode();
      sendEmail(emailInp, code);
      navigation.navigate("Login6", { code, email: emailInp });
    } else if (!mailInput && phone) {
      const code = generateRandomCode();
      sendSms(phone, code);
      navigation.navigate("Login6", { code, phone: phone });
    } else {
      Alert.alert("Error", "Please enter a valid email or phone number.");
    }
  };

  return (
    <View style={styles.frameParent}>
      <View>
        <View style={styles.forgetPasswordParent}>
          <Text style={styles.forgetPassword}>Forget password</Text>
          <Text style={[styles.enterYourEmail, styles.emailTypo]}>
            Enter your email or phone we will send the verification code to
            reset your password
          </Text>
        </View>
      </View>
      <View style={styles.resetCodeMethod}>
        <View style={styles.emailLayout}>
          <Text style={[styles.email1, styles.emailTypo]}>Email</Text>
          <View style={styles.frameGroup}>
            {mailInput ? (
              <Email
                enterYourEmailAddress="Enter your email address"
                value={emailInp}
                onChangeText={setEmail}
              />
            ) : (
              <TextInput
                style={[
                  styles.enterYourPhoneNumberWrapper,
                  styles.parentBorder,
                ]}
                value={phone}
                onChangeText={setPhone}
                placeholder="Enter your number"
              />
            )}
            <Text
              style={[styles.resetWithPhone, styles.resetTypo]}
              onPress={handleClick}
            >
              Reset with {mailInput ? "phone number" : "email"}
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
          next="Request code"
          propColor="#fff"
          onPress={handleSubmit} // Handle button press
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  emailTypo: {
    fontFamily: FontFamily.poppinsRegular,
    textAlign: "left",
  },
  resetTypo: {
    fontSize: FontSize.size_3xs,
    fontFamily: FontFamily.poppinsRegular,
    textAlign: "center",
  },
  emailLayout: {
    gap: Gap.gap_xl,
    width: "100%",
    alignSelf: "left",
  },
  parentBorder: {
    height: 52,
    borderColor: Color.colorGray_500,
    borderRadius: 15,
    paddingBottom: Padding.p_3xs,
    paddingTop: Padding.p_3xs,
    paddingLeft: Padding.p_mini,
    alignItems: "center",
    flexDirection: "row",
    borderStyle: "solid",
    marginTop: 15,
  },
  forgetPassword: {
    fontSize: FontSize.size_xl,
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemiBold,
    textAlign: "left",
    color: Color.lightInk,
    letterSpacing: 0,
  },
  enterYourEmail: {
    color: Color.colorGray_400,
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.poppinsRegular,
    letterSpacing: -0.5,
    width: "100%",
    paddingRight: "20%",
  },
  forgetPasswordParent: {
    gap: Gap.gap_xs,
    width: "100%",
    alignSelf: "left",
  },
  email1: {
    color: Color.colorGray_300,
    display: "none",
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.poppinsRegular,
  },
  resetWithPhone: {
    color: Color.colorDarkslategray,
  },
  frameGroup: {
    gap: Gap.gap_md,
  },
  enterYourPhoneNumberWrapper: {
    flexGrow: 1,
    borderWidth: 2,
    width: "100%",
  },
  resetCodeMethod: {
    gap: Gap.gap_2xl,
    marginRight: "20%",
  },
  frameParent: {
    top: "40%",
    gap: Gap.gap_2xl,
    width: "100%",
  },
});

export default FrameComponent3;
