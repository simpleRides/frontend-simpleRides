import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme, useFocusEffect } from '@react-navigation/native';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Platform,
  Image,
} from 'react-native';
import constants from '../core/constants';

import * as Location from 'expo-location';
import { distance } from '../modules/distance';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Card from '../components/RidesScreen/Card';
import SrButton from '../components/core/SrButton';
import SrText from '../components/core/SrText';
import Checkbox from 'expo-checkbox';
import Slider from '@react-native-community/slider';
import ModalFilters from '../components/RidesScreen/ModalFilters';
import SrSpinner from '../components/core/SrSpinner';
import { addSettingsToStore } from '../reducers/settings';

export default function RidesScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [location, setLocation] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [tempCoordinates, setTempCoordinates] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings.value);
  const user = useSelector((state) => state.user.value);
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };

  // hook qui se lance au focus de la page
  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      const controller = new AbortController();

      const fetching = async () => {
        await fetch(`${constants.BACKEND_URL}/users/addsettings`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: user.token,
            clientNoteMin: settings.clientNoteMin,
            priceMin: settings.priceMin,
            markupMin: settings.markupMin,
            distanceMax: settings.distanceMax,
            pickupDistanceMax: settings.pickupDistanceMax,
          }),
        })
          .then(() =>
            fetch(`${constants.BACKEND_URL}/users/`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                token: user.token,
              }),
            })
          )
          .then((res) => res.json())
          .then((data) => {
            data.result &&
              dispatch(
                addSettingsToStore({
                  clientNoteMin: data.data.clientNoteMin,
                  priceMin: data.data.priceMin,
                  markupMin: data.data.markupMin,
                  pickupDistanceMax: data.data.pickupDistanceMax,
                  distanceMax: data.data.distanceMax,
                })
              );
            // fetch(`https://providers-sooty.vercel.app/uber/settings`, {
            fetch(`${constants.BACKEND_URL}/providers`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                clientNoteMin: data.data.clientNoteMin,
                priceMin: data.data.priceMin,
                markupMin: data.data.markupMin,
                distanceMax: data.data.distanceMax,
                pickupDistanceMax: data.data.pickupDistanceMax,
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                data.result && setTempCoordinates(data.data);
                setIsLoading(false);
              });
          });
      };

      fetching();

      return () => controller.abort();
    }, [modalVisible])
  );
  // providers simu à supprimmer ************************
  const testProviders = ['uber', 'heetch', 'bolt'];

  let cardsWithData;
  if (tempCoordinates) {
    cardsWithData = tempCoordinates
      // // isole les courses disponibles
      // .filter((a) => a.status === 'Pending')
      // // récupère les courses encore actives
      // .filter((a) => Date.parse(a.date) > new Date())
      // // les trie par date
      // .sort((a, b) => {
      //   if (a.date > b.date) {
      //     return 1;
      //   }
      //   if (a.date < b.date) {
      //     return -1;
      //   }
      //   return 0;
      // })
      // récupère les 10 premières
      // .slice(0, 10)
      .map((data, i) => {
        return (
          <Card
            key={i}
            timeToPickup={(
              (distance(
                48.887758952992634,
                2.3036635117535176,
                data.pickupCoordinates.lat,
                data.pickupCoordinates.lon,
                'K'
              ) *
                1000) /
              300
            ).toFixed(0)}
            distanceToPickup={(
              distance(
                48.887758952992634,
                2.3036635117535176,
                data.pickupCoordinates.lat,
                data.pickupCoordinates.lon,
                'K'
              ) * 1000
            ).toFixed(0)}
            clientNote={data.clientNote}
            markup={data.markup}
            price={data.price}
            duration={Math.round(data.travelTime)}
            pickupCoordinates={data.pickupCoordinates}
            pickupAddress={data.pickupAddress.replace(', France', '')}
            arrivalCoordinates={data.coordinates}
            arrivalAddress={data.address.replace(', France', '')}
            provider={data.providerName}
            course_id={data.course_id}
          />
        );
      });
  }
  // CARDS PROPS : timeToPickup, distanceTopickup, clientNote, markup, price, duration, pickupAddress, arrivalAddress, provider
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>En courses!</Text>
          <View style={styles.settingsContainer}>
            <View style={styles.form}>
              <Switch
                trackColor={{ false: '#767577', true: '#FFA62B' }}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
              <Text style={styles.label}>Sélection automatique</Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <FontAwesome name="cog" color="#FFA62B" size={24} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.cardContainer}>
          {isLoading ? <SrSpinner /> : cardsWithData}
        </View>

        <ModalFilters
          isOpen={modalVisible}
          toggle={() => setModalVisible(!modalVisible)}
        />
      </SafeAreaView>
    </ScrollView>
  );
}

const makeStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#28272A',
      alignItems: 'center',
    },
    header: {
      width: '100%',
      justifyContent: 'flex-start',
      paddingHorizontal: 24,
      marginTop: 24,
    },
    settingsContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 32,
    },
    form: {
      flexDirection: 'row',
      alignItems: 'center',
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
      marginLeft: 24,
    },
    scrollView: {
      alignItems: 'center',
      paddingBottom: 20,
    },
    cardContainer: {
      width: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  });
