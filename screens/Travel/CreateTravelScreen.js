import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";
import GooglePlacesInput from "../../components/GooglePlacesInput";
import HeaderComponent from "../../components/HeaderComponent";

const CreateTravelScreen = ({ navigation, route }) => {
  const [location, setLocation] = useState({
    latitude: 4.61059,
    longitude: -74.11491,
    latitudeDelta: 1,
    longitudeDelta: 1,
  });

  const [destinyLocation, setDestinyLocation] = useState(null);
  const [_currentAdress, setCurrentAdress] = useState(null);
  const ref = useRef();

  function regionFrom(lat, lon, rotation = 0) {
    return {
      latitude: lat,
      longitude: lon,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
      rotation,
    };
  }

  async function findUserLocation() {
    return await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 1000,
        distanceInterval: 50,
      },
      (userLocation) => {
        const latitude = userLocation.coords.latitude;
        const longitude = userLocation.coords.longitude;
        const rotation = userLocation.coords.heading;
        setLocation(regionFrom(latitude, longitude, rotation));
      }
    );
  }

  async function insertNewOriginAdress({ latitude, longitude }) {
    setLocation(regionFrom(latitude, longitude));
  }

  async function insertNewDestinyAdress({ latitude, longitude }) {
    setDestinyLocation(regionFrom(latitude, longitude));
  }

  useEffect(() => {
    (async () => {
      const address = await Location.reverseGeocodeAsync(location);
      setCurrentAdress(address[0]);
    })();
    ref.current?.animateToRegion(location);
  }, [location]);

  useEffect(() => {
    ref.current?.fitToSuppliedMarkers(["origin", "destiny"]);
  }, [destinyLocation]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      await findUserLocation();
    })();
  }, []);

  return (
    <>
      <HeaderComponent navigation={navigation} text={route.params?.title} />
      <MapView
        style={styles.map}
        ref={ref}
        initialRegion={location}
        showsScale
        showsCompass
        showsPointsOfInterest
        showsBuildings
        showsMyLocationButton
        showsUserLocation
        followsUserLocation
        loadingEnabled
        zoomEnabled
        zoomControlEnabled
        showsTraffic={false}
      >
        <Marker
          identifier="origin"
          draggable
          pinColor="#0096FF"
          onDragEnd={(e) => insertNewOriginAdress(e.nativeEvent.coordinate)}
          coordinate={location}
          title="Punto de origen"
        />

        {destinyLocation && (
          <Marker
            identifier="destiny"
            draggable
            pinColor="#0096FF"
            onDragEnd={(e) => insertNewDestinyAdress(e.nativeEvent.coordinate)}
            coordinate={location}
            title="Punto de destino"
          />
        )}
        {location && destinyLocation && (
          <MapViewDirections
            origin={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            destination={{
              latitude: destinyLocation.latitude,
              longitude: destinyLocation.longitude,
            }}
            strokeWidth={3}
            strokeColor="hotpink"
            apikey={"AIzaSyDZLHUxrwOue8mkvqEil_bZmNG99KkXpaQ"}
          />
        )}
      </MapView>
      <View style={styles.inputView}>
        <GooglePlacesInput destinyFunc={insertNewDestinyAdress} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  inputView: {
    position: "absolute",
    top: 90,
    width: "70%",
    textAlign: "center",
    flex: 1,
    alignSelf: "center",
  },
});

export default CreateTravelScreen;
