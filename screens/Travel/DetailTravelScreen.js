import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import firebase from "../../database/firebase";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { ScrollView } from "react-native-gesture-handler";
import MapViewDirections from "react-native-maps-directions";
import HeaderComponent from "../../components/HeaderComponent";

const ListTravelScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [travel, setTravel] = useState({});
  const [adresses, setAdresses] = useState({});
  const ref = useRef();

  useEffect(() => {
    const travelRef = firebase.db.collection("travels").doc(id);
    travelRef.get().then((doc) => {
      setTravel(doc.data());
      ref.current?.fitToSuppliedMarkers(["origin", "destiny"]);
    });
  }, [id]);

  return (
    <>
      <ScrollView>
        <HeaderComponent navigation={navigation} text={route.params?.title} />
        <View>
          {travel.start_point && travel.ended_point && (
            <MapView
              ref={ref}
              style={styles.map}
              initialRegion={{
                latitude: travel.start_point.latitude,
                longitude: travel.start_point.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
            >
              <Marker
                identifier="origin"
                coordinate={{
                  latitude: travel.start_point.latitude,
                  longitude: travel.start_point.longitude,
                }}
                title="Locacion actual"
              />

              <Marker
                identifier="destiny"
                coordinate={{
                  latitude: travel.ended_point.latitude,
                  longitude: travel.ended_point.longitude,
                }}
                title="Locacion de destino"
              />

              <MapViewDirections
                origin={{
                  latitude: travel.start_point.latitude,
                  longitude: travel.start_point.longitude,
                }}
                destination={{
                  latitude: travel.ended_point.latitude,
                  longitude: travel.ended_point.longitude,
                }}
                strokeWidth={3}
                strokeColor="hotpink"
                apikey={"AIzaSyDZLHUxrwOue8mkvqEil_bZmNG99KkXpaQ"}
              />
            </MapView>
          )}
          <Text>Tickets disponibles: {travel?.available_tickets}</Text>
          <Text>
            Fecha de creación: {travel?.created_at?.toDate()?.toDateString()}
          </Text>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    maxHeight: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#198fd5",
  },
  title: {
    marginTop: 5,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  map: {
    width: 300,
    marginLeft: 30,
    marginTop: 10,
    height: 450,
  },
});

export default ListTravelScreen;
