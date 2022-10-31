import React from 'react';
import { View, Text } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';

import Ionicons from 'react-native-vector-icons/Ionicons';

import SrButton from '../components/core/SrButton';

export default function MapScreen({ navigation }) {
  const map = useSelector((state) => state.map.value);
  const handleSubmit = () => navigation.navigate('Rides');

  return (
    <>
      <MapView
        minZoomLevel={13}
        mapType="standard"
        showsBuildings={false}
        showsTraffic={true}
        initialRegion={{
          latitude: 48.866669,
          longitude: 2.33333,
          latitudeDelta: 0,
          longitudeDelta: 0,
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
            <Text style={{ backgroundColor: 'orange' }}>PICKUP</Text>
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
            <Text style={{ backgroundColor: 'red' }}>ARRIVAL</Text>
            <Ionicons
              name="flag-outline"
              size={40}
              style={{ paddingRight: 5 }}
            />
          </Marker>
        )}
      </MapView>
      <View style={{ backgroundColor: 'black' }}>
        <Text style={{ color: 'white' }}>{map.pickupAddress}</Text>
        <Text style={{ color: 'white' }}>{map.arrivalAddress}</Text>
        <SrButton label="J'ai fini !" handlePressed={() => handleSubmit()} />
      </View>
    </>
  );
}
