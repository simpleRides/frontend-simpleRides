import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const SrSpinner = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/Spinner-1s-200px.gif')}
        style={styles.image}
      />
    </View>
  );
};

export default SrSpinner;

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
