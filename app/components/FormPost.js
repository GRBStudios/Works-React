import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Input, Button, Tile } from "react-native-elements";
export default function FormPost() {
  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
  ];
  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
  return (
    <View style={styles.formContainer}>
      <TouchableOpacity></TouchableOpacity>
      <Tile
        imageSrc={require("../../assets/img/user-guest.jpg")}
        title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores dolore exercitationem"
        caption="Some Caption Text"
        containerStyle={styles.tileContainer}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  inputForm: {
    width: "100%",
    marginTop: "15",
  },
  formContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  tileContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
