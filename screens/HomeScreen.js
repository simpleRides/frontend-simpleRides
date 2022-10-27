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
import { resetPlaces, updateNickname } from '../reducers/user';
import SrButton from '../components/core/SrButton';

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();

  const [nickname, setNickname] = useState('');

  const handleSubmit = () => {
    dispatch(updateNickname(nickname));
    dispatch(resetPlaces());
    navigation.navigate('Register');
  };

  return (
    <ImageBackground
      style={styles.backgroundImage}
      source={require('../assets/home.jpeg')}
    >
      <View style={styles.container}>
        <Image style={styles.image} source={require('../assets/logoblc.png')} />
        <View style={styles.subtitle}>
          <Text style={styles.subtitle}>
            Naviguez entre vos applications VTC facilement grâce à SimpleRides
          </Text>
          <View style={styles.subContainer}>
            <SrButton
              label="Se connecter"
              type="secondary"
              handlePressed={() => navigation.navigate('SignIn')}
            />
            <SrButton label="S'inscrire" handlePressed={() => handleSubmit()} />
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
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
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
  },
});
