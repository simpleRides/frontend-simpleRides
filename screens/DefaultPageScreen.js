import { useState } from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import SrButton from '../components/core/SrButton';
// import SrText from '../components/core/Srtext';

export default function DefaultPageScreen({ navigation }) {
  const handleSubmit = () => {
    navigation.navigate('Register');
  };

  const handleYT = () => {
    console.log('Youtube is ok');
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require('../assets/logoblc.png')} />
      </View>
      <View style={styles.subtitle}>
        <Text style={styles.subtitle}>
          Pas encore inscrit!
          {/* mettre en SrText title  */}
          Decouvrez SimpleRides et naviguez entre vos applications VTC
          facilement.
          {/* mettre en SrText subtitle  */}
        </Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          Vous n'avez pas encore configuré vos applications. Continuez votre
          inscription ou visualisez une vidéo de démonstration de l’application.
          Faites votre choix ci-dessous!
        </Text>
      </View>
      <View style={styles.subContainer}>
        <SrButton
          label="Découvrir SimpleRides en vidéo"
          type="secondary"
          handlePressed={handleYT}
        />
        <SrButton
          label="Continuer mon inscription"
          handlePressed={handleSubmit}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  subContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 40,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingTop: 60,
    borderWidth: 4,
    paddingHorizontal: 16,
  },
  imageContainer: {
    width: 250,
    height: 250,
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '50%',
    justifyContent: 'flex-start',
  },
  subtitle: {
    width: '100%',
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '500',
    color: '#ffffff',
    marginBottom: 24,
  },
  text: {
    width: '100%',
    fontSize: 16,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '500',
    color: '#ffffff',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  textContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#2B2D2E',
    borderColor: '#585858',
    borderStyle: 'solid',
    borderWidth: 1,
    color: '#545454',
  },
});
