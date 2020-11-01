import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Icon, Image } from "react-native-elements";
import { firebaseApp } from "../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import ListSolicitudes from "../../components/Solicitudes/ListSolicitudes";
import { result, size } from "lodash";
import { useFocusEffect } from "@react-navigation/native";
const db = firebase.firestore(firebaseApp);

export default function Restaurants(props) {
  const { navigation } = props;
  const [user, setUser] = useState(null);
  const [solicitudes, setSolicitudes] = useState([]);
  const [totalSolicitudes, setTotalSolicitudes] = useState(0);
  const [startSolicitudes, setStartSolicitudes] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const limitSolicitudes = 8;

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      setUser(userInfo);
    });
  }, []);


  console.log(user);
  useFocusEffect(
    useCallback(() => {
      db.collection("solicitudes")
        .get()
        .then((snap) => {
          setTotalSolicitudes(snap.size);
        });
      const resultSolicitudes = [];
      db.collection("solicitudes")
        .orderBy("createdAt", "desc")
        .limit(limitSolicitudes)
        .get()
        .then((response) => {
          setStartSolicitudes(response.docs[response.docs.length - 1]);
          response.forEach((doc) => {
            const solicitud = doc.data();
            solicitud.id = doc.id;
            resultSolicitudes.push(solicitud);
          });
          setSolicitudes(resultSolicitudes);
        });
    }, [])
  );

  const handleLoadMore = () => {
    const resultSolicitudes = [];

    solicitudes.length < totalSolicitudes && setIsLoading(true);

    db.collection("solicitudes")
      .orderBy("createdAt", "desc")
      .startAfter(startSolicitudes.data().createdAt)
      .limit(limitSolicitudes)
      .get()
      .then((response) => {
        if (response.docs.length > 0) {
          setStartSolicitudes(response.docs[response.docs.length - 1]);
        } else {
          setIsLoading(false);
        }
        response.forEach((doc) => {
          const solicitud = doc.data();
          solicitud.id = doc.id;
          resultSolicitudes.push(solicitud);
        });
        setSolicitudes([...solicitudes, ...resultSolicitudes]);
      });
  };
  return (
    <View style={styles.viewBody}>
      {user && size(solicitudes) > 0 ? (
        <ListSolicitudes
          solicitudes={solicitudes}
          handleLoadMore={handleLoadMore}
          isLoading={isLoading}
        />
      ) : (
        <PresentacionVacia />
      )}
      {user && (
        <Icon
          type="material-community"
          name="plus"
          color="#F7931C"
          reverse
          containerStyle={styles.btnContainer}
          onPress={() => navigation.navigate("addsolicitud")}
        />
      )}
    </View>
  );
}
function PresentacionVacia() {
  return (
    <View>
      <Text style={styles.tituloPrincipal}>
        ¿Aún no solicitas ningun trabajo?
      </Text>
      <View style={styles.viewPhoto}>
        <Image
          source={require("../../../assets/img/plan.png")}
          style={{ width: 400, height: 200 }}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.cuerpoTexto}>
        Inicia sesión para empezar a generar solicitudes. ¡Aquí se listarán
        todas tus solicitudes!
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  tituloPrincipal: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10,
    marginBottom: 20,
    textAlign: "center",
  },
  cuerpoTexto: {
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 20,
    marginBottom: 10,
    padding: 20,
    textAlign: "center",
  },
  viewBody: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  btnContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    shadowColor: "black",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.4,
  },
});
