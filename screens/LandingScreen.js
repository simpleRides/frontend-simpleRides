import React from 'react';
import { useTheme } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';

export default function LandingScreen() {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  // case 1: There is no user token -> go to Login
  // case 2: The user logged, but he closed the app -> rides screen after checking the token
  // case 2: The user is logged but he did not complete the registration -> Sync App page

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LandingScreen</Text>
    </View>
  );
}

const makeStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      color: colors.light,
    },
  });
