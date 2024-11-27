import React, { useMemo } from "react";
import { Text, StyleSheet, View } from "react-native";
import { FontSize, FontFamily, Color, Border, Padding, Gap } from "../GlobalStyles";
import { TextInput } from "react-native-gesture-handler";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};

const Email = ({
  email,
  enterYourEmailAddress,
  propBorderColor,
  value,
  onChangeText,
}) => {
  const frameViewStyle = useMemo(() => {
    return {
      ...getStyleValue("borderColor", propBorderColor),
    };
  }, [propBorderColor]);

  return (
    <View style={styles.email}>
      <Text style={styles.emailLabel}>{email}</Text>
      <View style={[styles.enterYourEmailAddressWrapper, frameViewStyle]}>
        <TextInput
          style={styles.emailInput}
          value={value}
          onChangeText={onChangeText}
          placeholder={enterYourEmailAddress} // Set placeholder here
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  emailLabel: {
    fontSize: FontSize.size_xs,
    // Label font size
    fontFamily: FontFamily.poppinsRegular,
    // Label font family
    color: Color.colorGray_400,
    // Label color
    textAlign: "left",
    // Align text to left
    paddingLeft: 5,
    // Padding for left side of label
  },
  enterYourEmailAddressWrapper: {
    borderRadius: Border.br_mini,
    // Border radius for input field
    borderStyle: "solid",
    // Solid border style for input field
    borderColor: Color.colorGray_600,
    // Border color for input field
    borderWidth: 1,
    // Border width for input field
    width: "98%",
    // Width of input field container
    marginHorizontal: "auto",
    // Center input field container horizontally
    height: 52,
    // Height of input field container
    flexDirection: "row",
    // Flex direction for input field container
    alignItems: "center",
    // Align items in center vertically within container
    paddingLeft: Padding.p_mini,
    // Padding left for input field container
    paddingTop: Padding.p_3xs,
    // Padding top for input field container
    paddingBottom: Padding.p_3xs,
    // Padding bottom for input field container
  },
  emailInput: {
    flex: 1,
    // Allow input to take full width of container
    fontSize: FontSize.size_xs,
    // Input font size
    color: Color.colorBlack, // Set text color for input
  },
  email: {
    gap: Gap.gap_2xs,
    // Space between elements in email component
  },
});

export default Email;
