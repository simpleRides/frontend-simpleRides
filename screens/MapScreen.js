import React from 'react';
import { View, Text, Platform, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import { useRef, useState, useEffect } from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';

import SrButton from '../components/core/SrButton';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

export default function MapScreen({ navigation }) {
  const map = useSelector((state) => state.map.value);
  const handleSubmit = () => navigation.navigate('Rides');
  const { colors } = useTheme();
  const mapRef = useRef(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    setOrigin({
      latitude: map.pickupCoordinates.lat,
      longitude: map.pickupCoordinates.lon,
    });
    setDestination({
      latitude: map.arrivalCoordinates.lat,
      longitude: map.arrivalCoordinates.lon,
    });
  }, []);

  const edgePaddingValue = 70;

  const edgePadding = {
    top: edgePaddingValue,
    right: edgePaddingValue,
    bottom: edgePaddingValue,
    left: edgePaddingValue,
  };

  const moveTo = () =>
    mapRef.current.fitToCoordinates([origin, destination], {
      edgePadding,
      animated: false,
    });

  return (
    <>
      <MapView
        ref={mapRef}
        minZoomLevel={10}
        onLayout={() => moveTo()}
        mapType="standard"
        style={{ flex: 1 }}
      >
        {origin && (
          <Marker title="Pickup" coordinate={origin}>
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
        {destination && (
          <Marker title="Arrival" coordinate={destination}>
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
            origin={origin}
            destination={destination}
            apikey={GOOGLE_API_KEY}
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
