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

export default function RegisterScreen({ navigation }) {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  //routes a faire avec Backend

  const handleSubmit = () => {
    console.log('call backend');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require('../assets/logoblc.png')} />
      </View>
      <View>
        <Text style={styles.title}>Créez votre compte</Text>
        <Text style={styles.text}>
          Créer un nouveau compte afin d’utiliser l’application
        </Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput
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
        />
        <TextInput
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
        />
        <Text style={styles.text}>
          Accepter les conditons générales d’utilisation
        </Text>
        {/* <pdf source={source} /> a embarquer dans le texte et ajouter tickbox. tickbox renvoie dans bdd user accepté terms OK  */}
      </View>
      <View style={styles.subContainer}>
        <TouchableOpacity
          onPress={() => handleSubmit()}
          style={styles.buttongrey}
          activeOpacity={0.8}
        >
          <Text style={styles.textButton}>Se connecter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSubmit()}
          style={styles.buttonOrange}
          activeOpacity={0.8}
        >
          <Text style={styles.textButton}>S'inscrire</Text>
        </TouchableOpacity>
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
    alignItems: 'left', // fonctionne pas le left ni justify flex start
  },
  text: {
    width: '90%',
    fontSize: 8,
    fontWeight: '600',
    color: '#585858',
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
  },
  input: {
    width: '80%',
    height: 40,
    marginTop: 10,
    backgroundColor: '#2B2D2E',
    borderColor: '#585858',
    borderStyle: 'solid',
    borderWidth: 1,
    color: '#FFFF',
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
    justifyContent: 'flex-start',
  },
});
