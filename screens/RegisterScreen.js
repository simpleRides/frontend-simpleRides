import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import {
  updateUsername,
  updateEmail,
  updateTelephone,
  updateConfirmPassword,
} from '../reducers/user';
import SrText from '../components/core/SrText';
import SrButton from '../components/core/SrButton';
import SrInput from '../components/core/SrInput';
import { useTheme } from '@react-navigation/native';

export default function RegisterScreen({ navigation }) {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  //routes a faire avec Backend
  const handleSkip = () => {
    navigation.navigate('DefaultPage');
  };
  const handleSubmit = () => {
    console.log('call backend');
  }; // a degager et utiliser handleRegister ci-dessous
  // const handleRegister = () => {
  // 	fetch('http://localhost:3000/users/signup', {
  // 		method: 'POST',
  // 		headers: { 'Content-Type': 'application/json' },
  // 		body: JSON.stringify({ username: signUpUsername, password: signUpPassword }),
  // 	}).then(response => response.json())
  // 		.then(data => {
  // 			if (data.result) {
  // 				dispatch(login({username:signUpUsername, token: data.token}));
  // 				   setSignUpUsername('');
  //             setSignUpEmail('');
  //             setSignseTelephone('');
  //             setSignUpPassword('');
  // 				     setSignUpConfirmPassword('');
  // 			}
  // 		});
  // };

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
            onChange={(e) => setTelephone(e)}
          />
          <SrInput
            isPassword={true}
            label="Mot de passe"
            placeholder="Entrez votre mot de passe"
            onChange={(e) => setConfirmPassword(e)}
          />

          <SrInput
            isPassword={true}
            label="Confirmez votre mot de passe"
            placeholder="Confirmez votre mot de passe"
            onChange={(e) => setPassword(e)}
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
          <SrButton
            label="Configurer plus tard"
            type="secondary"
            handlePressed={handleSkip}
          />
          <SrButton
            label="Continuer mon inscription"
            handlePressed={handleSubmit}
          />
        </View>
      </View>
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
