import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import firebase from './database/firebase';
import LoginScreen from "./screens/Login/Login";
import ListUsers from "./screens/User/ListUsers"
import CreateUserScreen from "./screens/User/CreateUserScreen"
import DetailUserScreen from "./screens/User/DetailUserScreen"

const Drawer = createDrawerNavigator();


function MyStack() {
  const [user, setUser] = useState({});

  useEffect(() => {
    firebase.firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(user)
      }
    })
  }, [])

  if (user)
    return (
      <Drawer.Navigator>
        <Drawer.Screen name="ListUsers" component={ListUsers} options={{ title: "Mis viajes" }} />
        <Drawer.Screen name="CreateUserScreen" component={CreateUserScreen} options={{ title: "Crear viaje" }} />
        <Drawer.Screen name="DetailUserScreen" component={DetailUserScreen} options={{ title: "Mi perfil" }} />
      </Drawer.Navigator>
    )

  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Login" component={LoginScreen} options={{ title: "Login" }} />
    </Drawer.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
