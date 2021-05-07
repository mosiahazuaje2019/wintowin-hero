import React, { useEffect, useState } from 'react'
import { Text, Image, View, ScrollView, StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import firebase from "../../database/firebase";

const Contact = (props) => {
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
            <View style={styles.container} >
                <Image source={{ uri: "http://159.203.82.152/assets/img/logo-white.png" }} style={{ width: 200, height: 80 }} />
            </View>

            <Text style={styles.title}>Contacto</Text>
            {
                users.map(user => {
                    return (
                        <ListItem
                            key={user.id}
                            bottomDivider
                            onPress={() => props.navigation.navigate('DetailUserScreen',{
                                phone
                            })}
                        >
                            <ListItem.Chevron />
                            <Avatar
                                rounded
                                source={{
                                    uri:"https://reactnativeelements.com/img/avatar/avatar--photo.jpg",
                                }}
                            />
                            <ListItem.Content>
                                <ListItem.Title>{user.name}</ListItem.Title>
                                <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    )
                })
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:5,
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

export default Contact
