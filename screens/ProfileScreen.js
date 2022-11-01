import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import SrButton from '../components/core/SrButton';

// const handleLogout = () => {
//   dispatch(logout());
//   dispatch(removeAllBookmark());
// };

const ProfileScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <View style={styles.container}>
      <SrButton
        label="Déconnexion"
        handlePressed={() => navigation.navigate('Home')}
      />
    </View>
  );
};

export default ProfileScreen;

const makeStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 16,
    },
  });
