import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Input, Icon } from "react-native-elements";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";
import GooglePlacesInput from "../../components/GooglePlacesInput";
import BottomSheet from "reanimated-bottom-sheet";

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
  const refSheet = useRef();

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
      <MapView
        style={styles.map}
        ref={ref}
        initialRegion={location}
        showsScale
        showsPointsOfInterest
        showsBuildings
        showsUserLocation
        followsUserLocation
        loadingEnabled
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
            coordinate={destinyLocation}
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

      <BottomSheet
        ref={refSheet}
        initialSnap={2}
        snapPoints={[450, 300, 70]}
        borderRadius={40}
        enabledGestureInteraction={true}
        enabledContentTapInteraction={false}
        renderContent={() => {
          return (
            <View
              style={{
                backgroundColor: "white",
                padding: 16,
                height: 450,
              }}
            >
              <Text h3 onPress={() => refSheet.current?.snapTo(450)}>
                Crear viaje
              </Text>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={{ width: "50%" }}>
                  <GooglePlacesInput
                    destinyFunc={insertNewOriginAdress}
                    placeholder="Lugar de Origen"
                  />
                </View>
                <View style={{ width: "50%" }}>
                  <GooglePlacesInput
                    destinyFunc={insertNewDestinyAdress}
                    placeholder="Lugar de destino"
                  />
                </View>
              </View>
            </View>
          );
        }}
      />
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
});

export default CreateTravelScreen;
