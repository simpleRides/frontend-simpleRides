import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  pdf,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import pdf from 'react-native-pdf';

export default function pdf() {
  const source = require('../assets/2022_11_SimpleRides_CGV_DRAFT.pdf'); // ios only visiblement, comment avoir pour android ?

  return (
    <View style={styles.container}>
      <pdf source={source} />
      <ScrollView contentContainerStyle={styles.scrollView}></ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#28272A',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    justifyContent: 'flex-start',
    paddingHorizontal: 24,
    marginTop: 24,
  },
  settingsContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  form: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFF',
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    color: '#FFF',
    marginLeft: 24,
  },
  scrollView: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
