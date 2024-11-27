import * as React from "react";
import { StyleSheet, View, useWindowDimensions, Platform } from "react-native";
import { Image } from "expo-image";
import OnboardingCard from "../components/OnboardingCard";
import StatusBar1 from "../components/StatusBar1";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

// Theme constants
const THEME = {
  colors: {
    primary: "#000000",
    secondary: "#2b3d4b",
    inactive: "#808080",
    white: "#FFFFFF",
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    full: 9999,
    regular: 8,
  },
};

const StepIndicator = ({ currentStep, totalSteps }) => {
  const indicators = Array(totalSteps).fill(0);

  return (
    <View style={styles.stepIndicatorContainer}>
      {indicators.map((_, index) => (
        <View
          key={index}
          style={[
            styles.stepDot,
            index === currentStep
              ? styles.stepDotActive
              : styles.stepDotInactive,
          ]}
        />
      ))}
    </View>
  );
};

const Onboarding2 = () => {
  const navigation = useNavigation(); // Get navigation object

  const handleNext = () => {
    navigation.navigate("Onboarding1"); // Navigate to Onboarding2
  };
  const { width, height } = useWindowDimensions();

  // Responsive calculations
  const imageHeight = height;
  const imageWidth = (height * 616) / 874; // Maintain aspect ratio
  const cardWidth = width * 0.9; // 90% of screen width

  return (
    <View style={styles.container}>
      <Image
        style={[
          styles.backgroundImage,
          {
            width: imageWidth,
            height: imageHeight,
          },
        ]}
        contentFit="cover"
        source={require("../assets/jcobnasyr67svpjk6q7iunsplash-1.png")}
      />

      <View style={[styles.cardContainer, { width: cardWidth }]}>
        <OnboardingCard
          getReadyForTheNextTrip="Get ready for your next adventure"
          findThousansOfTouristDestinatio="Explore thousands of destinations with travelers all around the world"
          propBackgroundColor={THEME.colors.secondary}
          propAlignSelf="stretch"
          next="Next"
          propColor={THEME.colors.white}
          onNext={handleNext}
        />

        <StepIndicator currentStep={0} totalSteps={3} />
      </View>

      <StatusBar1 />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.primary,
    alignItems: "center",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  cardContainer: {
    position: "absolute",
    bottom: Platform.select({ ios: 40, android: 30 }),
    alignItems: "center",
    gap: THEME.spacing.xl,
  },
  stepIndicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: THEME.spacing.xs,
    paddingHorizontal: THEME.spacing.xxl,
    width: "100%",
  },
  stepDot: {
    height: 6,
    flex: 1,
    borderRadius: THEME.borderRadius.full,
  },
  stepDotActive: {
    backgroundColor: THEME.colors.white,
  },
  stepDotInactive: {
    backgroundColor: THEME.colors.inactive,
  },
});

export default Onboarding2;
