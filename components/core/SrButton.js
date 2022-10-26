import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';

/**
 * How to use: <SrButton label="Text of the button" handlePressed={() => handleSubmit()} />
 * or <SrButton label='Text of the button' type='secondary' handlePressed={() => navigation.navigate('SignIn')} />
 *
 * @param {string} label - The button title
 * @param {enum} type - primary or secondary to change the color of the button
 * @param handlePressed - The click event that is launched in the parent component
 * @returns JSX.Element
 */
const SrButton = ({ label, type = 'primary', handlePressed }) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const btnColors = type === 'primary' ? 'primary' : 'secondary';

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.btn, styles[btnColors]]}
        onPress={() => handlePressed()}
      >
        <Text style={styles.textButton}>{label}</Text>
      </TouchableOpacity>
    </>
  );
};

export default SrButton;

const makeStyles = (colors) =>
  StyleSheet.create({
    btn: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: 40,
      marginBottom: 8,
      marginTop: 8,
      borderRadius: 10,
    },
    textButton: {
      color: colors.light,
      fontWeight: '600',
      fontSize: 16,
    },
    primary: {
      backgroundColor: colors.primary,
    },
    secondary: {
      backgroundColor: colors.lightGrey,
    },
  });
