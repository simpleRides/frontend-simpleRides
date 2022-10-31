import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
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

export default function RegisterScreen({ navigation }) {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // const [signUpUsername, setSignUpUsername] = useState('');
  // const [signUpTelephone, setSignUpTelephone] = useState('');
  // const [setSignUpEmail, setSignUpEmaile] = useState('');
  // const [signUpPassword, setSignUpPassword] = useState('');
  // const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');

  //routes a faire avec Backend
  const handleSkip = () => {
    navigation.navigate('SignIn');
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
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require('../assets/logoblc.png')} />
      </View>
      <View>
        <SrText
          title="Créez votre compte"
          subtitle="Créer un nouveau compte afin d’utiliser l’application"
        />
        {/* <Text style={styles.title}>Créez votre compte</Text>
        <Text style={styles.text}>
          Créer un nouveau compte afin d’utiliser l’application
        </Text> */}
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
          label="Mot de passe"
          placeholder="Confirmez votre mot de passe"
          onChange={(e) => setPassword(e)}
        />
        {/* <TextInput
          placeholder="Nom d'utilisateur "
          onChangeText={(value) => setUsername(value)}
          value={username}
          style={styles.input}
        />
        <TextInput
          placeholder="Adresse e-mail"
          onChangeText={(value) => setEmail(value)}
          value={email}
          style={styles.input}
        /> */}
        {/* <TextInput
          placeholder="Téléphone"
          onChangeText={(value) => setTelephone(value)}
          value={telephone}
          style={styles.input}
        />
        <TextInput
          placeholder="Mot de passe"
          onChangeText={(value) => setPassword(value)}
          value={password}
          style={styles.input}
        />
        <TextInput
          placeholder="Confirmer votre mot de passe"
          onChangeText={(value) => setConfirmPassword(value)}
          value={confirmPassword}
          style={styles.input}
        /> */}
        <Text
          style={styles.textHighlight}
          onPress={() => navigation.navigate('CGV')}
        >
          En cliquant sur continuer, vous acceptez les conditons générales
          d’utilisation
        </Text>
        {/* <pdf source={source} /> a embarquer dans le texte et ajouter tickbox. tickbox renvoie dans bdd user accepté terms OK  */}
      </View>
      <View style={styles.subContainer}>
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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  subContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  title: {
    width: '80%',
    fontSize: 32,
    fontWeight: '600',
    color: '#FFFF',
    alignItems: 'left', // fonctionne pas le left ni justify flex start
  },
  text: {
    width: '90%',
    fontSize: 8,
    fontWeight: 'bold',
    color: '#585858',
    marginBottom: 10,
    alignItems: 'left', // fonctionne pas le left ni justify flex start
  },
  textHighlight: {
    width: '90%',
    fontSize: 12,
    textDecorationLine: 'underline',
    fontWeight: '600',
    color: '#545454',
    textAlign: 'center',
    marginBottom: 10,
    alignItems: 'left', // fonctionne pas le left ni justify flex start
  },
  formContainer: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#2B2D2E',
    borderColor: '#585858',
    borderStyle: 'solid',
    borderWidth: 1,
    color: '#545454',
  },
  input: {
    width: '80%',
    height: 40,
    marginTop: 10,
    paddingLeft: 5,
    backgroundColor: '#2B2D2E',
    borderColor: '#585858',
    borderStyle: 'solid',
    borderWidth: 1,
    color: '#545454',
    fontSize: 16,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonOrange: {
    alignItems: 'center',
    paddingTop: 8,
    width: '80%',
    height: 40,
    marginTop: 20,
    backgroundColor: '#FFA62B',
    borderRadius: 10,
    marginBottom: 20,
  },
  buttongrey: {
    alignItems: 'center',
    paddingTop: 8,
    width: '80%',
    marginTop: 20,
    backgroundColor: '#545454',
    borderRadius: 10,
    marginBottom: 20,
  },
  textButton: {
    color: '#ffffff',
    height: 30,
    fontWeight: '600',
    fontSize: 16,
  },
  imageContainer: {
    width: 250,
    height: 250,
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '50%',
    justifyContent: 'center ',
  },
});
