import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { View } from 'react-native';

/**
 * How to use:
 * Default color: <SrButton label="Text of the button" handlePressed={() => handleSubmit()} />
 * or <SrButton label='Text of the button' type='secondary' handlePressed={() => navigation.navigate('SignIn')} />
 *
 * @param {string} label - The text in itself
 * @param {enum} type - primary or secondary to change the color of the button
 * @param handlePressed - The click event that is launched in the parent component
 * @returns JSX.Element
 */
const SrText = ({ title, subtitle }) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={[styles.defaultAllText, styles.title]}>{title}</Text>
      <Text style={[styles.defaultAllText, styles.subtitle]}>{subtitle}</Text>
    </View>
  );
};

export default SrText;

const makeStyles = (colors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
    },
    defaultAllText: {
      justifyContent: 'left',
      alignItems: 'left',
      width: '100%',
      marginBottom: 8,
      marginTop: 8,
    },
    title: {
      fontSize: 24,
      color: colors.light,
      fontWeight: '600',
    },
    subtitle: {
      fontSize: 12,
      color: colors.superLightGrey,
      flexWrap: 'wrap',
      flex: 1,
    },
  });
