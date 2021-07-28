import React from "react";
import { Input } from "react-native-elements";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const GooglePlacesInput = (props) => {
  return (
    <GooglePlacesAutocomplete
      placeholder={props.placeholder}
      currentLocation={true}
      currentLocationLabel="Lugares cercanos"
      minLength={3}
      styles={{
        separator: {
          height: 0.7,
          backgroundColor: "black",
        },
        row: {
          backgroundColor: "#FFFFFF",
          padding: 10,
          height: 40,
          flexDirection: "row",
        },
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
      textInputProps={{
        InputComp: Input,
        leftIcon: { type: "font-awesome", name: "compass" },
      }}
    />
  );
};

export default GooglePlacesInput;
