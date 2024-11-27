import React, { useMemo } from "react";
import { Text, StyleSheet, View } from "react-native";
import Button1 from "./Button1"; // Assuming Button1 is your button component
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

const OnboardingCard = ({
  getReadyForTheNextTrip,
  findThousansOfTouristDestinatio,
  nextFontSize,
  propBackgroundColor,
  propAlignSelf,
  propPosition,
  propTop,
  propLeft,
  propWidth,
  next,
  propColor,
  onNext, // Add onNext prop
}) => {
  const getReadyForStyle = useMemo(() => {
    return {
      ...getStyleValue("fontSize", nextFontSize),
    };
  }, [nextFontSize]);

  return (
    <View style={styles.onboardingCard}>
      <View style={styles.textButton}>
        <View style={styles.titleSubtitle}>
          <Text
            style={[
              styles.getReadyFor,
              styles.getReadyForFlexBox,
              getReadyForStyle,
            ]}
          >
            {getReadyForTheNextTrip}
          </Text>
          <Text style={[styles.findThousansOf, styles.getReadyForFlexBox]}>
            {findThousansOfTouristDestinatio}
          </Text>
        </View>
        <Button1
          propBackgroundColor={propBackgroundColor}
          propAlignSelf={propAlignSelf}
          propPosition={propPosition}
          propTop={propTop}
          propLeft={propLeft}
          propWidth={propWidth}
          next={next}
          propColor={propColor}
          onPress={onNext} // Pass onNext to Button1
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  getReadyForFlexBox: {
    textAlign: "left",
    letterSpacing: 0,
    alignSelf: "stretch",
  },
  getReadyFor: {
    fontSize: FontSize.size_11xl,
    lineHeight: 40,
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemiBold,
    color: Color.lightInk,
  },
  findThousansOf: {
    fontSize: FontSize.size_mini,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.colorGray_300,
    marginBottom: "8%",
  },
  titleSubtitle: {
    width: 295,
    gap: Gap.gap_md,
  },
  textButton: {
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "stretch",
  },
  onboardingCard: {
    borderRadius: Border.br_mini,
    backgroundColor: Color.primaryBlack0,
    height: "fit-content",
    flexDirection: "row",
    margin: "auto",
    paddingHorizontal: "3%",
    paddingVertical: Padding.p_11xl,
  },
});

export default OnboardingCard;
