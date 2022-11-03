import React from 'react';
import { View } from 'react-native';
import SrText from '../core/SrText';

const ModalHeader = () => {
  return (
    <View>
      <SrText
        title="Paramètres de vos courses"
        subtitle="Filtrez vos courses selon vos critères préférés."
      />
    </View>
  );
};

export default ModalHeader;
