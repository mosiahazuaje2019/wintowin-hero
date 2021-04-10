import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Button,
  TextInput,
  ScrollView,
  StyleSheet,
  Image,
  Text,
  Dimensions,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import firebase from "../../database/firebase";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapViewDirections from "react-native-maps-directions";

const CreateTravelScreen = () => {
  function regionFrom(lat, lon, accuracy) {
    const oneDegreeOfLongitudeInMeters = 111.32 * 1000;
    const circumference = (40075 / 360) * 1000;

    const latDelta = accuracy * (1 / (Math.cos(lat) * circumference));
    const lonDelta = accuracy / oneDegreeOfLongitudeInMeters;

    return {
      latitude: lat,
      longitude: lon,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    };
  }

  async function insertNewOriginAdress({ lat, lng }) {
    setLocation(regionFrom(lat, lng, 0));
  }

  async function insertNewDestinyAdress({ lat, lng }) {
    setDestinyLocation(regionFrom(lat, lng, 0));
  }

  const [state, setState] = useState({
    start_point: "",
    ended_point: "",
    available_tickets: "",
    outTime: "",
    user_id: "",
  });
  const [location, setLocation] = useState(null);
  const [destinyLocation, setDestinyLocation] = useState(null);
  const [currentAdress, setCurrentAdress] = useState(null);
  const ref = useRef();

  useEffect(() => {
    ref.current?.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: location.latitudeDelta,
      longitudeDelta: location.longitudeDelta,
    });
  }, [location]);

  useEffect(() => {
    ref.current?.fitToSuppliedMarkers(["origin", "destiny"]);
  }, [destinyLocation]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      const latitudeX = userLocation.coords.latitude;
      const longitudeY = userLocation.coords.longitude;
      const accuracy = userLocation.coords.accuracy;
      setLocation(regionFrom(latitudeX, longitudeY, accuracy));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const address = await Location.reverseGeocodeAsync(location);
      setCurrentAdress(address[0]);
    })();
  }, [location]);

  const handleChangeText = (name, value) => {
    setState({ ...state, [name]: value });
  };

  const addTravel = async () => {
    try {
      await firebase.db.collection("travels").add({
        start_point: state.start_point,
        ended_point: state.ended_point,
        available_tickets: state.available_tickets,
        outTime: state.outTime,
        user_id: state.user_id,
      });
      //props.navigation.navigate('ListUsers');
    } catch (error) {
      console.log("error al generar el registro");
    }
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <View style={styles.logoTop}>
        <Image
          source={{ uri: "http://159.203.82.152/assets/img/logo-white.png" }}
          style={{ width: 200, height: 80, marginTop: 20 }}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Creando viaje</Text>
        {location && (
          <MapView
            style={styles.map}
            ref={ref}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: location.latitudeDelta,
              longitudeDelta: location.longitudeDelta,
            }}
          >
            <Marker
              identifier="origin"
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title="Locacion actual"
            />

            {destinyLocation && (
              <Marker
                identifier="destiny"
                coordinate={{
                  latitude: destinyLocation.latitude,
                  longitude: destinyLocation.longitude,
                }}
                title="Locacion de destino"
              />
            )}
            {location && destinyLocation && <MapViewDirections
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
            /> }
          </MapView>
        )}
        <View style={styles.inputGroup}>
          <GooglePlacesAutocomplete
            placeholder="Buscar lugar de origen"
            minLength={3}
            autoFocus={false}
            returnKeyType={"default"}
            keyboardAppearance={"light"}
            followUserLocation={true}
            listViewDisplayed={"false"}
            currentLocation={true}
            currentLocationLabel={"Lugar actual"}
            fetchDetails={true}
            onPress={(data, details = null) => {
              insertNewOriginAdress(details.geometry.location);
            }}
            query={{
              key: "AIzaSyDZLHUxrwOue8mkvqEil_bZmNG99KkXpaQ",
              language: "es",
              components: "country:co",
            }}
          />
        </View>
        <View style={styles.inputGroup}>
          <GooglePlacesAutocomplete
            placeholder="Buscar lugar de destino"
            minLength={3}
            autoFocus={false}
            returnKeyType={"default"}
            keyboardAppearance={"light"}
            followUserLocation={true}
            listViewDisplayed={"false"}
            fetchDetails={true}
            onPress={(data, details = null) => {
              insertNewDestinyAdress(details.geometry.location);
            }}
            query={{
              key: "AIzaSyDZLHUxrwOue8mkvqEil_bZmNG99KkXpaQ",
              language: "es",
              components: "country:co",
            }}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder="Cupos disponiblea"
            onChangeText={(value) =>
              handleChangeText("available_tickets", value)
            }
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder="Hora de salida"
            onChangeText={(value) => handleChangeText("outTime", value)}
          />
        </View>
        <View>
          <Button title="Guardar viaje" onPress={() => addTravel()}></Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
    backgroundColor: "#ffffff",
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  logoTop: {
    flex: 1,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#198fd5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  map: {
    width: 300,
    height: 550,
  },
});

export default CreateTravelScreen;
