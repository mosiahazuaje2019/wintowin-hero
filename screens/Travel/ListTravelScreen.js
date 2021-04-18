import React, { useState, useEffect } from "react";
import { View, Button, FlatList, StyleSheet, Image } from "react-native";
import firebase from "../../database/firebase";

const ListTravelScreen = ({ navigation }) => {
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
    navigation.navigate('DetailTravelScreen', {
        id: id
    })
  }

  return (
      <>
    <View style={styles.container}>
        <Image
          source={{ uri: "http://159.203.82.152/assets/img/logo-white.png" }}
          style={{ width: 200, height: 80, marginTop:20 }}
        />

      </View>
      <FlatList
        data={travels}
        renderItem={({ item }) => <Button color="black" title={`mi viaje ${item.index + 1}`} onPress={() => navigateToDetail(item.key)}/>}
      />

    </>
  );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        height:100,
        maxHeight:100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#198fd5'
    },
    title:{
        fontSize: 24,
        fontWeight:'bold',
        textAlign:'center',
    }
})

export default ListTravelScreen;
