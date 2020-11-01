import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Restaurants from "../screens/Solicitudes/Solicitudes";
import Solicitud  from "../screens/Solicitudes/Solicitud";

import AddSolicitud from "../screens/Solicitudes/AddSolicitud";
const Stack = createStackNavigator();

export default function RestaurantStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="restaurants"
        component={Restaurants}
        options={{ title: "Tus Solicitudes" }}
      />
      <Stack.Screen name="solicitud" component={Solicitud} />

      <Stack.Screen
        name="addsolicitud"
        component={AddSolicitud}
        options={{ title: "Añadir Solicitud" }}
      />
    </Stack.Navigator>
  );
}
