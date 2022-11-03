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
} from 'react-native';
import constants from '../core/constants';

import { distance } from '../modules/distance';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Card from '../components/RidesScreen/Card';
import ModalFilters from '../components/RidesScreen/ModalFilters';
import SrSpinner from '../components/core/SrSpinner';
import { addSettingsToStore } from '../reducers/settings';

export default function RidesScreen() {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [tempCoordinates, setTempCoordinates] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const settings = useSelector((state) => state.settings.value);
  const user = useSelector((state) => state.user.value);

  const defaultValue = {
    clientNoteMin: 0,
    pickupDistanceMax: 10000,
    priceMin: 0,
    distanceMax: 10000,
    markupMin: 1,
  };

  const updateUserSettings = () => {
    return fetch(`${constants.BACKEND_URL}/users/addsettings`, {
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
    }).then((res) => res.json());
  };

  const fetchSettings = () => {
    return fetch(`${constants.BACKEND_URL}/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: user.token,
      }),
    }).then((res) => res.json());
  };

  const fetchRides = (data) => {
    return fetch(`${constants.BACKEND_URL}/providers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        clientNoteMin: data.clientNoteMin,
        priceMin: data.priceMin,
        markupMin: data.markupMin,
        distanceMax: data.distanceMax,
        pickupDistanceMax: data.pickupDistanceMax,
      }),
    }).then((res) => res.json());
  };

  const saveSettingsToStore = (data) => {
    dispatch(
      addSettingsToStore({
        clientNoteMin: data.clientNoteMin,
        priceMin: data.priceMin,
        markupMin: data.markupMin,
        pickupDistanceMax: data.pickupDistanceMax,
        distanceMax: data.distanceMax,
      })
    );
  };

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };

  // hook qui se lance au focus de la page
  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);

      const controller = new AbortController();

      const fetching = () => {
        fetchSettings().then((data) => {
          const dataSettings = data.data ? data.data : defaultValue;
          data.result && saveSettingsToStore(dataSettings);

          fetchRides(dataSettings)
            .then((data) => {
              data.result && setTempCoordinates(data.data);
              setIsLoading(false);
            })
            .then(() => {
              updateUserSettings();
            });
        });
      };
      fetching();

      return () => controller.abort();
    }, [modalVisible])
  );

  let cardsWithData;
  if (tempCoordinates) {
    const coordsToRides = isEnabled
      ? tempCoordinates.sort(() => Math.random() - 0.5).slice(0, 1)
      : tempCoordinates;
    cardsWithData = coordsToRides.map((data, i) => {
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
