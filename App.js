import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import firebase from "./database/firebase";
import LoginScreen from "./screens/Login/Login";
import ListUsers from "./screens/User/ListUsers";
import CreateTravelScreen from "./screens/Travel/CreateTravelScreen";
import DetailUserScreen from "./screens/User/DetailUserScreen";
import ListVehicles from "./screens/Vehicles/ListVehicles";
import ListWallet from "./screens/Wallet/ListWallet";
import ListTravelScreen from "./screens/Travel/ListTravelScreen";
import DetailTravelScreen from "./screens/Travel/DetailTravelScreen";
import {
  DrawerItemList,
  DrawerContentScrollView,
} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

function MyStack() {
  const [user, setUser] = useState({});

  useEffect(() => {
    firebase.firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(user);
      }
    });
  }, []);

  if (user)
    return (
      <>
        <Drawer.Navigator
          drawerContent={(props) => {
            const filteredProps = {
              ...props,
              state: {
                ...props.state,
                routeNames: props.state.routeNames.filter(
                  (routeName) => routeName !== "DetailTravelScreen"
                ),
                routes: props.state.routes.filter(
                  (route) => route.name !== "DetailTravelScreen"
                ),
              },
            };
            return (
              <DrawerContentScrollView {...filteredProps}>
                <DrawerItemList {...filteredProps} />
              </DrawerContentScrollView>
            );
          }}
        >
          {/* <Drawer.Screen name="ListUsers" component={ListUsers} options={{ title: "Mis viajes" }} />  */}
          <Drawer.Screen
            name="CreateTravelScreen"
            component={CreateTravelScreen}
            options={{ title: "Crear viaje" }}
          />
          <Drawer.Screen
            name="DetailTravelScreen"
            component={DetailTravelScreen}
          />
          <Drawer.Screen
            name="ListTravelScreen"
            component={ListTravelScreen}
            options={{ title: "Mis viajes" }}
          />
          <Drawer.Screen
            name="ListVehicles"
            component={ListVehicles}
            options={{ title: "Mis Vehiculos" }}
          />
          <Drawer.Screen
            name="ListWallet"
            component={ListWallet}
            options={{ title: "Wallet" }}
          />
          <Drawer.Screen
            name="DetailUserScreen"
            component={DetailUserScreen}
            options={{ title: "Mi perfil" }}
          />
        </Drawer.Navigator>
      </>
    );

  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Login" }}
      />
    </Drawer.Navigator>
  );
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
