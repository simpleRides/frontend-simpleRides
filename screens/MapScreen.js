import React from 'react';
import { View, Text, Platform, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import SrButton from '../components/core/SrButton';

const GOOGLE_API_KEY = 'AIzaSyA-bKS86fQ7PK9wJ4gIG07PSA8k2meA4B4';

export default function MapScreen({ navigation }) {
  const map = useSelector((state) => state.map.value);
  const handleSubmit = () => navigation.navigate('Rides');
  const { colors } = useTheme();

  return (
    <>
      <MapView
        minZoomLevel={13}
        mapType="standard"
        showsBuildings={false}
        initialRegion={{
          latitude: 48.866669,
          longitude: 2.33333,
          latitudeDelta: 0,
          longitudeDelta: 0,
        }}
        animateToRegion={{
          latitude: map.pickupCoordinates.lat,
          longitude: map.pickupCoordinates.lon,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        region={
          map.pickupCoordinates && {
            latitude: map.pickupCoordinates.lat,
            longitude: map.pickupCoordinates.lon,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }
        }
        style={{ flex: 1 }}
      >
        {map.pickupCoordinates && (
          <Marker
            title="Pickup"
            coordinate={{
              latitude: map.pickupCoordinates.lat,
              longitude: map.pickupCoordinates.lon,
            }}
          >
            <Text
              style={{
                backgroundColor: colors.primary,
                padding: 3,
                borderRadius: 10,
              }}
            >
              Prise en charge
            </Text>
            <Ionicons name="pin" size={40} style={{ paddingRight: 5 }} />
          </Marker>
        )}
        {map.arrivalCoordinates && (
          <Marker
            title="Arrival"
            coordinate={{
              latitude: map.arrivalCoordinates.lat,
              longitude: map.arrivalCoordinates.lon,
            }}
          >
            <Text
              style={{
                backgroundColor: colors.primary,
                padding: 3,
                borderRadius: 10,
              }}
            >
              Arrivée
            </Text>
            <Ionicons name="flag" size={40} style={{ paddingRight: 5 }} />
          </Marker>
        )}
        {map && (
          <MapViewDirections
            origin={{
              latitude: map.pickupCoordinates.lat,
              longitude: map.pickupCoordinates.lon,
            }}
            destination={{
              latitude: map.arrivalCoordinates.lat,
              longitude: map.arrivalCoordinates.lon,
            }}
            apikey="AIzaSyA-bKS86fQ7PK9wJ4gIG07PSA8k2meA4B4"
            strokeWidth={6}
            strokeColor={colors.primary}
          />
        )}
      </MapView>
      <View style={styles.footer}>
        <Text style={{ color: 'white', marginTop: 8 }}>
          {map.pickupAddress}
        </Text>
        <Text style={{ color: 'white', marginBottom: 8 }}>
          {map.arrivalAddress}
        </Text>
        <SrButton label="J'ai fini !" handlePressed={() => handleSubmit()} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: 'black',
    paddingBottom: Platform.OS === 'ios' ? 24 : 8,
    paddingHorizontal: Platform.OS === 'ios' ? 8 : 4,
  },
});
