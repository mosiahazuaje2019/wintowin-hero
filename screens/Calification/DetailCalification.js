import React, { useEffect, useState } from "react";
import { Text, Image, View, ScrollView, StyleSheet } from "react-native";
import {
  ListItem,
  Avatar,
  Header,
  Icon,
  Rating,
  AirbnbRating,
} from "react-native-elements";
import firebase from "../../database/firebase";
import HeaderComponent from "../../components/HeaderComponent";

const DetailCalification = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    firebase.db.collection("users").onSnapshot((querySnapshot) => {
      const users = [];

      querySnapshot.docs.forEach((doc) => {
        const { name, email, phone } = doc.data();
        users.push({
          id: doc.id,
          name,
          email,
          phone,
        });
      });

      setUsers(users);
    });
  }, []);

  return (
    <View>
      <HeaderComponent
        navigation={props.navigation}
        text={props.route.params?.title}
      />

      <Rating showRating fractions="{1}" startingValue="{3.3}" />
      <AirbnbRating
        count={11}
        reviews={[
          "Terrible",
          "Bad",
          "Meh",
          "OK",
          "Good",
          "Hmm...",
          "Very Good",
          "Wow",
          "Amazing",
          "Unbelievable",
          "Jesus",
        ]}
        defaultRating={11}
        size={20}
      />
    </View>
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
    marginBottom: 15,
  },
});

export default DetailCalification;
