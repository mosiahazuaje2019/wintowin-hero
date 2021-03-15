import React, { useEffect, useState } from 'react'
import { Text, Image, View, ScrollView, StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import firebase from "../../database/firebase";

const ListVehicles = (props) => {
    const [vehicles, setVehicles] = useState([])

    useEffect(() => {
        firebase.db.collection('vehicles').onSnapshot(querySnapshot => {
            const vehicles = [];

            querySnapshot.docs.forEach(doc => {
                const {name, engine} = doc.data()
                vehicles.push({
                    id: doc.id,
                    name,
                    engine,
                })
            });

            setVehicles(vehicles)
        });
    },[]);

    return (
        <ScrollView>
            <View style={styles.container} >
                <Image source={{ uri: "http://159.203.82.152/assets/img/logo-white.png" }} style={{ width: 200, height: 80 }} />
            </View> 
            
            <Text style={styles.title}>Mis vehiculos</Text>  
            {
                vehicles.map(vehicle => {
                    return (
                        <ListItem 
                            key={vehicle.id}
                            bottomDivider
                            onPress={() => props.navigation.navigate('DetailUserScreen',{
                                id
                            })}
                        >
                            <ListItem.Chevron />
                            <Avatar
                                rounded
                                source={{
                                    uri:"https://awscdn.audi.com.co/media/GalleryThumbnails_Slider_Image_Component/59635-584786-slider-355894/dh-1324-a9ad28/c4698ba8/1612523733/1920x1080-ar8-d-181003.jpg",
                                }}
                            />                        
                            <ListItem.Content>
                                <ListItem.Title>{vehicle.name}</ListItem.Title>
                                <ListItem.Subtitle>{vehicle.engine}</ListItem.Subtitle>
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

export default ListVehicles
