import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { View } from 'react-native';

/**
 * Text component include a title & a subtitle
 *
 * @param {string} title - The first text
 * @param {enum} subtitle - The second text
 * @returns JSX.Element
 */
const SrText = ({ title, subtitle }) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <>
      <View style={styles.container}>
        <Text style={[styles.defaultAllText, styles.title]}>{title}</Text>
      </View>
      <View style={styles.container}>
        <Text style={[styles.defaultAllText, styles.subtitle]}>{subtitle}</Text>
      </View>
    </>
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
      marginBottom: 16,
    },
  });
