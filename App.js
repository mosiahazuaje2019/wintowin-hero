import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from './database/firebase';

const Stack = createStackNavigator();

import LoginScreen  from "./screens/Login/Login";
import ListUsers from "./screens/User/ListUsers"
import CreateUserScreen from "./screens/User/CreateUserScreen"
import DetailUserScreen from "./screens/User/DetailUserScreen"


function MyStack(){
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{title:"Bienvenido"}} />
      <Stack.Screen name="ListUsers" component={ListUsers} options={{title:"Lista de usuarios"}} />
      <Stack.Screen name="CreateUserScreen" component={CreateUserScreen} options={{title:"Crear usuarios"}} />
      <Stack.Screen name="DetailUserScreen" component={DetailUserScreen} options={{title:"Detalle de usuarios"}} />
    </Stack.Navigator>
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
