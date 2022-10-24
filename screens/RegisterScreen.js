import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View, 
} from 'react-native';
import { useDispatch } from 'react-redux';
import { resetPlaces, updateNickname } from '../reducers/user';

export default function RegisterScreen({ navigation }) {
  const dispatch = useDispatch();

  const [nickname, setNickname] = useState('');

  const handleSubmit = () => {
    dispatch(updateNickname(nickname));
    dispatch(resetPlaces())
    navigation.navigate('TabNavigator');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

<View>
          <Text style={styles.title}>
          Créez votre compte
          </Text>
          <Text style={styles.text}>
          Créer un nouveau compte afin d’utiliser l’application
          </Text>
</View>

      <TextInput placeholder="Nom d'utilisateur " onChangeText={(value) => setNickname(value)} value={nickname} style={styles.input} />
      <TextInput placeholder="Adresse e-mail" onChangeText={(value) => setNickname(value)} value={nickname} style={styles.input} />
      <TextInput placeholder="Téléphone" onChangeText={(value) => setNickname(value)} value={nickname} style={styles.input} />
      <TextInput placeholder="Mot de passe" onChangeText={(value) => setNickname(value)} value={nickname} style={styles.input} />
      <TextInput placeholder="Confirmer votre mot de passe" onChangeText={(value) => setNickname(value)} value={nickname} style={styles.input} />
      <TouchableOpacity onPress={() => handleSubmit()} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>Go to map</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#545454"',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: '#FFA62B', 
  },
  image: {
    width: '100%',
    height: '50%',
  },
  title: {
    width: '80%',
    fontSize: 32,
    fontWeight: '600',
  },
  text: {
    width: '80%',
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    width: '80%',
    marginTop: 25,
    borderBottomColor: '#FFA62B',
    borderBottomWidth: 1,
    fontSize: 18,
  },
  button: {
    alignItems: 'center',
    paddingTop: 8,
    width: '80%',
    marginTop: 30,
    backgroundColor: '#ec6e5b',
    borderRadius: 10,
    marginBottom: 80,
  },
  textButton: {
    color: '#ffffff',
    height: 30,
    fontWeight: '600',
    fontSize: 16,
  },

});
