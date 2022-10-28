import React from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';

import SrButton from '../components/core/SrButton';

export default function MapScreen({ navigation }) {
  const handleSubmit = () => navigation.navigate('Rides');
  return (
    <>
      <MapView
        initialRegion={{
          latitude: 48.887712919606315,
          longitude: 2.30365659140404,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{ flex: 1 }}
      ></MapView>
      <View style={{ backgroundColor: 'black' }}>
        <SrButton label="J'ai fini !" handlePressed={() => handleSubmit()} />
      </View>
    </>
  );
}
