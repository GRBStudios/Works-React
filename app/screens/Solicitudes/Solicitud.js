import React, { useState, useEffect, useCallback, useRef } from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import { Rating, ListItem, Icon } from "react-native-elements";
import { map } from "lodash";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";
import Carousel from "../../components/Carousel";
import Map from "../../components/Map";
/* import ListReviews from "../../components/Solicitudes/ListReviews";
 */
import { firebaseApp } from "../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);
const screenWidth = Dimensions.get("window").width;

export default function Solicitud(props) {
  const { navigation, route } = props;
  const { id, titulo } = route.params;
  const [solicitud, setSolicitud] = useState(null);
//   const [rating, setRating] = useState(0);
//   const [isFavorite, setIsFavorite] = useState(false);
  const [userLogged, setUserLogged] = useState(false);
  const toastRef = useRef();

  navigation.setOptions({ title: titulo });

  firebase.auth().onAuthStateChanged((user) => {
    user ? setUserLogged(true) : setUserLogged(false);
  });

  useFocusEffect(
    useCallback(() => {
      db.collection("solicitudes")
        .doc(id)
        .get()
        .then((response) => {
          const data = response.data();
          data.id = response.id;
          setSolicitud(data);
          setRating(data.rating);
        });
    }, [])
  );

/*   useEffect(() => {
    if (userLogged && solicitud) {
      db.collection("favorites")
        .where("idSolicitud", "==", solicitud.id)
        .where("idUser", "==", firebase.auth().currentUser.uid)
        .get()
        .then((response) => {
          if (response.docs.length === 1) {
            setIsFavorite(true);
          }
        });
    }
  }, [userLogged, solicitud]); */

/*   const addFavorite = () => {
    if (!userLogged) {
      toastRef.current.show(
        "Para usar el sistema de favoritos tienes que estar logeado"
      );
    } else {
      const payload = {
        idUser: firebase.auth().currentUser.uid,
        idSolicitud: solicitud.id,
      };
      db.collection("favorites")
        .add(payload)
        .then(() => {
          setIsFavorite(true);
          toastRef.current.show("Solicitude añadido a favoritos");
        })
        .catch(() => {
          toastRef.current.show("Error al añadir el restaurnate a favoritos");
        });
    }
  }; */

  /* const removeFavorite = () => {
    db.collection("favorites")
      .where("idSolicitud", "==", solicitud.id)
      .where("idUser", "==", firebase.auth().currentUser.uid)
      .get()
      .then((response) => {
        response.forEach((doc) => {
          const idFavorite = doc.id;
          db.collection("favorites")
            .doc(idFavorite)
            .delete()
            .then(() => {
              setIsFavorite(false);
              toastRef.current.show("Solicitude eliminado de favoritos");
            })
            .catch(() => {
              toastRef.current.show(
                "Error al eliminar el solicitude de favoritos"
              );
            });
        });
      });
  };
 */
  if (!solicitud) return <Loading isVisible={true} text="Cargando..." />;

  return (
    <ScrollView vertical style={styles.viewBody}>
{/*       <View style={styles.viewFavorite}>
        <Icon
          type="material-community"
          name={isFavorite ? "heart" : "heart-outline"}
          onPress={isFavorite ? removeFavorite : addFavorite}
          color={isFavorite ? "#f00" : "#000"}
          size={35}
          underlayColor="transparent"
        />
      </View> */}
      <Carousel
        arrayImages={solicitud.imagenes}
        height={250}
        width={screenWidth}
      />
      <TitleSolicitud
        name={solicitud.titulo}
        description={solicitud.descripcion}
        // rating={rating}
      />
      <SolicitudInfo
        location={solicitud.location}
        name={solicitud.direccion}
        address={solicitud.direccion}
      />
      {/* <ListReviews navigation={navigation} idSolicitud={solicitud.id} /> */}
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </ScrollView>
  );
}

function TitleSolicitud(props) {
  const { name, description, rating } = props;

  return (
    <View style={styles.viewSolicitudTitle}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.nameSolicitud}>{name}</Text>
    {/*     <Rating
          style={styles.rating}
          imageSize={20}
          readonly
          startingValue={parseFloat(rating)}
        /> */}
      </View>
      <Text style={styles.descriptionSolicitud}>{description}</Text>
    </View>
  );
}

function SolicitudInfo(props) {
  const { location, name, address } = props;

  const listInfo = [
    {
      text: address,
      iconName: "map-marker",
      iconType: "material-community",
      action: null,
    },
    {
      text: "111 222 333",
      iconName: "phone",
      iconType: "material-community",
      action: null,
    },
    {
      text: "xAgustin93@gmail.com",
      iconName: "at",
      iconType: "material-community",
      action: null,
    },
  ];

  return (
    <View style={styles.viewSolicitudInfo}>
      <Text style={styles.solicitudInfoTitle}>
        Información sobre el solicitude
      </Text>
      <Map location={location} name={name} height={100} />
      {map(listInfo, (item, index) => (
        <ListItem
          key={index}
          title={item.text}
          leftIcon={{
            name: item.iconName,
            type: item.iconType,
            color: "#00a680",
          }}
          containerStyle={styles.containerListItem}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#fff",
  },
  viewSolicitudTitle: {
    padding: 15,
  },
  nameSolicitud: {
    fontSize: 20,
    fontWeight: "bold",
  },
  descriptionSolicitud: {
    marginTop: 5,
    color: "grey",
  },
  rating: {
    position: "absolute",
    right: 0,
  },
  viewSolicitudInfo: {
    margin: 15,
    marginTop: 25,
  },
  solicitudInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  containerListItem: {
    borderBottomColor: "#d8d8d8",
    borderBottomWidth: 1,
  },
  viewFavorite: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 2,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 100,
    padding: 5,
    paddingLeft: 15,
  },
});