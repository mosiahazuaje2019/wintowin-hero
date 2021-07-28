import React from "react";
import { Image, View, StyleSheet } from "react-native";
import { Header, Icon } from "react-native-elements";

const HeaderComponent = ({navigation, text}) => {
  return (
    <Header
      placement="left"
      leftComponent={
        <Icon name="menu" onPress={() => navigation.toggleDrawer()} />
      }
      centerComponent={{ text: text, style: { color: "#fff", fontSize: 25 } }}
      rightComponent={
        <Image
          source={{ uri: "http://159.203.82.152/assets/img/logo-white.png" }}
          style={{ width: 100, height: 40 }}
        />
      }
    />
  );
};

export default HeaderComponent;
