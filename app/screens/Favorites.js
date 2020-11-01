import React from "react";
import { View, Text, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
export default function Favorites() {
  return (
    <View style={styles.viewPhoto}>
      <LottieView
        source={require("../../assets/img/gente.json")}
        autoPlay
        loop
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewPhoto: {
    alignItems: "center",
    height: 200,
    marginBottom: 20,
  },
});
