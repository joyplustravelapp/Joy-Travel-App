import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import StatusBarwhite from "../components/StatusBarwhite";
import OnboardingCard from "../components/OnboardingCard";
import StatusBar1 from "../components/StatusBar1";
import { Border, Color, Padding, Gap } from "../GlobalStyles";
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const Onboarding1 = () => {
  const navigation = useNavigation(); // Get navigation object

  const handleNext = () => {
    navigation.navigate("Onboarding"); // Navigate to Onboarding2
  };
  return (
    <View style={styles.onboarding2}>
      <StatusBarwhite
        signalIcon={require("../assets/signal-icon.png")}
        wifi={require("../assets/wifi5.png")}
        buttary={require("../assets/buttary.png")}
        visualsofdanaSKTSGbqeUnspIconMarginLeft={-197}
        visualsofdanaSKTSGbqeUnspIconLeft="50%"
        visualsofdanaSKTSGbqeUnspIconWidth={393}
        visualsofdanaSKTSGbqeUnspIconRight="unset"
        signalIconColor="#000"
      />
      <Image
        style={styles.connorGanYvje53efryiUnsplasIcon}
        contentFit="cover"
        source={require("../assets/connorganyvje53efryiunsplash-1.png")}
      />
      <View style={styles.cardStep}>
        <OnboardingCard
          getReadyForTheNextTrip="Discover the best activities around"
          findThousansOfTouristDestinatio="Dive into activities and uncover hidden gems for an unforgetable adventure "
          nextFontSize={33}
          propBackgroundColor="#2b3d4b"
          propAlignSelf="centered"
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
          <View style={[styles.stepItem, styles.stepLayout]} />
          <View style={[styles.stepChild, styles.stepLayout]} />
        </View>
      </View>
      <StatusBar1 />
    </View>
  );
};

const styles = StyleSheet.create({
  stepLayout: {
    borderRadius: Border.br_52xl,
    flex: 1,
  },
  connorGanYvje53efryiUnsplasIcon: {
    width: "100%",
    position: "absolute",
    height: "100%",
  },
  stepChild: {
    backgroundColor: Color.colorGray_200,
  },
  stepItem: {
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
  onboarding2: {
    width: "100%",
    overflow: "hidden",
    height: "full",
    flex: 1,
    backgroundColor: Color.primaryBlack0,
  },
});

export default Onboarding1;
