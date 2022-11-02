import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useTheme } from '@react-navigation/native';
import SrButton from '../components/core/SrButton';
import SrText from '../components/core/SrText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { logout } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux';
import ModalFilters from '../components/RidesScreen/ModalFilters';

//checker le padding du text, je n'arrive pas a centrer par rapport aux bordures du coup j'ai triché avec un padding, mais c'est pas clean
//subcontainer le align items est KO et je ne sais pas pourquoi
//première ligne décalée est-ce que c'est à cause de l'icone du chevron ?

const ProfileScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const handleLogout = () => {
    dispatch(logout());
    return navigation.navigate('Home');
  };

  console.log('___', user);

  return (
    <View style={styles.container}>
      <SrText
        title="Mon espace SimpleRides"
        subtitle="Configurez votre espace et accédez à vos données"
      />

      <TouchableOpacity
        style={styles.textContainer}
        onPress={() => navigation.navigate('SyncApp')}
      >
        <Text style={styles.text}>Intégrations avec mes applications</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.textContainer}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <Text style={styles.text}>Paramétrer mon compte</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.textContainer}>
        <Text style={styles.text}>Mode de paiement</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.textContainer}>
        <Text style={styles.text}>Contacter le support</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.textContainer}>
        <Text style={styles.text}>Supprimer mon compte</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.subContainer}>
        <SrButton
          label="Retourner sur la page courses"
          type="secondary"
          handlePressed={() => navigation.navigate('Rides')}
        />
        <SrButton label="Me déconnecter" handlePressed={handleLogout} />
      </TouchableOpacity>
      <ModalFilters
        isOpen={modalVisible}
        toggle={() => setModalVisible(!modalVisible)}
      />
    </View>
  );
};

export default ProfileScreen;

const makeStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 16,
    },
    chevron: {
      width: 10,
      height: 10,
      color: colors.primary,
    },
    text: {
      width: '100%',
      height: 48,
      marginTop: 10,
      backgroundColor: colors.black,
      borderColor: colors.lightGrey,
      borderStyle: 'solid',
      borderWidth: 1,
      color: colors.light,
      fontSize: 16,
      borderRadius: 10,
      marginBottom: 10,
      paddingLeft: 8,
      paddingTop: 12,
    },
    textContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    subContainer: {
      width: '100%',
      alignItems: 'flex-end',
    },
  });
