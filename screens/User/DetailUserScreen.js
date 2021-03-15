import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import firebase from "../../database/firebase";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const initialState = {
  id: "",
  name: "",
  email: "",
  phone: "",
  user_auth: "",
  type_document: "",
  document: "",
  dateend_license: new Date(),
};

const DetailUserScreen = (props) => {
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [user, setUser] = useState(initialState);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    firebase.firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        getUserById(user.uid);
      }
    })
  }, []);

  const storage = firebase.firebase.storage().ref();
  const ref_cedula = storage.child(
    user.uid +
    "/documento_identidad/documento_identidad_" +
    user.uid +
    ".jpg"
  );
  const ref_licencia = storage.child(
    user.uid +
    "/licencia/licencia_" +
    user.uid +
    ".jpg"
  );

  const openImagePickerAsync = async (type_upload) => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Se requiere autorizar acceso a la camara");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    switch (type_upload) {
      case "ref_cedula":
        uploadImage(
          pickerResult.uri,
          user.uid +
          "/documento_identidad/documento_identidad_" +
          user.uid +
          ".jpg"
        );
        break;
      case "ref_licencia":
        uploadImage(pickerResult.uri, user.uid +
          "/licencia/licencia_" +
          user.uid +
          ".jpg")
      default:
        console.log("No esta pasando el parametro adecuado");
        break;
    }

    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
  };

  const uploadImage = async (uri, type) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = storage.child(type);
    return ref.put(blob);
  };

  const getUserById = async (user_auth) => {
    const dbRef = firebase.db.collection("users").doc(user_auth);
    const doc = await dbRef.get();
    const user = doc.data();
    user.dateend_license = moment(user.dateend_license).toDate();
    setUser({
      ...user,
      user_auth,
    });
  };

  const handleChangeText = (name, value) => {
    if (name === "dateend_license") {
      value = new Date(value);
      setShowCalendar(!showCalendar);
    }
    setUser({ ...user, [name]: value });
  };

  const setUserTypeDocument = (value) => {
    setUser({ ...user, ["type_document"]: value });
  };

  const deleteUser = async () => {
    const dbRef = firebase.db
      .collection("users")
      .doc(user.uid);
    await dbRef.delete();
    props.navigation.navigate("ListUsers");
  };

  const confirmationDelete = () => {
    Alert.alert("Eliminar usuario", "Esta seguro?", [
      { text: "Si", onPress: () => deleteUser() },
      { text: "No", onPress: () => console.log(false) },
    ]);
  };

  const updateUser = async () => {
    const dbRef = firebase.db
      .collection("users")
      .doc(user.uid);
    await dbRef.set({
      name: user.name,
      email: user.email,
      phone: user.phone,
      user_auth: user.user_auth,
      type_document: user.type_document,
      document: user.document,
      dateend_license: moment(user.dateend_license).format("YYYY-MM-DD"),
    });
    setUser(initialState);
    props.navigation.navigate("ListUsers");
  };

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.logoTop} >
            <Image source={{ uri: "http://159.203.82.152/assets/img/logo-white.png" }} style={{ width: 200, height: 80 }} />
        </View>         
        <View>
          <Text style={styles.title}>Datos básicos del usuario</Text>
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            value={user.name}
            placeholder="Nombre de usuario"
            onChangeText={(value) => handleChangeText("name", value)}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            value={user.email}
            placeholder="Correo del usuario"
            onChangeText={(value) => handleChangeText("email", value)}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            value={user.phone}
            placeholder="Teléfono de usuario"
            onChangeText={(value) => handleChangeText("phone", value)}
          />
        </View>
        <View>
          <Text>Seleccione tipo de documento</Text>
          <Picker
            selectedValue={user.type_document}
            onValueChange={(itemValue, itemIndex) =>
              setUserTypeDocument(itemValue)
            }
          >
            <Picker.Item label="Seleccione..." value="" />
            <Picker.Item label="Cédula de ciudadania" value="cc" />
            <Picker.Item label="Cédula de extrangería" value="ce" />
            <Picker.Item label="Pasaporte" value="pa" />
          </Picker>
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            value={user.document}
            placeholder="# de documento"
            onChangeText={(value) => handleChangeText("document", value)}
          />
        </View>
        <View style={styles.separatorInput}>
          <Text>Cargue de documento de identidad</Text>
        </View>
        <View style={styles.fixToText}>
          <TouchableOpacity
            onPress={() => openImagePickerAsync("ref_cedula")}
            style={styles.button}
          >
            <AntDesign name="clouduploado" style={styles.buttonIcons} />
            <Text style={styles.buttonText}>Cara frontal</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => openImagePickerAsync("ref_cedula")}
            style={styles.button}
          >
            <AntDesign name="clouduploado" style={styles.buttonIcons} />
            <Text style={styles.buttonText}>Cara posterior</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.separatorInput}>
          <Text>Cargue de licencia</Text>
        </View>
        <View style={styles.fixToText}>
          <TouchableOpacity
            onPress={() => openImagePickerAsync("ref_licencia")}
            style={styles.button}
          >
            <AntDesign name="clouduploado" style={styles.buttonIcons} />
            <Text style={styles.buttonText}>Cara frontal</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => openImagePickerAsync("ref_licencia")}
            style={styles.button}
          >
            <AntDesign name="clouduploado" style={styles.buttonIcons} />
            <Text style={styles.buttonText}>Cara posterior</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.separatorInput}>
          <TouchableOpacity
            onPress={() => setShowCalendar(!showCalendar)}
            style={styles.buttonCalendar}
          >
            <Text color="black">
              <MaterialCommunityIcons
                name="calendar-text"
                style={styles.buttonIcons}
              />
              Indique fecha de vencimiento de su licencia
            </Text>
          </TouchableOpacity>
          <TextInput
            placeholder={moment(user.dateend_license).format("DD-MM-YYYY")}
          ></TextInput>
        </View>
        {showCalendar && (
          <DateTimePicker
            testID="dateTimePicker"
            minDate={new Date()}
            style={{ width: 200 }}
            value={user.dateend_license}
            mode="date"
            display="calendar"
            onChange={(value) =>
              handleChangeText("dateend_license", value.nativeEvent.timestamp)
            }
          />
        )}
        <View style={styles.fixToText}>
          <TouchableOpacity
            onPress={() => updateUser()}
            style={styles.buttonUpdate}
          >
            <Text style={styles.buttonText}>
              <AntDesign name="save" style={styles.buttonIconsUpdate} />
              Actualizar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => confirmationDelete()}
            style={styles.buttonDelete}
          >
            <Text style={styles.buttonText}>
              <AntDesign name="delete" size={24} color="white" />
              Eliminar
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
    backgroundColor: '#ffffff',
  },
  logoTop: {
    flex:1,
    padding:0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  title: {
    flex: 1,
    padding: 0,
    marginBottom: 20,
    borderBottomColor: "#cccccc",
    fontSize: 24,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 15,
    width: 120,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  buttonIcons: {
    color: "black",
    fontSize: 40,
    textAlign: "center",
  },
  buttonUpdate: {
    backgroundColor: "#2daae1",
    padding: 20,
    borderRadius: 15,
  },
  buttonDelete: {
    backgroundColor: "#e65457",
    padding: 20,
    borderRadius: 15,
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  separatorInput: {
    flex: 1,
    padding: 0,
    marginBottom: 10,
    marginTop: 10,
    borderBottomWidth: 0,
    borderBottomColor: "#cccccc",
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonIconsUpdate: {
    color: "white",
    fontSize: 24,
    marginRight: 50,
    paddingRight: 50,
  },
});

export default DetailUserScreen;
