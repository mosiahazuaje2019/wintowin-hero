import React, { useEffect, useState } from 'react'
import { View, Image, Button, ScrollView, StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import firebase from "../../database/firebase";

const ListUsers = (props) => {
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
            {/* <View style={styles.container} >
                <Image source={{ uri: "http://159.203.82.152/assets/img/logo-white.png" }} style={{ width: 255, height: 100 }} />
            </View> */}
            
            <Button title="Crear usuario" onPress={() => props.navigation.navigate('CreateUserScreen')} />
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
})

export default ListUsers
