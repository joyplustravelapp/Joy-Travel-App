import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import {
  FontSize,
  FontFamily,
  Color,
  Border,
  Padding,
  Gap,
} from "../GlobalStyles";

const Email1 = ({ nationality, france }) => {
  return (
    <View style={styles.email}>
      <Text style={styles.nationality}>{nationality}</Text>
      <View style={[styles.frameParent, styles.frameParentFlexBox]}>
        <View style={[styles.franceWrapper, styles.frameParentFlexBox]}>
          <Text style={styles.nationality}>{france}</Text>
        </View>
        <Image
          style={styles.weuiarrowFilledIcon}
          contentFit="cover"
          source={require("../assets/weuiarrowfilled.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  frameParentFlexBox: {
    alignItems: "center",
    flexDirection: "row",
  },
  nationality: {
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.colorGray_400,
    textAlign: "left",
  },
  franceWrapper: {
    width: 40,
    justifyContent: "space-between",
    zIndex: 0,
  },
  weuiarrowFilledIcon: {
    position: "absolute",
    top: 21,
    left: 282,
    width: 24,
    height: 12,
    overflow: "hidden",
    zIndex: 1,
  },
  frameParent: {
    borderRadius: Border.br_mini,
    borderStyle: "solid",
    borderColor: Color.colorGray_500,
    borderWidth: 1,
    width: 323,
    height: 52,
    paddingHorizontal: Padding.p_mini,
    paddingVertical: Padding.p_3xs,
    gap: Gap.gap_md,
  },
  email: {
    gap: Gap.gap_2xs,
  },
});

export default Email1;
