import React, { useState, useEffect } from 'react';

import { Modal, StyleSheet, View } from 'react-native';
import SrText from '../core/SrText';
import SrButton from '../core/SrButton';

import { useTheme } from '@react-navigation/native';
import SliderFilter from './SliderFilter';
import { filtersDataForUi } from './FiltersData';

const ModalFilters = ({ isOpen, toggle }) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

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
            {filtersDataForUi.map((el) => (
              <SliderFilter
                key={el.id}
                label={el.label}
                min={el.min}
                max={el.max}
                step={el.step}
                unit={el.unit}
              />
            ))}
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
  });
