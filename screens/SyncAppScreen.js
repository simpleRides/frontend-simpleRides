import React, { useState } from 'react';
import { useTheme } from '@react-navigation/native';
import {
  Modal,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import * as Location from 'expo-location';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SrInput from '../components/core/SrInput';
import SrButton from '../components/core/SrButton';
import SrText from '../components/core/SrText';

import constants from '../core/constants';

const SyncAppScreen = ({ navigation }) => {
  const [idProvider, setIdProvider] = useState('');
  const [pwdProvider, setPwdProvider] = useState('');
  const [isError, setIsError] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [isProviderConnected, setIsProviderConnected] = useState(false);

  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const handleSubmit = () => {
    setModalVisible(true);
  };

  const handleNewProvider = () => {
    console.log('* ' + idProvider + ' * ' + pwdProvider + ' *');
    fetch(`${constants.BACKEND_URL}/users/connectprovider`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: 'N0-UNLEg5FsPMuUjYHn-Qb743MZG738a',
        nameProvider: 'uber',
        idProvider: idProvider,
        pwdProvider: pwdProvider,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log('token', data.token);
          // dispatch(updateUserToken(data.token));
          setIdProvider('');
          setPwdProvider('');
          setIsProviderConnected(true);
          setModalVisible(false);
        } else {
          setIsError(true);
          console.log('cant login');
        }
      })
      .catch((error) => console.log('Err:', error));
  };

  console.log('test render');

  const handleClose = () => {
    setModalVisible(false);
  };

  const handleEmpty = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <Modal visible={modalVisible} animationType="fade" transparent>
        <View style={styles.centeredView}>
          <View style={styles.formContainer}>
            <TouchableOpacity
              onPress={() => handleClose()}
              style={styles.closeBtnModal}
              activeOpacity={0.8}
            >
              <FontAwesome name="close" color="#FFA62B" size={24} />
            </TouchableOpacity>
            <SrInput
              placeholder="Entrez votre identifiant Uber"
              label="identifiant Uber"
              onChange={(e) => setIdProvider(e)}
            />
            <SrInput
              isPassword={true}
              label="mot de passe Uber"
              placeholder="Entrez votre mot de passe Uber"
              onChange={(e) => setPwdProvider(e)}
            />
            <SrButton label="test" handlePressed={handleNewProvider} />
          </View>
        </View>
      </Modal>

      <View style={styles.header}>
        <Text style={styles.title}>Connectez ici vos applications</Text>
        <Text style={styles.label}></Text>
      </View>
      {/* Carte UBER */}
      <View style={styles.providersContainer}>
        <View style={styles.textConnectProvider}>
          <SrText title="Uber" />
        </View>
        <View style={styles.buttonConnectProvider}>
          {isProviderConnected ? (
            <FontAwesome name="check-square" color="#FFA62B" size={48} />
          ) : (
            <SrButton label="Connecter" handlePressed={handleSubmit} />
          )}
        </View>
      </View>
      {/* Carte BOLT */}
      <View style={styles.providersContainer}>
        <View style={styles.textConnectProvider}>
          <SrText title="Bolt" />
        </View>
        <View style={styles.buttonConnectProvider}>
          <SrButton label="Connecter" handlePressed={handleEmpty} />
        </View>
      </View>
      {/* Carte HEETCH */}
      <View style={styles.providersContainer}>
        <View style={styles.textConnectProvider}>
          <SrText title="Heetch" />
        </View>
        <View style={styles.buttonConnectProvider}>
          <SrButton label="Connecter" handlePressed={handleEmpty} />
        </View>
      </View>
      {/* Carte Marcel */}
      <View style={styles.providersContainer}>
        <View style={styles.textConnectProvider}>
          <SrText title="Marcel" />
        </View>
        <View style={styles.buttonConnectProvider}>
          <SrButton label="Connecter" handlePressed={handleEmpty} />
        </View>
      </View>

      <View style={styles.btnsContainer}>
        <SrButton
          label="Configurer plus tard"
          type="secondary"
          handlePressed={() => navigation.navigate('DefaultPage')}
        />
        <SrButton
          label="Continuer"
          handlePressed={() => navigation.navigate('TabNavigator')}
        />
      </View>
    </SafeAreaView>
  );
};

export default SyncAppScreen;

const makeStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      paddingBottom: 40,
      paddingHorizontal: 16,
    },

    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalView: {
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 30,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },

    formContainer: {
      width: '100%',
      height: 300,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      backgroundColor: '#2B2D2E',
      borderColor: colors.lightGrey,
      borderStyle: 'solid',
      borderWidth: 1,
      paddingHorizontal: 16,
    },
    header: {
      width: '100%',
      justifyContent: 'flex-start',
      paddingHorizontal: 24,
      marginTop: 24,
    },
    title: {
      fontSize: 20,
      fontWeight: '600',
      color: colors.light,
      marginBottom: 16,
    },
    label: {
      fontSize: 16,
      color: colors.light,
      marginBottom: 16,
    },
    providersContainer: {
      flexWrap: 'wrap',
      width: '100%',
      flexDirection: 'row',
      paddingHorizontal: 16,
      marginBottom: 24,
    },
    textConnectProvider: {
      width: '60%',
    },
    buttonConnectProvider: {
      width: '40%',
    },
    btnsContainer: {
      width: '100%',
      paddingHorizontal: 24,
    },
    btnModal: {
      width: 240,
      alignItems: 'center',
      marginTop: 20,
      paddingTop: 8,
      backgroundColor: '#ec6e5b',
      borderRadius: 10,
    },
    textBtnModal: {
      color: '#ffffff',
      height: 24,
      fontWeight: '600',
      fontSize: 15,
    },
    closeBtnModal: {
      alignSelf: 'flex-end',
      paddingHorizontal: 8,
    },
  });
