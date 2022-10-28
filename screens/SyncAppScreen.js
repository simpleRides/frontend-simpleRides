import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import SrButton from '../components/core/SrButton';

const SyncAppScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={{ color: 'white' }}>SyncAppScreen </Text>
      <View style={styles.btnsContainer}>
        <SrButton
          label="Skip"
          type="secondary"
          handlePressed={() => navigation.navigate('DefaultPage')}
        />
        <SrButton
          label="Continuer"
          handlePressed={() => navigation.navigate('TabNavigator')}
        />
      </View>
    </View>
  );
};

export default SyncAppScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  btnsContainer: {
    width: '100%',
  },
});
