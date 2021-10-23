import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { DrawerActions, NavigationContainer } from "@react-navigation/native";
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
import DetailCalification from "./screens/Calification/DetailCalification";
import Membresy from "./screens/Membresy/Membresy";
import Contact from "./screens/Contact/Contact";
import Groups from "./screens/Groups/Group";
import HeaderComponent from "./components/HeaderComponent";

import {
  DrawerItemList,
  DrawerContentScrollView,
} from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

function MyStack() {
  const [user, setUser] = useState({});

  useEffect(() => {
    firebase.firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
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
                <View style={styles.container_menu}>
                  <Image
                    source={{
                      uri: "http://159.203.82.152/assets/img/logo.png",
                    }}
                    style={{ width: 150, height: 80 }}
                  />
                </View>
                <DrawerItemList {...filteredProps} />
              </DrawerContentScrollView>
            );
          }}
        >
          <Drawer.Screen
            name="CreateTravelScreen"
            component={CreateTravelScreen}
            initialParams={{ title: "Crear viaje" }}
            options={{ title: "Crear viaje" }}
          />
          <Drawer.Screen
            name="DetailUserScreen"
            component={DetailUserScreen}
            initialParams={{ title: "Mi perfil" }}
            options={{ title: "Mi perfil" }}
          />
          <Drawer.Screen
            name="Groups"
            component={Groups}
            initialParams={{ title: "Mi grupo" }}
            options={{ title: "Mi Grupo" }}
          />
          <Drawer.Screen
            name="DetailTravelScreen"
            initialParams={{ title: "Detalle" }}
            component={DetailTravelScreen}
          />
          <Drawer.Screen
            name="ListTravelScreen"
            component={ListTravelScreen}
            initialParams={{ title: "Mis viajes" }}
            options={{ title: "Mis viajes" }}
          />
          <Drawer.Screen
            name="ListVehicles"
            component={ListVehicles}
            initialParams={{ title: "Mis vehiculos" }}
            options={{ title: "Mis Vehiculos" }}
          />
          <Drawer.Screen
            name="ListWallet"
            component={ListWallet}
            initialParams={{ title: "Wallet" }}
            options={{ title: "Wallet" }}
          />
          <Drawer.Screen
            name="DetailCalification"
            component={DetailCalification}
            initialParams={{ title: "Calificación" }}
            options={{ title: "Calificación" }}
          />
          <Drawer.Screen
            name="Membresy"
            component={Membresy}
            initialParams={{ title: "Pago de membresia" }}
            options={{ title: "Pago de membresia" }}
          />
          <Drawer.Screen
            name="Contact"
            component={Contact}
            initialParams={{ title: "Contacto" }}
            options={{ title: "Contacto" }}
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
  container_menu: {
    flex: 1,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
