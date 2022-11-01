import React, { useEffect, useState } from 'react';
import { useTheme } from '@react-navigation/native';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

const images = [
  'landing001.jpeg',
  'landing002.jpeg',
  'landing003.jpeg',
  'landing004.jpeg',
];

// ImageBackground did not accept dynamic source building like 'path' + var
// https://github.com/facebook/react-native/issues/2481#issuecomment-137982505
const getRandomBackground = (items) => {
  const randomIdx = Math.floor(Math.random() * items.length);
  switch (randomIdx) {
    case 1:
      return require('../assets/landing002.jpeg');
    case 2:
      return require('../assets/landing003.jpeg');
    case 3:
      return require('../assets/landing004.jpeg');
    default:
      return require('../assets/landing001.jpeg');
  }
};

export default function LandingScreen({ navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const user = useSelector((state) => state.user.value);

  const image = getRandomBackground(images);

  useEffect(() => {
    setTimeout(() => {
      if (user.token) {
        navigation.navigate('TabNavigator');
      } else {
        navigation.navigate('Home');
      }
    }, 1200);
  }, []);

  // case 1: There is no user token -> go to Login
  // case 2: The user logged, but he closed the app -> rides screen after checking the token
  // case 2: The user is logged but he did not complete the registration -> Sync App page

  return (
    <ImageBackground
      style={styles.backgroundImage}
      source={image}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Chargement...</Text>
      </View>
    </ImageBackground>
  );
}

const makeStyles = (colors) =>
  StyleSheet.create({
    backgroundImage: {
      flex: 1,
    },
    overlay: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      paddingTop: 60,
    },
    title: {
      color: colors.light,
    },
  });
