import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import SrButton from '../components/core/SrButton';
import SrText from '../components/core/SrText';
import Ionicons from 'react-native-vector-icons/Ionicons';

//checker le padding du text, je n'arrive pas a centrer par rapport aux bordures du coup j'ai triché avec un padding, mais c'est pas clean
//subcontainer le align items est KO et je ne sais pas pourquoi

//créer constante logout

const ProfileScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <View style={styles.container}>
      <SrText
        title="Mon espace SimpleRides"
        subtitle="Configurez votre espace et accédez à vos données"
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}> Paramètres de mon compte </Text>
        <Ionicons style={styles.chevron} iconName="chevron-forward-outline" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Intégrations avec mes applications</Text>
      </View>
      <Text style={styles.text}>Contacter le support</Text>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Mode de paiement</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Supprimer mon compte</Text>
      </View>
      <View style={styles.subContainer}>
        <SrButton
          label="Retourner sur la page courses"
          type="secondary"
          handlePressed={() => navigation.navigate('Ride')}
        />
        <SrButton
          label="Me déconnecter"
          handlePressed={() => navigation.navigate('Home')}
        />
      </View>
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
