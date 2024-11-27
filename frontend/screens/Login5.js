import * as React from "react";
import { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  useWindowDimensions,
  Platform,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import StatusBarwhite from "../components/StatusBarwhite";
import NavBarTextOnlyOne from "../components/NavBarTextOnlyOne";
import FrameComponent2 from "../components/FrameComponent2";
import Button1 from "../components/Button1";

// Theme constants
const THEME = {
  colors: {
    primary: "#000000",
    secondary: "#2b3d4b",
    text: {
      primary: "#232323",
      secondary: "#808080",
    },
    background: "#FFFFFF",
  },
  typography: {
    heading: {
      fontSize: Platform.select({ ios: 20, android: 19 }),
      fontFamily: Platform.select({
        ios: "Poppins-SemiBold",
        android: "Poppins-SemiBold",
      }),
      fontWeight: "600",
    },
    body: {
      fontSize: Platform.select({ ios: 12, android: 12 }),
      fontFamily: Platform.select({
        ios: "Poppins-Regular",
        android: "Poppins-Regular",
      }),
    },
  },
  spacing: {
    xs: 8,
    s: 12,
    m: 16,
    l: 24,
    xl: 32,
  },
};

const ProfileHeader = ({ title, subtitle }) => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerTitle}>{title}</Text>
    <Text style={styles.headerSubtitle}>{subtitle}</Text>
  </View>
);

const ProfileImage = ({ size, onImageSelect }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    // Request permission
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        const selectedUri = result.assets[0].uri;
        setSelectedImage(selectedUri);
        onImageSelect && onImageSelect(selectedUri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      alert("Error picking image");
    }
  };

  return (
    <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
      <Image
        style={[styles.profileImage, { width: size, height: size }]}
        contentFit="cover"
        source={
          selectedImage
            ? { uri: selectedImage }
            : require("../assets/mask-group.png")
        }
      />
      <Image
        style={[styles.addIcon, { right: 0, bottom: 0 }]}
        contentFit="cover"
        source={require("../assets/gridiconsadd.png")}
      />
    </TouchableOpacity>
  );
};

const Login5 = () => {
  const { width, height } = useWindowDimensions();
  const [profileImage, setProfileImage] = useState(null);

  // Responsive measurements
  const containerPadding = width * 0.085;
  const profileImageSize = width * 0.35;
  const buttonWidth = width * 0.85;

  const handleImageSelect = (imageUri) => {
    setProfileImage(imageUri);
    // You can handle the selected image URI here, e.g., save it to state or send to a server
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavBarTextOnlyOne />

      <View style={[styles.content, { padding: containerPadding }]}>
        <ProfileHeader
          title="Create Profile"
          subtitle="Fill out the content below to update your profile"
        />

        <ProfileImage
          size={profileImageSize}
          onImageSelect={handleImageSelect}
        />

        <FrameComponent2 />

        <View style={styles.buttonContainer}>
          <Button1
            propBackgroundColor={THEME.colors.secondary}
            propWidth={buttonWidth}
            next="Continue"
            propColor="#fff"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  content: {
    flex: 1,
    alignItems: "center",
  },
  headerContainer: {
    width: "100%",
    marginTop: THEME.spacing.xl,
    gap: THEME.spacing.xs,
  },
  headerTitle: {
    ...THEME.typography.heading,
    color: THEME.colors.text.primary,
  },
  headerSubtitle: {
    ...THEME.typography.body,
    color: THEME.colors.text.secondary,
  },
  imageContainer: {
    marginTop: THEME.spacing.xl,
    marginBottom: THEME.spacing.xl,
    position: "relative",
    alignItems: "center",
  },
  profileImage: {
    borderRadius: 999,
  },
  addIcon: {
    position: "absolute",
    width: 33,
    height: 33,
  },
  buttonContainer: {
    position: "absolute",
    bottom: Platform.select({
      ios: THEME.spacing.xl,
      android: THEME.spacing.l,
    }),
    width: "100%",
    alignItems: "center",
  },
});

export default Login5;
