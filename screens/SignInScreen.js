import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from 'react-native';

const SignInScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);
  // const [signInUsername, setSignInUsername] = useState('');
  // const [signInPassword, setSignInPassword] = useState('');
  // const dispatch = useDispatch();
  // const user = useSelector((state) => state.user.value);

  const handleSubmit = () => {
    // here we call the API to login and navigate
    navigation.navigate('TabNavigator');
  }; // a degager et utiliser handleConnection ci-dessous
  // const handleConnection = () => {
  // 	fetch('http://localhost:3000/users/signin', {
  // 		method: 'POST',
  // 		headers: { 'Content-Type': 'application/json' },
  // 		body: JSON.stringify({ username: signInUsername, password: signInPassword }),
  // 	}).then(response => response.json())
  // 		.then(data => {

  // 			if (data.result) {
  // 				console.log(data.token)
  // 				dispatch(login(signInUsername, data.token));
  // 				setSignInUsername('');
  // 				setSignInPassword('');
  // 			}
  // 		});
  // };

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
          <Text style={styles.title}>
            Connectez vous avec votre compte simpleRide afin d'utiliser
            l'application
          </Text>
          <View style={styles.formContainer}>
            <View style={styles.formControl}>
              <Text style={styles.label}>Adresse email</Text>
              <TextInput
                placeholder="Adresse e-mail"
                placeholderTextColor={colors.lightGrey}
                style={[
                  styles.input,
                  focusEmail ? styles.inputOnFocus : styles.inputOnBlur,
                ]}
                value={email}
                onChangeText={(value) => setEmail(value)}
                onFocus={() => setFocusEmail(true)}
                onBlur={() => setFocusEmail(false)}
              />
            </View>

            <View style={styles.formControl}>
              <Text style={styles.label}>Mot de passe</Text>

              <TextInput
                placeholder="Mot de passe"
                onChangeText={(value) => setPassword(value)}
                value={password}
                style={[
                  styles.input,
                  focusPassword ? styles.inputOnFocus : styles.inputOnBlur,
                ]}
                placeholderTextColor={colors.lightGrey}
                onFocus={() => setFocusPassword(true)}
                onBlur={() => setFocusPassword(false)}
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
      paddingHorizontal: 16,
    },
    imageContainer: {
      width: '50%',
      height: '40%',
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
    inputOnFocus: { borderColor: colors.primary },
    inputOnBlur: { borderColor: colors.lightGrey },
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
