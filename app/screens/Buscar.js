import React from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

export default function Buscar() {
  return (
    <View style={styles.viewPhoto}>
      <LottieView
        source={require("../../assets/img/robot-animation.json")}
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
