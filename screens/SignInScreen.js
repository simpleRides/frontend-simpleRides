import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Text,
} from 'react-native';
import SrInput from '../components/core/SrInput';
import SrButton from '../components/core/SrButton';
import SrText from '../components/core/SrText';

import { useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserToken } from '../reducers/user';
import {
  updateUberToken,
  updateBoltToken,
  updateHeetchToken,
  updateMarcelToken,
} from '../reducers/user';

import constants from '../core/constants';

const SignInScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);

  const handleConnection = () => {
    fetch(`${constants.BACKEND_URL}/users/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          // ecriture dans le store du token user :
          dispatch(updateUserToken(data.token));
          // ecriture dans le store des token providers connectes :
          const uberConnection = data.providers.find(
            (e) => e.providername === 'uber'
          );
          if (uberConnection) {
            dispatch(updateUberToken(uberConnection.providerToken));
          }
          const boltConnection = data.providers.find(
            (e) => e.providername === 'bolt'
          );
          if (boltConnection) {
            dispatch(updateBoltToken(boltConnection.providerToken));
          }
          const heetchConnection = data.providers.find(
            (e) => e.providername === 'heetch'
          );
          if (heetchConnection) {
            dispatch(updateHeetchToken(heetchConnection.providerToken));
          }
          const marcelConnection = data.providers.find(
            (e) => e.providername === 'marcel'
          );
          if (marcelConnection) {
            dispatch(updateMarcelToken(marcelConnection.providerToken));
          }
          setEmail('');
          setPassword('');
          navigation.navigate('TabNavigator');
        } else {
          setIsError(true);
        }
      })
      .catch((error) => console.log('Err:', error));
  };

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.screen}
      >
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require('../assets/logoblc.png')}
            />
          </View>
          <SrText
            title="Connexion"
            subtitle="Connectez-vous ?? votre compte pour acc??der ?? SimpleRides"
          />
          <View style={styles.formContainer}>
            <SrInput
              placeholder="Entrez votre email"
              label="Email"
              onChange={(e) => setEmail(e)}
            />
            <SrInput
              isPassword={true}
              label="Mot de passe"
              placeholder="Entrez votre mot de passe"
              onChange={(e) => setPassword(e)}
            />
            {isError && (
              <Text style={styles.errorMessage}>
                Mot de passe ou adresse e-mail incorrect
              </Text>
            )}
          </View>
          <SrButton label="Me connecter" handlePressed={handleConnection} />
        </View>
      </KeyboardAvoidingView>
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
      paddingVertical: 24,
      paddingHorizontal: 16,
    },
    imageContainer: {
      width: '50%',
      height: 200,
      justifyContent: 'center',
    },
    image: {
      width: '100%',
      height: '50%',
    },
    title: {
      fontSize: 16,
      color: colors.light,
      marginBottom: 16,
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
    errorMessage: {
      color: colors.errors,
      width: '100%',
    },
  });
