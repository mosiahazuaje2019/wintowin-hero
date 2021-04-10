import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const GooglePlacesInput = () => {
  return (
    <GooglePlacesAutocomplete
      placeholder="Buscar lugar de origen"
      placeholder="Your address"
      minLength={1}
      autoFocus={false}
      returnKeyType={"default"}
      keyboardAppearance={"light"}
      listViewDisplayed={false}
      fetchDetails={true}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data);
      }}
      query={{
        key: "AIzaSyDZLHUxrwOue8mkvqEil_bZmNG99KkXpaQ",
        language: "es",
        components: "country:co",
      }}
    />
  );
};

export default GooglePlacesInput;
