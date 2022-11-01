import { useState } from 'react';
import { StyleSheet, Text, Image, View, pdf } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import SrText from '../components/core/SrText';
import SrButton from '../components/core/SrButton';

export default function CgvScreen({ navigation }) {
  const handleReturn = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <SrText title="Conditions générales d'utilisation" />

        <Image
          style={styles.image}
          source={require('../assets/2022_11_SimpleRides_CGV_DRAFT.png')}
        />
        <SrButton
          label="Retourner à la page m'enregistrer"
          type="secondary"
          handlePressed={handleReturn}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 24,
    paddingTop: 48,
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '80%',
  },
});
