import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import SrInput from '../components/core/SrInput';
import SrButton from '../components/core/SrButton';
import SrText from '../components/core/SrText';

import { useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserToken } from '../reducers/user';

import constants from '../core/constants';

const SignInScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    handleConnection();
  };

  const handleConnection = () => {
    fetch(`${constants.BACKEND_URL}/users/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log('token', data.token);
          dispatch(updateUserToken(data.token));
          setEmail('');
          setPassword('');
          navigation.navigate('TabNavigator');
        }
      })
      .catch((error) => console.log('<>>', error));
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
            subtitle="Connectez vous avec votre compte simpleRide afin d'utiliser l'application"
          />
          <View style={styles.formContainer}>
            <SrInput
              placeholder="Entrer votre email"
              label="Email"
              onChange={(e) => setEmail(e)}
            />
            <SrInput
              isPassword={true}
              label="Mot de passe"
              placeholder="Entrer votre mot de passe"
              onChange={(e) => setPassword(e)}
            />
          </View>
          <SrButton label="Se connecter" handlePressed={handleSubmit} />
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
  });
