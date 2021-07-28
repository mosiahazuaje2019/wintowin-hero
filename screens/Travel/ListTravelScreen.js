import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  FlatList,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import firebase from "../../database/firebase";
import { Header, Icon } from "react-native-elements";
import HeaderComponent from "../../components/HeaderComponent";

const ListTravelScreen = ({ navigation, route }) => {
  const [travels, setTravels] = useState([]);
  useEffect(() => {
    firebase.db.collection("travels").onSnapshot((querySnapshot) => {
      const travels = [];

      querySnapshot.docs.forEach((doc, index) => {
        const {
          available_tickets,
          start_point,
          ended_point,
          outTime,
          user_id,
        } = doc.data();
        travels.push({
          index: index,
          key: doc.id,
          available_tickets,
          start_point,
          ended_point,
          outTime,
          user_id,
        });
      });
      setTravels(travels);
    });
  }, []);

  const navigateToDetail = (id) => {
    navigation.navigate("DetailTravelScreen", {
      id: id,
    });
  };

  return (
    <>
      <HeaderComponent navigation={navigation} text={route.params?.title} />{" "}
      <FlatList
        data={travels}
        renderItem={({ item }) => (
          <Button
            color="black"
            title={`mi viaje ${item.index + 1}`}
            onPress={() => navigateToDetail(item.key)}
          />
        )}
      />
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
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ListTravelScreen;
