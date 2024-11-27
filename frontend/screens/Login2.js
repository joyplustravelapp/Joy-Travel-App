import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import NavBarTextOnlyOne from "../components/NavBarTextOnlyOne";
import StatusBarwhite from "../components/StatusBarwhite";
import Button1 from "../components/Button1";
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";

const INTERESTS_DATA = [
  {
    category: "Adventure & Outdoor",
    items: [
      { id: 1, title: "Backpacking", icon: require("../assets/group-3.png") },
      { id: 2, title: "Camping", icon: require("../assets/group-6.png") },
      { id: 3, title: "Hiking", icon: require("../assets/group-9.png") },
      {
        id: 4,
        title: "Mountain Adventures",
        icon: require("../assets/-emoji-mountain.png"),
      },
      {
        id: 5,
        title: "Beach",
        icon: require("../assets/-emoji-beach-with-umbrella.png"),
      },
      {
        id: 6,
        title: "Adventure Sports",
        icon: require("../assets/-illustration-surfing.png"),
      },
    ],
  },
  {
    category: "Culture & Arts",
    items: [
      {
        id: 7,
        title: "Museums",
        icon: require("../assets/-icon-map-museum.png"),
      },
      {
        id: 8,
        title: "Cultural Heritage Sites",
        icon: require("../assets/-illustration-chichen-itza.png"),
      },
      {
        id: 9,
        title: "Local Festivals & Events",
        icon: require("../assets/-emoji-circus-tent.png"),
      },
      { id: 10, title: "Traditional Crafts", icon: null },
      {
        id: 11,
        title: "Photography",
        icon: require("../assets/-emoji-camera-with-flash.png"),
      },
      { id: 12, title: "Music", icon: require("../assets/-icon-music.png") },
      {
        id: 13,
        title: "Cinema",
        icon: require("../assets/-emoji-film-projector.png"),
      },
      {
        id: 14,
        title: "Literature",
        icon: require("../assets/-emoji-books.png"),
      },
    ],
  },
  {
    category: "Food & Culinary",
    items: [
      {
        id: 15,
        title: "Local Markets & Street Food",
        icon: require("../assets/-emoji-taco.png"),
      },
      { id: 16, title: "Local cooking classes", icon: null },
    ],
  },
];

const InterestButton = ({ title, icon, selected, onPress }) => {
  const { width } = useWindowDimensions();
  const buttonWidth = Math.min((width - 80) / 2, 200); // Responsive width with max limit

  return (
    <View style={[styles.interestButton, { width: buttonWidth }]}>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.button, selected && styles.selectedButton]}
      >
        {icon && (
          <Image style={styles.buttonIcon} contentFit="cover" source={icon} />
        )}
        <Text
          style={[styles.buttonText, selected && styles.selectedButtonText]}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const ProgressBar = ({ currentStep, totalSteps }) => {
  const steps = Array(totalSteps).fill(0);
  return (
    <View style={styles.progressContainer}>
      {steps.map((_, index) => (
        <View
          key={index}
          style={[
            styles.progressStep,
            index <= currentStep && styles.progressStepActive,
          ]}
        />
      ))}
    </View>
  );
};

const Login2 = () => {
  const [selectedInterests, setSelectedInterests] = React.useState(new Set());
  const { width, height } = useWindowDimensions();

  const handleInterestSelect = (id) => {
    setSelectedInterests((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else if (newSet.size < 10) {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <View style={styles.container}>
      {/* <StatusBarwhite
        signalIcon={require("../assets/signal-icon.png")}
        wifi={require("../assets/wifi1.png")}
        buttary={require("../assets/buttary1.png")}
      /> */}
      <NavBarTextOnlyOne />

      <ProgressBar currentStep={2} totalSteps={8} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.title}>Interests</Text>
        <Text style={styles.subtitle}>
          Pick your 10 favorite interests ({selectedInterests.size}/10)
        </Text>

        {INTERESTS_DATA.map((category, index) => (
          <View key={index} style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{category.category}</Text>
            <View style={styles.interestsGrid}>
              {category.items.map((item) => (
                <InterestButton
                  key={item.id}
                  title={item.title}
                  icon={item.icon}
                  selected={selectedInterests.has(item.id)}
                  onPress={() => handleInterestSelect(item.id)}
                />
              ))}
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Button1
          next="Continue"
          propBackgroundColor={selectedInterests.size >= 1 ? "#2b3d4b" : "#ccc"}
          propColor="#fff"
          disabled={selectedInterests.size < 1}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.primaryBlack0,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  progressStep: {
    flex: 1,
    height: 3,
    backgroundColor: Color.colorLightgray,
    marginHorizontal: 2,
    borderRadius: Border.br_52xl,
  },
  progressStepActive: {
    backgroundColor: Color.colorDarkslategray,
  },
  title: {
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    color: Color.lightInk,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.poppinsRegular,
    color: "#797979",
    marginBottom: 20,
  },
  categoryContainer: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: FontSize.size_smi,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    color: Color.lightInk,
    marginBottom: 12,
  },
  interestsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "flex-start",
  },
  interestButton: {
    marginBottom: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: Border.br_xl,
    borderWidth: 1,
    borderColor: Color.colorDarkslategray,
    backgroundColor: "transparent",
  },
  selectedButton: {
    backgroundColor: Color.colorDarkslategray,
  },
  buttonIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  buttonText: {
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.lightInk,
  },
  selectedButtonText: {
    color: Color.primaryBlack0,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
});

export default Login2;
