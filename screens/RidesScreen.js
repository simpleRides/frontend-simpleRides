import React, { useState, useEffect } from 'react';
import { useTheme } from '@react-navigation/native';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Card from '../components/RidesScreen/Card';

export default function RidesScreen() {
  // const dispatch = useDispatch();
  const [isEnabled, setIsEnabled] = useState(false);
  const [tempCoordinates, setTempCoordinates] = useState(null);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  // const user = useSelector((state) => state.user.value);
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  useEffect(() => {
    fetch(`https://backend-providers-wine.vercel.app/uber`)
      .then((res) => res.json())
      .then((data) => {
        data.result && setTempCoordinates(data.data);
      });
  }, []);

  // providers simu à supprimmer ************************
  const testProviders = ['uber', 'heetch', 'bolt'];
  let cardsWithData;
  if (tempCoordinates) {
    cardsWithData = tempCoordinates
      .slice(0, 10)
      .map((data, i) => {
        return (
          <Card
            key={i}
            timeToPickup="3"
            distanceToPickup="200"
            clientNote={data.clientNote}
            markup={data.markup}
            price={data.price}
            duration={data.travelTime}
            pickupCoordinates={data.pickupCoordinates}
            pickupAddress={data.pickupAddress}
            arrivalCoordinates={data.coordinates}
            arrivalAddress={data.address}
            provider={
              testProviders[Math.floor(Math.random() * testProviders.length)]
            }
          />
        );
      })
      .sort((a, b) => {
        if (a.date > b.date) {
          return 1;
        }
        if (a.date < b.date) {
          return -1;
        }
        return 0;
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
            <TouchableOpacity activeOpacity={0.8}>
              <FontAwesome name="cog" color="#FFA62B" size={24} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.cardContainer}>
          {tempCoordinates && cardsWithData}
        </View>
        <ScrollView contentContainerStyle={styles.scrollView}></ScrollView>
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
