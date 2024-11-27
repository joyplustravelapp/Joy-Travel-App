import * as React from "react";
import { Image } from "expo-image";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { FontFamily, Color, FontSize, Border } from "../GlobalStyles";
import { useMemo } from "react";

const { width, height } = Dimensions.get("window");

const Homepage = () => {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  // Memoized responsive styles
  const dynamicStyles = useMemo(() => {
    const isSmallDevice = windowWidth < 375;
    const cardWidth = Math.min(windowWidth - 40, 346);

    return StyleSheet.create({
      container: {
        paddingHorizontal: windowWidth * 0.05,
        paddingBottom: windowHeight * 0.05,
      },
      mainImage: {
        width: cardWidth,
        height: cardWidth * 0.378, // Maintain aspect ratio
        alignSelf: "center",
      },
      profileImages: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
      },
      actionButton: {
        width: cardWidth,
        alignSelf: "center",
      },
      interestsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginTop: 10,
      },
      interestItem: {
        width: isSmallDevice ? "100%" : "48%",
        marginBottom: 10,
      },
      textContent: {
        width: cardWidth,
      },
    });
  }, [windowWidth]);

  const renderInterestItem = (text, icon, width = "48%") => (
    <View style={[styles.interestBox, { width }, dynamicStyles.interestItem]}>
      <Image contentFit="cover" source={icon} style={styles.interestIcon} />
      <Text style={styles.interestText}>{text}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={dynamicStyles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <Image
            style={styles.backArrow}
            contentFit="cover"
            source={require("../assets/arrow-1.png")}
          />
          <Image
            style={styles.menuIcon}
            contentFit="cover"
            source={require("../assets/ellipse-21.png")}
          />
        </View>

        {/* Main Image */}
        <Image
          style={[styles.mainImage, dynamicStyles.mainImage]}
          contentFit="cover"
          source={require("../assets/rectangle-346.png")}
        />

        {/* Trip Details */}
        <View style={styles.tripDetails}>
          <Text style={styles.tripTitle}>
            Backpacking Vietnam - South to North 🇻🇳
          </Text>
          <View style={styles.dateLocation}>
            <Image
              style={styles.dateIcon}
              contentFit="cover"
              source={require("../assets/uiwdate.png")}
            />
            <Text style={styles.dateText}>March 20 - March 30</Text>
            <Image
              style={styles.locationIcon}
              contentFit="cover"
              source={require("../assets/vector.png")}
            />
            <Text style={styles.locationText}>Vietnam</Text>
          </View>
        </View>

        {/* Profile Images */}
        <View style={[styles.profileImages, dynamicStyles.profileImages]}>
          <Image
            style={styles.profileImage}
            contentFit="cover"
            source={require("../assets/ellipse-151.png")}
          />
          <Image
            style={styles.profileImage}
            contentFit="cover"
            source={require("../assets/ellipse-22.png")}
          />
          <Image
            style={styles.profileImage}
            contentFit="cover"
            source={require("../assets/ellipse-23.png")}
          />
          <Image
            style={styles.profileImage}
            contentFit="cover"
            source={require("../assets/ellipse-24.png")}
          />
          <View style={styles.remainingCount}>
            <Text style={styles.countText}>+17</Text>
          </View>
        </View>

        {/* View Group Button */}
        <View style={[styles.viewGroupButton, dynamicStyles.actionButton]}>
          <Text style={styles.viewGroupText}>View Group</Text>
        </View>

        {/* About Trip Section */}
        <View style={[styles.section, dynamicStyles.textContent]}>
          <Text style={styles.sectionTitle}>About Trip</Text>
          <View style={styles.descriptionBox}>
            <Text style={styles.description}>
              In Vietnam for 3 weeks, would like to discover Hô Chi Minh, Da
              Lat, Hoi An, Ninh Binh, Hanoi & do the Ha Giang Loop with
              adventurous travelers.
            </Text>
          </View>
        </View>

        {/* Interests Section */}
        <View style={[styles.section, dynamicStyles.textContent]}>
          <Text style={styles.sectionTitle}>Interests</Text>
          <View style={dynamicStyles.interestsContainer}>
            {renderInterestItem(
              "Backpacking",
              require("../assets/group-31.png")
            )}
            {renderInterestItem("Camping", require("../assets/group-61.png"))}
            {renderInterestItem(
              "Adventure Sports",
              require("../assets/-illustration-surfing1.png")
            )}
            {renderInterestItem("Hiking", require("../assets/group-91.png"))}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <View style={[styles.leaveButton, dynamicStyles.actionButton]}>
            <Text style={styles.leaveButtonText}>Leave Plan</Text>
          </View>
          <View style={[styles.reportButton, dynamicStyles.actionButton]}>
            <Text style={styles.reportButtonText}>Report Plan</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.primaryBlack0,
    paddingTop: height * 0.05,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },
  backArrow: {
    width: 20,
    height: 15,
  },
  menuIcon: {
    width: 47,
    height: 47,
  },
  mainImage: {
    borderRadius: Border.br_3xs,
  },
  tripDetails: {
    marginVertical: 15,
  },
  tripTitle: {
    fontSize: FontSize.size_mid,
    fontFamily: FontFamily.poppinsSemiBold,
    color: Color.lightInk,
    marginBottom: 10,
  },
  dateLocation: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  dateIcon: {
    width: 17,
    height: 17,
    marginRight: 8,
  },
  dateText: {
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.lightInk,
    marginRight: 15,
  },
  locationIcon: {
    width: 12,
    height: 12,
    marginRight: 8,
  },
  locationText: {
    fontSize: FontSize.size_smi,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.lightInk,
  },
  profileImage: {
    width: 47,
    height: 47,
    marginRight: -15,
  },
  remainingCount: {
    width: 47,
    height: 47,
    backgroundColor: "#E0E0E0",
    borderRadius: 23.5,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  countText: {
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.lightInk,
  },
  viewGroupButton: {
    height: 44,
    backgroundColor: Color.colorDarkslategray,
    borderRadius: Border.br_3xs,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
  },
  viewGroupText: {
    fontSize: FontSize.size_mini,
    fontFamily: FontFamily.poppinsSemiBold,
    color: Color.primaryBlack0,
  },
  section: {
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.poppinsSemiBold,
    color: Color.lightInk,
    marginBottom: 10,
  },
  descriptionBox: {
    borderWidth: 1,
    borderColor: Color.colorGray_600,
    borderRadius: Border.br_3xs,
    padding: 12,
  },
  description: {
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.lightInk,
  },
  interestBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Color.colorGray_600,
    borderRadius: Border.br_3xs,
    padding: 8,
    marginBottom: 10,
  },
  interestIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  interestText: {
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.lightInk,
  },
  actionButtons: {
    marginVertical: 15,
  },
  leaveButton: {
    height: 44,
    backgroundColor: "#edc9c7",
    borderRadius: Border.br_3xs,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  leaveButtonText: {
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.colorTomato_200,
  },
  reportButton: {
    height: 44,
    borderWidth: 1,
    borderColor: Color.colorGray_500,
    borderRadius: Border.br_3xs,
    justifyContent: "center",
    alignItems: "center",
  },
  reportButtonText: {
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.colorDarkgray,
  },
});

export default Homepage;
