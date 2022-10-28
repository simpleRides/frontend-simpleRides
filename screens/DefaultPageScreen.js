import { useState } from 'react';
import {
  Image,
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useDispatch } from 'react-redux';

export default function DefaultPageScreen({ navigation }) {
  const handleSubmit = () => {
    navigation.navigate('Register');
  };

  return (
    <ImageBackground
      style={styles.backgroundImage}
      source={require('../assets/home.jpeg')}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../assets/logoblc.png')}
          />
        </View>
        <View style={styles.subtitle}>
          <Text style={styles.subtitle}>
            Naviguez entre vos applications VTC facilement grâce à SimpleRides
          </Text>
          <View style={styles.subContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('TabNavigator')}
              style={styles.buttongrey}
              activeOpacity={0.8}
            >
              <Text style={styles.textButton}>
                Découvrir SimpleRides en vidéo
              </Text>
              {/* créer un lien vers une page de démo YT  */}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleSubmit()}
              style={styles.buttonOrange}
              activeOpacity={0.8}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate('SignIn')}
                style={styles.buttongrey}
                activeOpacity={0.8}
              >
                <Text style={styles.textButton}>Continuer mon inscription</Text>
              </TouchableOpacity>
              {/* lien vers la page de SignIn  */}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
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
    borderColor: 'green',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
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
  buttonOrange: {
    alignItems: 'center',
    paddingTop: 8,
    width: '80%',
    height: 40,
    backgroundColor: '#FFA62B',
    borderRadius: 10,
    marginBottom: 20,
  },
  buttongrey: {
    alignItems: 'center',
    paddingTop: 8,
    width: '80%',
    height: 40,
    backgroundColor: '#545454',
    borderRadius: 10,
    marginBottom: 24,
  },
  textButton: {
    color: '#ffffff',
    height: 30,
    fontWeight: '600',
    fontSize: 16,
  },
});
