import React, { useState } from 'react';
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
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  // const user = useSelector((state) => state.user.value);
  const { colors } = useTheme();
  const styles = makeStyles(colors);

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
          <Card
            timeToPickup="5"
            distanceToPickup="800"
            clientNote="4.1"
            markup="1.12"
            price="2000"
            duration="23"
            provider="uber"
            pickupAddress="56 Boulevard Pereire, 75017"
            arrivalAddress="5 avenue de Tourville, Paris"
          />
          <Card
            timeToPickup="5"
            distanceToPickup="800"
            clientNote="4.1"
            markup="1.12"
            price="2000"
            duration="23"
            provider="heetch"
            pickupAddress="Champ de Mars, 5 Av. Anatole France, 75007 Paris"
            arrivalAddress="55 Rue du Faubourg Saint-Honoré, 75008 Paris"
          />
          <Card
            timeToPickup="5"
            distanceToPickup="800"
            clientNote="4.1"
            markup="1.12"
            price="2000"
            duration="23"
            provider="bolt"
            pickupAddress="55 Rue du Faubourg Saint-Honoré, 75008 Paris"
            arrivalAddress="Champ de Mars, 5 Av. Anatole France, 75007 Paris"
          />
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
