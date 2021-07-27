import React, { useRef } from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const GooglePlacesInput = (props) => {
  const ref = useRef();
  return (
    <GooglePlacesAutocomplete
      ref={ref}
      placeholder="Buscar lugar de origen"
      currentLocation={true}
      currentLocationLabel="Lugares cercanos"
      minLength={3}
      renderRightButton={() => {
        return (
          <TouchableOpacity
          style={styles.button}
          onPress={() => ref.current?.clear()}
        >
          <Text>X</Text>
        </TouchableOpacity>
        )
      }}
      debounce={300}
      fetchDetails={true}
      onPress={(_data, details = null) => {
        props.destinyFunc({
          latitude: details.geometry.location.lat,
          longitude: details.geometry.location.lng,
        });
      }}
      query={{
        key: "AIzaSyDZLHUxrwOue8mkvqEil_bZmNG99KkXpaQ",
        language: "es",
        components: "country:co",
      }}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#0096FF",
    padding: 10,
    height: 45
  }
});

export default GooglePlacesInput;
