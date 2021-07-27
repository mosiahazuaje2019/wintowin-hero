import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";
import GooglePlacesInput from "../../components/GooglePlacesInput";

const CreateTravelScreen = ({ navigation }) => {
  const [location, setLocation] = useState({
    latitude: 4.61059,
    longitude: -74.11491,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
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
    const userLocation = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation,
    });

    const latitude = userLocation.coords.latitude;
    const longitude = userLocation.coords.longitude;
    const rotation = userLocation.coords.heading;
    return setLocation(regionFrom(latitude, longitude, rotation));
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

  const interval = async () => {
    await findUserLocation();
  }

  setTimeout(interval, 2000)

  return (
    <>
      <MapView style={styles.map} ref={ref} initialRegion={location}>
        <Marker
          identifier="origin"
          draggable
          pinColor="#0096FF"
          rotation={location.rotation}
          onDragEnd={(e) => insertNewOriginAdress(e.nativeEvent.coordinate)}
          coordinate={location}
          title="Ubicación actual"
        />

        {destinyLocation && (
          <Marker
            identifier="destiny"
            draggable
            pinColor="#0096FF"
            onDragEnd={(e) => insertNewDestinyAdress(e.nativeEvent.coordinate)}
            coordinate={location}
            title="Ubicación de destino"
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
    position: "relative",
  },
  inputView: {
    position: "absolute",
    top: 40,
    width: "90%",
    flex: 1,
    alignSelf: "center",
  },
});

export default CreateTravelScreen;
