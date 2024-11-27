import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Border, Color, FontSize, FontFamily } from "../GlobalStyles";

const NavBarTextOnlyOne = () => {
  return (
    <View style={styles.navBarTextOnlyOne}>
      <View style={[styles.navBarTextOnlyOne1, styles.rectanglePosition]}>
        <View style={[styles.rectangle, styles.rectanglePosition]} />
        <View style={styles.rectangle1} />
        <Text style={styles.deleteEvent}>Delete Event</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rectanglePosition: {
    left: "0%",
    bottom: "0%",
    right: "0%",
    top: "0%",
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  rectangle: {
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: {
      width: 0,
      height: -0.5,
    },
    shadowRadius: 0,
    elevation: 0,
    shadowOpacity: 1,
  },
  rectangle1: {
    height: "6.1%",
    width: "36%",
    top: "85.37%",
    right: "32%",
    bottom: "8.54%",
    left: "32%",
    borderRadius: Border.br_10xs_5,
    backgroundColor: Color.lightInk,
    position: "absolute",
  },
  deleteEvent: {
    marginTop: -25,
    top: "50%",
    left: "37.2%",
    fontSize: FontSize.size_mid,
    letterSpacing: -1,
    fontFamily: FontFamily.sFProText,
    color: Color.colorTomato_200,
    textAlign: "center",
    position: "absolute",
  },
  navBarTextOnlyOne1: {
    overflow: "hidden",
  },
  navBarTextOnlyOne: {
    height: "9.38%",
    width: "93.28%",
    top: "90.5%",
    right: "3.48%",
    bottom: "0.11%",
    left: "3.23%",
    position: "absolute",
  },
});

export default NavBarTextOnlyOne;
