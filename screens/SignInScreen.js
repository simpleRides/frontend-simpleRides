import React, { useState } from 'react';
import { useTheme } from '@react-navigation/native';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

const SignInScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    // here we call the API to login and navigate
    navigation.navigate('TabNavigator');
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../assets/logoblc.png')}
          />
        </View>
        <Text style={styles.title}>
          Connectez vous avec votre compte simpleRide afin d'utiliser
          l'application
        </Text>
        <View style={styles.formContainer}>
          <View style={styles.formControl}>
            <Text style={styles.label}>Adresse email</Text>
            <TextInput
              placeholder="Adresse e-mail"
              onChangeText={(value) => setEmail(value)}
              value={email}
              style={styles.input}
              placeholderTextColor={colors.lightGrey}
            />
          </View>

          <View style={styles.formControl}>
            <Text style={styles.label}>Mot de passe</Text>

            <TextInput
              placeholder="Mot de passe"
              onChangeText={(value) => setPassword(value)}
              value={password}
              style={styles.input}
              placeholderTextColor={colors.lightGrey}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => handleSubmit()}
          style={styles.primaryButton}
          activeOpacity={0.8}
        >
          <Text style={styles.textButton}>Se connecter</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;

const makeStyles = (colors) =>
  StyleSheet.create({
    screen: {
      flex: 1,
    },
    container: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
    },
    imageContainer: {
      width: 250,
      height: 250,
      justifyContent: 'center',
    },
    image: {
      width: '100%',
      height: '50%',
      justifyContent: 'flex-start',
    },
    title: {
      fontSize: 16,
      color: colors.light,
    },
    formContainer: {
      width: '100%',
      height: '40%',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      backgroundColor: '#2B2D2E',
      borderColor: colors.lightGrey,
      borderStyle: 'solid',
      borderWidth: 1,
      paddingHorizontal: 16,
    },
    formControl: {
      width: '100%',
      marginBottom: 16,
    },
    label: {
      color: colors.light,
    },
    input: {
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
      placeholder: colors.light,
    },
    primaryButton: {
      alignItems: 'center',
      width: '100%',
      height: 40,
      paddingTop: 8,
      marginTop: 20,
      marginBottom: 20,
      borderRadius: 10,
      backgroundColor: colors.primary,
    },
    textButton: {
      color: colors.light,
      height: 30,
      fontWeight: '600',
      fontSize: 16,
    },
  });
