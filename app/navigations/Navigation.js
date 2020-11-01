import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import RestaurantStack from "./RestaurantStack";
import FavoritesStack from "./FavoritesStack";
import BuscarStack from "./BuscarStack";
import TopRestaurantsStack from "./TopRestaurantsStack";
import AccountStack from "./AccountStack";
import { firebaseApp } from "../utils/Firebase";
import firebase from "firebase/app";

const Tab = createBottomTabNavigator();

export default function Navigation(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      setUser(userInfo);
    });
  }, []);
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="restaurants"
        tabBarOptions={{
          inactiveTintColor: "#646464",
          activeTintColor: "#F7931C",
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => screenOptions(route, color),
        })}
      >
        <Tab.Screen
          name="restaurants"
          component={RestaurantStack}
          options={{ title: "Solicitudes" }}
        ></Tab.Screen>

        <Tab.Screen
          name="toprestaurants"
          component={TopRestaurantsStack}
          options={{ title: "Top WorkerS" }}
        ></Tab.Screen>
        <Tab.Screen
          name="buscar"
          component={BuscarStack}
          options={{ title: "Buscar" }}
        ></Tab.Screen>

        <Tab.Screen
          name="account"
          component={AccountStack}
          options={{ title: "Cuenta" }}
        ></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function screenOptions(route, color) {
  let iconName;

  switch (route.name) {
    case "restaurants":
      iconName = "compass-outline";
      break;
    case "favorites":
      iconName = "progress-upload";
      break;
    case "toprestaurants":
      iconName = "star-outline";
      break;
    case "buscar":
      iconName = "magnify";
      break;
    case "account":
      iconName = "home-outline";
      break;
    default:
      break;
  }
  return (
    <Icon type="material-community" name={iconName} size={22} color={color} />
  );
}
