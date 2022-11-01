import React, { useState, useEffect } from 'react';

import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SrText from '../core/SrText';
import Checkbox from 'expo-checkbox';
import Slider from '@react-native-community/slider';
import SrButton from '../core/SrButton';

import { useTheme } from '@react-navigation/native';

const ModalFilters = ({ isOpen, toggle }) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [isChecked, setChecked] = useState(false);

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isOpen}
      onRequestClose={() => toggle()}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View>
            <SrText
              title="Paramétres de vos courses"
              subtitle="Filtrez vos courses selon vos critères préférés.Attention si la demande est trop faible nous vous en informerons et proposerons des courses hors critères"
            />
          </View>
          <View style={styles.modalContent}>
            <View style={styles.filterContainer}>
              <Checkbox
                style={styles.checkbox}
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? colors.primary : undefined}
              />
              <View style={styles.sliderContainer}>
                <Text style={styles.sliderLabel}>Notation voyager</Text>
                <Slider
                  style={{ width: 300, height: 40 }}
                  minimumValue={0}
                  maximumValue={10}
                  minimumTrackTintColor="#FFFFFF"
                  maximumTrackTintColor="#000000"
                />
              </View>
            </View>
          </View>

          <SrButton label="Valider" handlePressed={() => toggle()} />
        </View>
      </View>
    </Modal>
  );
};

export default ModalFilters;

const makeStyles = (colors) =>
  StyleSheet.create({
    centeredView: {
      flex: 1,
    },
    modalView: {
      flex: 1,
      backgroundColor: colors.black,
      paddingHorizontal: 16,
      paddingTop: Platform.OS === 'ios' ? 72 : 40,
      paddingBottom: Platform.OS === 'ios' ? 32 : 24,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    textStyle: {
      color: 'red',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      color: colors.light,
      fontSize: 20,
      marginBottom: 15,
      textAlign: 'center',
    },
    filterContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '95%',
      height: 80,
      borderWidth: 1,
      borderColor: colors.lightGrey,
      paddingStart: 16,
      borderRadius: 5,
      backgroundColor: '#333',
    },
    sliderContainer: {
      width: '100%',
      paddingStart: 16,
    },
    sliderLabel: {
      color: colors.light,
    },
  });
