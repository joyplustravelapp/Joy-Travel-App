import * as React from "react";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
  Platform,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";
import { useMemo } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const scale = SCREEN_WIDTH / 375;
const rs = (size) => Math.round(scale * size);

// Action button component
const ActionButton = React.memo(({ title, outlined, onPress }) => (
  <TouchableOpacity
    style={[styles.actionButton, outlined && styles.actionButtonOutlined]}
    onPress={onPress}
  >
    <Text
      style={[
        styles.actionButtonText,
        outlined && styles.actionButtonTextOutlined,
      ]}
    >
      {String(title)}
    </Text>
  </TouchableOpacity>
));

// Section component
const Section = React.memo(({ title, children, showSeeAll, onSeeAllPress }) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {showSeeAll && (
        <Text style={styles.seeAll} onPress={onSeeAllPress}>
          See all &gt;
        </Text>
      )}
    </View>
    {children}
  </View>
));

// Trip Card Component
// image isn't loading dynamically
const TripCard = React.memo(({ data, image }) => (
  <View style={styles.tripCard}>
    <Image
      style={styles.tripImage}
      contentFit="cover"
      source={{ uri: `../assets/${image}` }}
      alt={`${data.planImage}`}
    />
    <View style={styles.tripInfo}>
      <Text style={styles.tripTitle} numberOfLines={2}>
        {data.planName}
      </Text>
      <View style={styles.tripDetails}>
        <Text style={{ fontSize: rs(10) }}>{data.from}</Text>
        <View style={styles.locationContainer}>
          <Image
            style={styles.locationIcon}
            contentFit="cover"
            source={require("../assets/subwaylocation.png")}
          />
          <Text style={{ fontSize: rs(10) }}>{data.destinations[0]}</Text>
        </View>
      </View>
    </View>
  </View>
));

// Trending Plans Component
const TrendingPlans = React.memo(({ data }) => (
  <View style={styles.plansCard}>
    <Image
      style={styles.plansImage}
      contentFit="cover"
      source={data.planImage}
    />
    <View style={styles.plansInfo}>
      <Text style={styles.tripTitle} numberOfLines={2}>
        {data.planName}
      </Text>
      <View style={styles.tripDetails}>
        <Text style={{ fontSize: rs(10) }}>{data.from}</Text>
      </View>
    </View>
  </View>
));

// Destination Card Component
const DestinationCard = React.memo(({ data }) => (
  <View style={styles.destinationCard}>
    <Image
      style={styles.destinationImage}
      contentFit="cover"
      source={data.image}
    />
    <View style={styles.destinationOverlay}>
      <View style={styles.destinationInfo}>
        <Text style={styles.destinationTitle}>{data.title}</Text>
        <Text style={styles.destinationSubtitle}>{data.subtitle}</Text>
      </View>
      <Image
        style={styles.arrowIcon}
        contentFit="cover"
        source={require("../assets/iconamoonarrowup2thin1.png")}
      />
    </View>
  </View>
));

// Traveler Card Component
const TravelerCard = React.memo(({ data }) => (
  <View style={styles.travelerCard}>
    <Image
      style={styles.travelerImage}
      contentFit="cover"
      source={data.image}
    />
    <View style={styles.travelerInfo}>
      <View style={styles.basic}>
        <Text style={styles.travelerName}>{data.name}</Text>
        <Text style={styles.travelerDistance}>{data.distance}</Text>
      </View>
      <View style={styles.interestTags}>
        {data.interests.map((interest, index) => (
          <View key={index} style={styles.interestTag}>
            <Text style={styles.interestText}>{interest}</Text>
          </View>
        ))}
      </View>
    </View>

    <View style={styles.connectButton}>
      <Text style={styles.connectButtonText}>Connect</Text>
    </View>
  </View>
));

const Homepage2 = () => {
  // Sample data
  const [trips, setTrips] = useState([]);
  const [trendingTrips, setTrendingTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigator = useNavigation();

  useEffect(() => {
    fetchTrips();
    trending();
  }, []);

  const fetchTrips = async () => {
    console.log(1);
    try {
      let token = await AsyncStorage.getItem("token");
      console.log("Token:", token);

      // Remove double quotes if present
      token = token?.replace(/^"|"$/g, "");
      // console.log("Cleaned Token:", token);

      if (!token) {
        setError("Authentication token not found");
        setLoading(false);
        return;
      }
      // console.log("Authorization Header:", `Bearer ${token}`);

      const response = await fetch(
        "http://localhost:5001/api/homePage/upcoming-trips",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(response);
      // Check if the response is not successful
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse the JSON response
      const data = await response.json();
      // console.log("Response Data:", data);

      // Check if the data has a success property
      if (data.success) {
        setTrips(data.upcomingTrips);
      } else {
        setError("Failed to fetch trips");
      }
    } catch (err) {
      console.error("Error fetching trips:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const trending = async () => {
    console.log(1);
    try {
      let token = await AsyncStorage.getItem("token");
      console.log("Token:", token);

      // Remove double quotes if present
      token = token?.replace(/^"|"$/g, "");
      console.log("Cleaned Token:", token);

      if (!token) {
        setError("Authentication token not found");
        setLoading(false);
        return;
      }
      console.log("Authorization Header:", `Bearer ${token}`);

      const response = await fetch(
        "http://localhost:5001/api/homePage/trending-trips",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      // Check if the response is not successful
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse the JSON response
      const data = await response.json();
      console.log("Response Data:", data);

      // Check if the data has a success property
      if (data.success) {
        setTrendingTrips(data.trending);
      } else {
        setError("Failed to fetch trips");
      }
    } catch (err) {
      console.error("Error fetching trips:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const trendingPlans = [
    {
      id: "1",
      title: "Weekend in Cartegena",
      image: require("../assets/rectangle-3371.png"),
    },
    {
      id: "2",
      title: "Discover Medellin",
      image: require("../assets/rectangle-337.png"),
    },
    // Add more plans as needed
  ];

  const destinations = [
    {
      id: "1",
      title: "BOGOTA",
      subtitle: "Cultural Capital",
      image: require("../assets/rectangle-336.png"),
    },
    {
      id: "2",
      title: "MEDELLIN",
      subtitle: "City of Eternal Spring",
      image: require("../assets/rectangle-341.png"),
    },
  ];

  const travelers = [
    {
      id: "1",
      name: "JOY, 25",
      distance: "2 Km",
      interests: ["Photography"],
      image: require("../assets/ellipse-15.png"),
    },
    // Add more travelers as needed
  ];

  // Memoized header component
  const Header = useMemo(
    () => (
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Hello, Benjamin!</Text>
          <View style={styles.locationContainer}>
            <Image
              style={styles.locationIcon}
              contentFit="cover"
              source={require("../assets/subwaylocation1.png")}
            />
            <Text style={styles.location}>Bogotá, Colombia</Text>
          </View>
        </View>
        <Image
          style={styles.profileImage}
          contentFit="cover"
          source={require("../assets/ellipse-14.png")}
        />
      </View>
    ),
    []
  );

  const [selectedButton, setSelectedButton] = React.useState("1");
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {Header}

        <View style={styles.buttonContainer}>
          <ActionButton
            title="Plan a Trip"
            outlined={selectedButton != "1"}
            onPress={() => setSelectedButton("1")}
          />
          <ActionButton
            title="Find Travel Buddy"
            outlined={selectedButton != "2"}
            onPress={() => setSelectedButton("2")}
          />
        </View>

        <Section
          title="Upcoming trips"
          showSeeAll
          onSeeAllPress={() => navigator.navigate("Homepage1")}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScrollContent}
          >
            {trips.map((trip) => (
              <TripCard key={trip.id} data={trip} image={trip.planImage} />
            ))}
          </ScrollView>
        </Section>

        <Section title="Trending plans around you" showSeeAll>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScrollContent}
          >
            {trendingPlans.map((trip) => (
              <TrendingPlans key={trip.id} data={trip} />
            ))}
          </ScrollView>
        </Section>

        <Section title="Get to know Colombia" showSeeAll>
          <View style={styles.destinationsGrid}>
            {destinations.map((destination) => (
              <DestinationCard key={destination.id} data={destination} />
            ))}
          </View>
        </Section>

        <Section title="Meet travelers nearby" showSeeAll>
          <View style={styles.travelersGrid}>
            {travelers.map((traveler) => (
              <TravelerCard key={traveler.id} data={traveler} />
            ))}
          </View>
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.primaryBlack0,
  },
  scrollContent: {
    paddingHorizontal: rs(20),
    paddingTop: Platform.OS === "ios" ? rs(10) : rs(20),
    paddingBottom: rs(80),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: rs(40),
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: rs(16),
    fontFamily: FontFamily.poppinsMedium,
    color: Color.lightInk,
    marginBottom: rs(4),
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  locationIcon: {
    width: rs(10),
    height: rs(10),
    marginRight: rs(4),
  },
  location: {
    fontSize: rs(14),
    fontFamily: FontFamily.poppinsRegular,
    color: Color.lightInk,
  },
  profileImage: {
    width: rs(47),
    height: rs(47),
    borderRadius: rs(23.5),
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: rs(20),
  },
  actionButton: {
    width: "48%",
    height: rs(30),
    backgroundColor: Color.colorDarkslategray,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  actionButtonOutlined: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Color.colorGray_600,
  },
  actionButtonText: {
    color: Color.primaryBlack0,
    fontSize: rs(14),
    fontFamily: FontFamily.poppinsMedium,
  },
  actionButtonTextOutlined: {
    color: Color.lightInk,
  },
  section: {
    marginTop: rs(25),
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: rs(15),
  },
  sectionTitle: {
    fontSize: rs(16),
    fontFamily: FontFamily.poppinsSemiBold,
    color: Color.lightInk,
  },
  seeAll: {
    fontSize: rs(12),
    fontFamily: FontFamily.poppinsSemiBold,
    color: Color.colorDarkslategray,
  },
  horizontalScrollContent: {
    paddingRight: rs(20),
  },
  tripCard: {
    width: rs(197),
    marginRight: rs(15),
    borderRadius: 16,
    backgroundColor: Color.primaryBlack0,
    borderWidth: 1,
    borderColor: "#d3d3d3",
    overflow: "hidden",
  },
  plansCard: {
    width: rs(197),
    height: rs(150),
    marginRight: rs(15),
    borderRadius: 16,
    backgroundColor: Color.primaryBlack0,
    borderWidth: 1,
    borderColor: "#d3d3d3",
    overflow: "hidden",
  },
  tripImage: {
    width: "100%",
    height: rs(128),
    borderTopLeftRadius: Border.br_3xs,
    borderTopRightRadius: Border.br_3xs,
  },
  plansImage: {
    width: "100%",
    height: rs(95),
    borderTopLeftRadius: Border.br_3xs,
    borderTopRightRadius: Border.br_3xs,
  },
  tripInfo: {
    padding: rs(10),
  },
  plansInfo: {
    padding: rs(10),
    alignItems: "center",
  },
  tripTitle: {
    fontSize: rs(14),
    fontFamily: FontFamily.poppinsSemiBold,
    color: Color.lightInk,
    marginBottom: rs(8),
  },
  tripDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  destinationsGrid: {
    gap: rs(12),
  },
  destinationCard: {
    height: rs(85),
    borderRadius: Border.br_3xs,
    overflow: "hidden",
    marginBottom: rs(12),
  },
  destinationImage: {
    width: "100%",
    height: "100%",
  },
  destinationOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: rs(15),
  },
  destinationInfo: {
    flex: 1,
  },
  destinationTitle: {
    fontSize: rs(14),
    fontFamily: FontFamily.poppinsSemiBold,
    color: Color.primaryBlack0,
  },
  destinationSubtitle: {
    fontSize: rs(12),
    fontFamily: FontFamily.poppinsRegular,
    color: Color.primaryBlack0,
  },
  arrowIcon: {
    width: rs(27),
    height: rs(25),
  },
  travelersGrid: {
    gap: rs(12),
  },
  travelerCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: rs(12),
    borderWidth: 1,
    borderColor: Color.colorGray_600,
    borderRadius: Border.br_3xs,
    marginBottom: rs(12),
  },
  travelerImage: {
    width: rs(48),
    height: rs(48),
    borderRadius: rs(24),
    marginRight: rs(12),
  },
  travelerInfo: {
    flex: 1,
  },
  basic: {
    flexDirection: "row",
    alignItems: "center",
  },
  travelerName: {
    fontSize: rs(14),
    fontFamily: FontFamily.poppinsSemiBold,
    color: Color.lightInk,
  },
  travelerDistance: {
    fontSize: rs(10),
    marginLeft: rs(8),
    fontFamily: FontFamily.poppinsMedium,
    color: "gray",
  },
  interestTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: rs(8),
    marginTop: rs(2),
  },
  interestTag: {
    backgroundColor: "#d3d3d3",
    borderRadius: Border.br_8xs,
    paddingHorizontal: rs(6),
    paddingVertical: rs(2),
  },
  interestText: {
    fontSize: rs(12),
    fontFamily: FontFamily.poppinsRegular,
    color: "black",
    fontWeight: "100",
  },
  connectButton: {
    alignItems: "center",
    width: "30%",
    height: rs(30),
    backgroundColor: Color.colorDarkslategray,
    borderRadius: Border.br_8xs,
    paddingHorizontal: rs(15),
    paddingVertical: rs(5),
  },
  connectButtonText: {
    fontSize: rs(12),
    fontFamily: FontFamily.poppinsMedium,
    color: Color.primaryBlack0,
  },
});

export default React.memo(Homepage2);
