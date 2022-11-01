import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import SrText from '../components/core/SrText';
import SrButton from '../components/core/SrButton';
import SrInput from '../components/core/SrInput';
import Toast from 'react-native-toast-message';

import { useTheme } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { updateUserToken } from '../reducers/user';

import constants from '../core/constants';
import { showSuccessToast, showToast } from '../core/toats';

export default function RegisterScreen({ navigation }) {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSkip = () => {
    navigation.navigate('DefaultPage');
  };

  const handleRegister = () => {
    const newUser = {
      username,
      email,
      phone,
      password,
    };

    if (password === confirmPassword) {
      fetch(`${constants.BACKEND_URL}/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.result) {
            dispatch(updateUserToken(data.token));
            resetFields();
            showSuccessToast('Inscription réussie');
            setTimeout(() => {
              navigation.navigate('SyncApp');
            }, 1000);
          } else {
            showToast(data.error);
            resetFields();
          }
        });
    } else {
      showToast('Les mots de passes ne sont pas identiques');
    }
  };

  const resetFields = () => {
    setUsername('');
    setEmail('');
    setPhone('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        <View>
          <SrText
            title="Créez votre compte"
            subtitle="Créez votre compte SimpleRides pour utiliser l’application"
          />
        </View>
        <View style={styles.formContainer}>
          <SrInput
            label="Nom d'utilisateur"
            placeholder="Entrez votre votre nom d'utilisateur"
            onChange={(e) => setUsername(e)}
          />
          <SrInput
            placeholder="Entrez votre email"
            label="Email"
            onChange={(e) => setEmail(e)}
          />
          <SrInput
            placeholder="Entrez numéro de téléphone"
            label="Téléphone"
            onChange={(e) => setPhone(e)}
          />
          <SrInput
            isPassword={true}
            label="Mot de passe"
            placeholder="Entrez votre mot de passe"
            onChange={(e) => setPassword(e)}
          />

          <SrInput
            isPassword={true}
            label="Confirmez votre mot de passe"
            placeholder="Confirmez votre mot de passe"
            onChange={(e) => setConfirmPassword(e)}
          />
          <Text
            style={styles.textHighlight}
            onPress={() => navigation.navigate('CGV')}
          >
            En cliquant sur continuer, vous acceptez les conditons générales
            d’utilisation (consultez-les en cliquat sur ce lien )
          </Text>
          {/* <pdf source={source} /> a embarquer dans le texte et ajouter tickbox. tickbox renvoie dans bdd user accepté terms OK  */}
        </View>
        <View style={{ width: '100%' }}>
          {/* TODO: Gérer les différences entre Ios et Android */}
          {Platform.OS === 'ios' && (
            <SrButton
              label="Configurer plus tard"
              type="secondary"
              handlePressed={handleSkip}
            />
          )}
          <SrButton
            label="Continuer mon inscription"
            handlePressed={handleRegister}
          />
        </View>
      </View>
      <Toast />
    </KeyboardAvoidingView>
  );
}

const makeStyles = (colors) =>
  StyleSheet.create({
    screen: {
      flex: 1,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingBottom: 24,
      paddingTop: 48,
    },
    textHighlight: {
      width: '90%',
      fontSize: 12,
      textDecorationLine: 'underline',
      fontWeight: '600',
      color: colors.light,
      textAlign: 'center',
      marginBottom: 10,
    },
    formContainer: {
      width: '98%',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      backgroundColor: '#2B2D2E',
      borderColor: '#585858',
      borderStyle: 'solid',
      borderWidth: 1,
      color: '#545454',
      padding: 16,
    },
  });
