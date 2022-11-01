import React from 'react';
import { useState } from 'react';

import { StyleSheet, Text, View } from 'react-native';
import Checkbox from 'expo-checkbox';
import Slider from '@react-native-community/slider';

import { useTheme } from '@react-navigation/native';

{
  /* https://www.npmjs.com/package/@react-native-community/slider */
}

const SliderFilter = ({ label, min = 0, max, step, unit }) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const [isChecked, setChecked] = useState(false);
  const [value, setValue] = useState(0);

  return (
    <View style={styles.filterContainer}>
      <Checkbox
        style={styles.checkbox}
        value={isChecked}
        onValueChange={setChecked}
        color={isChecked ? colors.primary : undefined}
      />
      <View style={styles.sliderContainer}>
        <Text style={styles.sliderLabel}>
          {label} ({value} {unit})
        </Text>

        <Slider
          style={{ width: 300, height: 40 }}
          minimumValue={min}
          maximumValue={max}
          minimumTrackTintColor={colors.primary}
          maximumTrackTintColor={colors.secondary}
          value={value}
          step={step}
          onValueChange={(e) => setValue(e)}
        />
      </View>
    </View>
  );
};

export default SliderFilter;

const makeStyles = (colors) =>
  StyleSheet.create({
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
      marginBottom: 16,
    },
    sliderContainer: {
      width: '100%',
      paddingStart: 16,
    },
    sliderLabel: {
      color: colors.light,
    },
  });