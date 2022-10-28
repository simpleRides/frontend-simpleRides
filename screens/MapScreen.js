import React from 'react';
import { View, Text } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';

import SrButton from '../components/core/SrButton';

export default function MapScreen({ navigation }) {
  const map = useSelector((state) => state.map.value);
  const handleSubmit = () => navigation.navigate('Rides');
  const [pickup, setPickup] = useState(null);
  const [arrival, setArrival] = useState(null);

  useEffect(() => {
    fetch(
      `http://dev.virtualearth.net/REST/v1/Locations/FR/${map.pickupAddress}?key=AgprqfJkez8616Fu5cuEJjH43Rz0mYOf8ipO_KRW3RU5TwulGlUmk8lUd05w45iX`
    )
      .then((response) => response.json())
      .then((data) => {
        setPickup([
          data.resourceSets[0].resources[0].geocodePoints[0].coordinates[0],
          data.resourceSets[0].resources[0].geocodePoints[0].coordinates[1],
        ]);
      });

    fetch(
      `http://dev.virtualearth.net/REST/v1/Locations/FR/${map.arrivalAddress}?key=AgprqfJkez8616Fu5cuEJjH43Rz0mYOf8ipO_KRW3RU5TwulGlUmk8lUd05w45iX`
    )
      .then((response) => response.json())
      .then((data) => {
        setArrival([
          data.resourceSets[0].resources[0].geocodePoints[0].coordinates[0],
          data.resourceSets[0].resources[0].geocodePoints[0].coordinates[1],
        ]);
      });
  }, []);

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
          pickup && {
            latitude: pickup[0],
            longitude: pickup[1],
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }
        }
        style={{ flex: 1 }}
      >
        {pickup && (
          <Marker
            title="Pickup"
            coordinate={{
              latitude: pickup[0],
              longitude: pickup[1],
            }}
          >
            <Text style={{ backgroundColor: 'orange' }}>PICKUP</Text>
            <Ionicons name="pin" size={40} style={{ paddingRight: 5 }} />
          </Marker>
        )}
        {arrival && (
          <Marker
            title="Arrival"
            coordinate={{
              latitude: arrival[0],
              longitude: arrival[1],
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
