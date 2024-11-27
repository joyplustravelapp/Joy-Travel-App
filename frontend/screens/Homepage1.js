import * as React from "react";
import { Image } from "expo-image";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  useWindowDimensions,
  Button,
} from "react-native";
import { Color, FontFamily, Border, FontSize } from "../GlobalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";

const TripCard = ({
  planImage,
  planName,
  destinations,
  companions,
  from,
  to,
}) => {
  const { width } = useWindowDimensions();
  const cardWidth = width - 40; // 20px padding on each side

  return (
    <View style={[styles.tripCard, { width: cardWidth }]}>
      <Image style={styles.cardImage} contentFit="contain" source={planImage} />
      <View style={{ width: "50%" }}>
        <View style={styles.cardContent}>
          <Text style={styles.tripTitle} numberOfLines={2}>
            {planName}
          </Text>
          <Text style={styles.travelers}>
            {companions.length} travelers joined
          </Text>
          <View style={styles.locationContainer}>
            <Image
              style={styles.locationIcon}
              contentFit="cover"
              source={require("../assets/subwaylocation2.png")}
            />
            <Text style={styles.location}>{destinations[0]}</Text>
          </View>
          <Text style={styles.dates}>
            {from} - {to}
          </Text>
        </View>
      </View>
    </View>
  );
};

const Homepage1 = () => {
  const { width, height } = useWindowDimensions();
  const [trips, setTrips] = React.useState([]);
  const navigator = useNavigation();

  React.useEffect(() => {
    fetchTrips();
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

  // const trips = [
  //   {
  //     image: require("../assets/rectangle-338.png"),
  //     title: "Backpacking Vietnam - South to North 🇻🇳",
  //     location: "Vietnam",
  //     travelers: "21",
  //     dates: "March 20 - March 30",
  //   },
  //   {
  //     image: require("../assets/rectangle-3374.png"),
  //     title: "Trip India - Golden triangle 🇮🇳",
  //     location: "India",
  //     travelers: "12",
  //     dates: "May 20 - May 30",
  //   },
  //   {
  //     image: require("../assets/rectangle-339.png"),
  //     title: "Discover Tokyo Nature & Games",
  //     location: "Japan",
  //     travelers: "133",
  //     dates: "June 20 - June 30",
  //   },
  //   {
  //     image: require("../assets/rectangle-350.png"),
  //     title: "Weekend in Cartagena",
  //     location: "Colombia",
  //     travelers: "5",
  //     dates: "July 12 - July 15",
  //   },
  // ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigator.navigate("Homepage2")}>
          <Image
            style={styles.backArrow}
            contentFit="cover"
            source={require("../assets/arrow-1.png")}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Upcoming trips</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {trips.map((trip, index) => (
          <TripCard key={index} {...trip} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.primaryBlack0,
    paddingTop: 40,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "column",
    alignItems: "left",
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  backArrow: {
    width: 20,
    height: 15,
    marginRight: 10,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: FontSize.size_xl,
    color: Color.lightInk,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
  },
  tripCard: {
    flexDirection: "row",
    marginBottom: 20,
    borderRadius: 15,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: Color.colorGray_600,
    overflow: "hidden",
  },
  cardImage: {
    width: "40%",
    left: 0,
    borderTopLeftRadius: Border.br_3xs,
    borderTopRightRadius: Border.br_3xs,
  },
  cardContent: {
    padding: 10,
    alignItems: "left",
  },
  tripTitle: {
    fontSize: FontSize.size_sm,
    color: Color.lightInk,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    marginBottom: 8,
  },
  travelers: {
    fontSize: FontSize.size_xs,
    color: Color.lightInk,
    fontFamily: FontFamily.poppinsMedium,
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  locationIcon: {
    width: 13,
    height: 12,
    marginRight: 5,
  },
  location: {
    fontSize: FontSize.size_xs,
    color: Color.lightInk,
    fontFamily: FontFamily.poppinsRegular,
  },
  dates: {
    fontSize: FontSize.size_xs,
    color: Color.lightInk,
    fontFamily: FontFamily.poppinsRegular,
  },
});

export default Homepage1;
