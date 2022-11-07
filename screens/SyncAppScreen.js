import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateUberToken,
  updateBoltToken,
  updateHeetchToken,
  updateMarcelToken,
} from '../reducers/user';
import { useTheme } from '@react-navigation/native';
import {
  Modal,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SrInput from '../components/core/SrInput';
import SrButton from '../components/core/SrButton';
import SrText from '../components/core/SrText';

import constants from '../core/constants';

const SyncAppScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [idProvider, setIdProvider] = useState('');
  const [pwdProvider, setPwdProvider] = useState('');
  const [nameProvider, setNameProvider] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const user = useSelector((state) => state.user.value);

  const handleSubmitUber = () => {
    setNameProvider('uber');
    setModalVisible(true);
  };

  const handleSubmitBolt = () => {
    setNameProvider('bolt');
    setModalVisible(true);
  };

  const handleSubmitHeetch = () => {
    setNameProvider('heetch');
    setModalVisible(true);
  };

  const handleSubmitMarcel = () => {
    setNameProvider('marcel');
    setModalVisible(true);
  };

  const handleNewProvider = () => {
    fetch(`${constants.BACKEND_URL}/users/connectprovider`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: user.token,
        nameProvider: nameProvider,
        idProvider: idProvider,
        pwdProvider: pwdProvider,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          switch (nameProvider) {
            case 'uber':
              dispatch(updateUberToken(data.tokenProvider));
              break;
            case 'bolt':
              dispatch(updateBoltToken(data.tokenProvider));
              break;
            case 'heetch':
              dispatch(updateHeetchToken(data.tokenProvider));
              break;
            case 'marcel':
              dispatch(updateMarcelToken(data.tokenProvider));
              break;
          }
          setIdProvider('');
          setPwdProvider('');
          setNameProvider('');
          setModalVisible(false);
        }
      })
      .catch((error) => console.log('Err:', error));
  };

  const handleClose = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Fenêtre Modale */}
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
              label={
                'Identifiant ' +
                nameProvider.substring(0, 1).toUpperCase() +
                nameProvider.substring(1, nameProvider.length)
              }
              placeholder={
                'Entrez votre identifiant ' +
                nameProvider.substring(0, 1).toUpperCase() +
                nameProvider.substring(1, nameProvider.length)
              }
              onChange={(e) => setIdProvider(e)}
            />
            <SrInput
              isPassword={true}
              label={
                'Mot de passe ' +
                nameProvider.substring(0, 1).toUpperCase() +
                nameProvider.substring(1, nameProvider.length)
              }
              placeholder={
                'Entrez votre mot de passe ' +
                nameProvider.substring(0, 1).toUpperCase() +
                nameProvider.substring(1, nameProvider.length)
              }
              onChange={(e) => setPwdProvider(e)}
            />
            <SrButton label="Valider" handlePressed={handleNewProvider} />
          </View>
        </View>
      </Modal>

      {/* Header */}
      <View style={styles.header}>
        {/*<Text style={styles.title}>Connectez ici vos applications</Text>
        <Text style={styles.label}>
          Connectez vos applications pour que SimpleRides aggrège les courses
          des différentes plateformes
        </Text>*/}
        {!user.tokenUber &&
        !user.tokenBolt &&
        !user.tokenHeetch &&
        !user.tokenMarcel ? (
          <SrText
            title="Connectez ici vos applications"
            subtitle="Connectez vos applications pour que SimpleRides aggrège les courses des différentes plateformes"
          />
        ) : (
          <SrText
            title="Félicitations !"
            subtitle="Voici les applications connectées à votre compte SimpleRides."
          />
        )}
      </View>
      {/* Carte UBER */}
      <View style={styles.providersContainer}>
        <View style={styles.textConnectProvider}>
          <SrText title="Uber" />
        </View>
        <View style={styles.buttonConnectProvider}>
          {user.tokenUber ? (
            <FontAwesome name="check-square" color="#FFA62B" size={48} />
          ) : (
            <SrButton label="Connecter" handlePressed={handleSubmitUber} />
          )}
        </View>
      </View>
      {/* Carte BOLT */}
      <View style={styles.providersContainer}>
        <View style={styles.textConnectProvider}>
          <SrText title="Bolt" />
        </View>
        <View style={styles.buttonConnectProvider}>
          {user.tokenBolt ? (
            <FontAwesome name="check-square" color="#FFA62B" size={48} />
          ) : (
            <SrButton label="Connecter" handlePressed={handleSubmitBolt} />
          )}
        </View>
      </View>
      {/* Carte HEETCH */}
      <View style={styles.providersContainer}>
        <View style={styles.textConnectProvider}>
          <SrText title="Heetch" />
        </View>
        <View style={styles.buttonConnectProvider}>
          {user.tokenHeetch ? (
            <FontAwesome name="check-square" color="#FFA62B" size={48} />
          ) : (
            <SrButton label="Connecter" handlePressed={handleSubmitHeetch} />
          )}
        </View>
      </View>
      {/* Carte Marcel */}
      <View style={styles.providersContainer}>
        <View style={styles.textConnectProvider}>
          <SrText title="Marcel" />
        </View>
        <View style={styles.buttonConnectProvider}>
          {user.tokenMarcel ? (
            <FontAwesome name="check-square" color="#FFA62B" size={48} />
          ) : (
            <SrButton label="Connecter" handlePressed={handleSubmitMarcel} />
          )}
        </View>
      </View>
      {/* Boutons bas-de-page */}
      <View style={styles.btnsContainer}>
        {!user.tokenUber &&
        !user.tokenBolt &&
        !user.tokenHeetch &&
        !user.tokenMarcel ? (
          <SrButton
            label="Configurer plus tard"
            type="secondary"
            handlePressed={() => navigation.navigate('DefaultPage')}
          />
        ) : (
          <SrText title="" />
        )}
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
      // backgroundColor: 'rgba(0, 0, 0, 0.4)',
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
