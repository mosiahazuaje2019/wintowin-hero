import React, { useState } from 'react'
import { View, Button, TextInput, ScrollView, StyleSheet, Image } from "react-native";
import  firebase  from "../../database/firebase";

const CreateUserScreen = (props) => {

    const [state, setState] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const handleChangeText = (name, value) => {
        setState({ ...state, [name]: value })
    }
    
    const addUser = async () => {
        try {
            await firebase.db.collection('users').add({
                name: state.name,
                email: state.email,
                phone: state.phone
            })
            props.navigation.navigate('ListUsers');
        } catch (error) {
            console.log("error al generar el registro");
        }
    }
    return (
        <ScrollView>
            <View style={styles.logoTop} >
                <Image source={{ uri: "http://159.203.82.152/assets/img/logo-white.png" }} style={{ width: 200, height: 80 }} />
            </View>            
            <View style={styles.inputGroup}>
                <TextInput 
                    placeholder="Nombre de usuario"
                    onChangeText={(value) => handleChangeText('name', value) }
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput 
                    placeholder="Correo del usuario"
                    onChangeText={(value) => handleChangeText('email', value) }
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput 
                    placeholder="Teléfono de usuario"
                    onChangeText={(value) => handleChangeText('phone', value) }
                />
            </View>
            <View>
                <Button title="Guardar usuario" onPress={()=> addUser() }></Button>
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
    }
})

export default CreateUserScreen
