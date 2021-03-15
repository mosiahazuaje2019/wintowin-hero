import React, { useState, useEffect } from 'react'
import { View, Button, TextInput, ScrollView, StyleSheet, Image, Text } from "react-native";
import  firebase  from "../../database/firebase";

const CreateTravelScreen = () => {

    const [state, setState] = useState({
        start_point: '',
        ended_point: '',
        available_tickets: '',
        outTime: '',
        user_id: ''
    });

    useEffect(() => {
        firebase.firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            setState({
                start_point: '',
                ended_point: '',
                available_tickets: '',
                outTime: '',
                user_id: user.uid
            })
          }
        })
      }, []);

    const handleChangeText = (name, value) => {
        setState({ ...state, [name]: value })
    }
    
    const addTravel = async () => {
        try {
            await firebase.db.collection('travels').add({
                start_point:state.start_point,
                ended_point:state.ended_point,
                available_tickets:state.available_tickets,
                outTime:state.outTime,
                user_id:state.user_id
            })
            //props.navigation.navigate('ListUsers');
        } catch (error) {
            console.log("error al generar el registro");
        }
    }
    return (
        <ScrollView>
            <View style={styles.logoTop} >
                <Image source={{ uri: "http://159.203.82.152/assets/img/logo-white.png" }} style={{ width: 200, height: 80 }} />
            </View>       
            <View style={styles.container}>     
                <Text style={styles.title}>Creando viaje</Text>      
                <View style={styles.inputGroup}>
                    <TextInput 
                        placeholder={"Indique origen"}
                        onChangeText={(value) => handleChangeText('start_point', value) }
                    />
                </View>
                <View style={styles.inputGroup}>
                    <TextInput 
                        placeholder="Indique destino"
                        onChangeText={(value) => handleChangeText('ended_point', value) }
                    />
                </View>
                <View style={styles.inputGroup}>
                    <TextInput 
                        placeholder="Cupos disponiblea"
                        onChangeText={(value) => handleChangeText('available_tickets', value) }
                    />
                </View>
                <View style={styles.inputGroup}>
                    <TextInput 
                        placeholder="Hora de salida"
                        onChangeText={(value) => handleChangeText('outTime', value) }
                    />
                </View>
                <View>
                    <Button title="Guardar viaje" onPress={()=> addTravel() }></Button>
                </View>
            </View>                        
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:35,
        backgroundColor: '#ffffff'
    },
    inputGroup: {
        flex: 1,
        padding:0,
        marginBottom:15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    },
    logoTop:{
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

export default CreateTravelScreen
