import * as React from "react";
import { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  Platform,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  Color,
  FontFamily,
  Padding,
  Border,
  FontSize,
  Gap,
} from "../GlobalStyles";

// List of countries - you can expand this
const COUNTRIES = [
  "Afghanistan",
  "Albania",
  "Algeria" /* ... add more countries ... */,
  "France",
  "Germany",
  "United States",
  "United Kingdom",
  "India",
].sort();

const GENDERS = ["Male", "Female", "Other", "Prefer not to say"];

const FrameComponent2 = () => {
  const [formData, setFormData] = useState({
    avatar: null,
    name: "",
    email: "",
    dateOfBirth: new Date(),
    nationality: "",
    gender: "",
    phoneNumber: "",
    countryCode: "+91",
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [showGenderPicker, setShowGenderPicker] = useState(false);

  const pickImage = async () => {
    // Request permission first
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
        setFormData({ ...formData, avatar: result.assets[0].uri });
      }
    } catch (error) {
      console.error("Error picking image:", error);
      alert("Error picking image");
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const renderDropdownModal = (visible, data, onSelect, onClose, title) => (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{title}</Text>
          <FlatList
            data={data}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
              >
                <Text style={styles.modalItemText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <ScrollView>
      <View style={styles.emailParent}>
        {/* Name Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            placeholder="Enter your name"
          />
        </View>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Date of Birth */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Date of Birth</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.inputText}>
              {formatDate(formData.dateOfBirth)}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={formData.dateOfBirth}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  setFormData({ ...formData, dateOfBirth: selectedDate });
                }
              }}
            />
          )}
        </View>

        {/* Nationality Dropdown */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nationality</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowCountryPicker(true)}
          >
            <Text style={styles.inputText}>
              {formData.nationality || "Select nationality"}
            </Text>
            <Image
              style={styles.caretDownIcon}
              contentFit="cover"
              source={require("../assets/caretdown.png")}
            />
          </TouchableOpacity>
        </View>

        {/* Gender Dropdown */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Gender</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowGenderPicker(true)}
          >
            <Text style={styles.inputText}>
              {formData.gender || "Select gender"}
            </Text>
            <Image
              style={styles.caretDownIcon}
              contentFit="cover"
              source={require("../assets/caretdown.png")}
            />
          </TouchableOpacity>
        </View>

        {/* Phone Number */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone Number</Text>
          <View style={styles.phoneInputContainer}>
            <Text style={styles.countryCode}>{formData.countryCode}</Text>
            <TextInput
              style={styles.phoneInput}
              value={formData.phoneNumber}
              onChangeText={(text) =>
                setFormData({ ...formData, phoneNumber: text })
              }
              placeholder="Enter phone number"
              keyboardType="phone-pad"
            />
          </View>
        </View>

        {/* Modals */}
        {renderDropdownModal(
          showCountryPicker,
          COUNTRIES,
          (country) => setFormData({ ...formData, nationality: country }),
          () => setShowCountryPicker(false),
          "Select Nationality"
        )}

        {renderDropdownModal(
          showGenderPicker,
          GENDERS,
          (gender) => setFormData({ ...formData, gender: gender }),
          () => setShowGenderPicker(false),
          "Select Gender"
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  emailParent: {
    padding: 20,
    gap: Gap.gap_lg,
  },
  inputContainer: {
    gap: Gap.gap_2xs,
  },
  label: {
    fontSize: FontSize.size_xs,
    color: Color.colorGray_400,
    fontFamily: FontFamily.poppinsRegular,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: Color.colorGray_500,
    borderRadius: Border.br_mini,
    paddingHorizontal: Padding.p_mini,
    paddingVertical: Padding.p_3xs,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputText: {
    color: Color.colorGray_400,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_sm,
    width: "90%",
  },
  phoneInputContainer: {
    flexDirection: "row",
    height: 52,
    borderWidth: 1,
    borderColor: Color.colorGray_500,
    borderRadius: Border.br_mini,
    alignItems: "center",
    marginBottom: "20%",
  },
  countryCode: {
    paddingHorizontal: Padding.p_mini,
    color: Color.colorGray_400,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_sm,
  },
  phoneInput: {
    flex: 1,
    height: "100%",
    paddingHorizontal: Padding.p_mini,
  },
  caretDownIcon: {
    width: 19,
    height: 18,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: Border.br_mini,
    padding: 20,
    width: "100%",
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.poppinsRegular,
    marginBottom: 10,
    textAlign: "center",
  },
  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: Color.colorGray_500,
  },
  modalItemText: {
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.poppinsRegular,
  },
  closeButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: Color.colorGray_500,
    borderRadius: Border.br_mini,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.poppinsRegular,
  },
});

export default FrameComponent2;

// ----------------------------------------------------------------

// return (
//   <ScrollView>

//       {/* Rest of the form fields remain the same */}
//       {/* Name Input */}
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Name</Text>
//         <TextInput
//           style={styles.input}
//           value={formData.name}
//           onChangeText={(text) => setFormData({ ...formData, name: text })}
//           placeholder="Enter your name"
//         />
//       </View>

//       {/* ... rest of your existing form code ... */}
//     </View>
//   </ScrollView>
// );

// const styles = StyleSheet.create({
//   // ... existing styles ...

//   avatarContainer: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   avatarButton: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     overflow: 'hidden',
//     backgroundColor: Color.colorGray_500,
//   },
//   avatarImage: {
//     width: '100%',
//     height: '100%',
//   },
//   avatarPlaceholder: {
//     width: '100%',
//     height: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f0f0f0',
//   },
//   plusIcon: {
//     width: 30,
//     height: 30,
//   },
//   avatarLabel: {
//     marginTop: 8,
//     fontSize: FontSize.size_xs,
//     color: Color.colorGray_400,
//     fontFamily: FontFamily.poppinsRegular,
//   },
//   // ... rest of your existing styles ...
// });

// export default FrameComponent2;
