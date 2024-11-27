import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import OnboardingCard from "../components/OnboardingCard";
import { Border, Color, Padding, Gap } from "../GlobalStyles";

const Onboarding = () => {
  const navigation = useNavigation(); // Get navigation object

  const handleNext = () => {
    navigation.navigate("CreateAccount"); // Navigate to Onboarding1
  };

  return (
    <View style={styles.onboarding3}>
      <Image
        style={styles.danielFazioC8gq7jajpsgUnsplIcon}
        contentFit="cover"
        source={require("../assets/danielfazioc8gq7jajpsgunsplash-1.png")}
      />
      <View style={styles.cardStep}>
        <OnboardingCard
          getReadyForTheNextTrip="Find volunteering opportunities"
          findThousansOfTouristDestinatio="Discover all the details behind every volunteer journey "
          nextFontSize={33}
          propBackgroundColor="#2b3d4b"
          propAlignSelf="stretch"
          propPosition="unset"
          propTop="unset"
          propLeft="unset"
          propWidth="unset"
          next="Next"
          propColor="#fff"
          onNext={handleNext} // Pass handleNext function as a prop
        />
        <View style={styles.step}>
          <View style={[styles.stepChild, styles.stepLayout]} />
          <View style={[styles.stepChild, styles.stepLayout]} />
          <View style={[styles.stepInner, styles.stepLayout]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stepLayout: {
    borderRadius: Border.br_52xl,
    flex: 1,
  },
  danielFazioC8gq7jajpsgUnsplIcon: {
    width: "100%",
    position: "absolute",
    height: "100%",
  },
  stepChild: {
    backgroundColor: Color.colorGray_200,
  },
  stepInner: {
    backgroundColor: Color.primaryBlack0,
    height: 6,
  },
  step: {
    alignSelf: "stretch",
    flexDirection: "row",
    paddingHorizontal: Padding.p_121xl,
    paddingVertical: 0,
    gap: Gap.gap_xs,
    borderRadius: Border.br_52xl,
  },
  cardStep: {
    marginLeft: "2px",
    marginRight: "2px",
    bottom: "10%",
    gap: Gap.gap_xl,
    position: "absolute",
    width: "100%",
  },
  onboarding3: {
    width: "100%",
    overflow: "hidden",
    height: "full",
    flex: 1,
    backgroundColor: Color.primaryBlack0,
  },
});

export default Onboarding;
