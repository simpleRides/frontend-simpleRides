import React from 'react';
import { View } from 'react-native';
import SrText from '../core/SrText';

const ModalHeader = () => {
  return (
    <View>
      <SrText
        title="Paramétres de vos courses"
        subtitle="Filtrez vos courses selon vos critères préférés.Attention si la demande est trop faible nous vous en informerons et proposerons des courses hors critères"
      />
    </View>
  );
};

export default ModalHeader;
