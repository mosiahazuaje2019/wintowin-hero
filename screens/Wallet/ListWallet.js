import React, { useEffect, useState } from 'react'
import { Text, Image, View, ScrollView, StyleSheet } from "react-native";
import {ListItem, Avatar, Header, Icon} from "react-native-elements";
import firebase from "../../database/firebase";

const ListWallet = (props) => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        firebase.db.collection('users').onSnapshot(querySnapshot => {
            const users = [];

            querySnapshot.docs.forEach(doc => {
                const {name, email, phone} = doc.data()
                users.push({
                    id: doc.id,
                    name,
                    email,
                    phone
                })
            });

            setUsers(users)
        });
    },[]);


    return (
        <ScrollView>
            <Header
                placement="left"
                leftComponent={<Icon name='menu' onPress={() => props.navigation.toggleDrawer() }/>}
                centerComponent={{ text: 'WALLET', style: { color: '#fff' } }}
                rightComponent={<Image source={{ uri: "http://159.203.82.152/assets/img/logo-white.png" }} style={{ width: 100, height: 40 }} />}
            />

            <Text style={styles.title}>Tienes 100 Wins</Text>
            <Icon
                name='coins'
                type='font-awesome-5'
                size={70}
                color={'#00BB2D'}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#198fd5',
        marginTop: -1
    },
    title:{
        fontSize: 30,
        fontWeight:'bold',
        textAlign:'center',
        paddingVertical:50
    },
    icons_coins:{
        fontSize: 50,
        textAlign: 'center',
    }
})

export default ListWallet
