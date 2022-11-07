import React from 'react';

import { Modal, StyleSheet, View } from 'react-native';
import SrButton from '../core/SrButton';

import { useTheme } from '@react-navigation/native';
import SliderFilter from './SliderFilter';
import { filtersDataForUi } from './FiltersData';
import ModalHeader from './ModalHeader';
import { useSelector } from 'react-redux';

const ModalFilters = ({ isOpen, toggle }) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const settings = useSelector((state) => state.settings.value);

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isOpen}
      onRequestClose={() => toggle()}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ModalHeader />

          <View style={styles.modalContent}>
            {filtersDataForUi.map((el) => {
              switch (el.name) {
                case 'clientNoteMin':
                  el.value = settings.clientNoteMin;

                  break;
                case 'pickupDistanceMax':
                  el.value = settings.pickupDistanceMax;

                  break;
                case 'priceMin':
                  el.value = settings.priceMin;

                  break;
                case 'distanceMax':
                  el.value = settings.distanceMax;

                  break;
                case 'markupMin':
                  el.value = settings.markupMin;
              }
              return (
                <SliderFilter
                  key={el.id}
                  name={el.name}
                  label={el.label}
                  min={el.min}
                  max={el.max}
                  step={el.step}
                  unit={el.unit}
                  value={el.value}
                  isFilterChecked={el.isFilterChecked}
                />
              );
            })}
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
      paddingTop: Platform.OS === 'ios' ? 72 : 48,
      paddingBottom: Platform.OS === 'ios' ? 32 : 24,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  });
