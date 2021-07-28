import React, { useEffect, useState } from "react";
import { Text, Image, View, ScrollView, StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import firebase from "../../database/firebase";
import HeaderComponent from "../../components/HeaderComponent";


const ListVehicles = (props) => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    firebase.db.collection("vehicles").onSnapshot((querySnapshot) => {
      const vehicles = [];

      querySnapshot.docs.forEach((doc) => {
        const { name, engine } = doc.data();
        vehicles.push({
          id: doc.id,
          name,
          engine,
        });
      });

      setVehicles(vehicles);
    });
  }, []);

  return (
    <ScrollView>
      <HeaderComponent
        navigation={props.navigation}
        text={props.route.params?.title}
      />
      {vehicles.map((vehicle) => {
        return (
          <ListItem
            key={vehicle.id}
            bottomDivider
            onPress={() =>
              props.navigation.navigate("DetailUserScreen", {
                id,
              })
            }
          >
            <ListItem.Chevron />
            <Avatar
              rounded
              source={{
                uri: "https://awscdn.audi.com.co/media/GalleryThumbnails_Slider_Image_Component/59635-584786-slider-355894/dh-1324-a9ad28/c4698ba8/1612523733/1920x1080-ar8-d-181003.jpg",
              }}
            />
            <ListItem.Content>
              <ListItem.Title>{vehicle.name}</ListItem.Title>
              <ListItem.Subtitle>{vehicle.engine}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
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
});

export default ListVehicles;
