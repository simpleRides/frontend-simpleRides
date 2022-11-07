import { View, Text, TextInput, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useTheme } from '@react-navigation/native';

const SrInput = ({ placeholder, label, isPassword = false, onChange }) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const [field, setField] = useState('');
  const [focus, setFocus] = useState(false);

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{label}</Text>

      {/* focus pour gérer liseré orange */}
      <TextInput
        autoCapitalize="none"
        placeholder={String(placeholder)}
        placeholderTextColor={colors.lightGrey}
        secureTextEntry={isPassword}
        style={[
          styles.inputText,
          focus ? styles.inputOnFocus : styles.inputOnBlur,
        ]}
        value={field}
        onBlur={() => setFocus(false)}
        onChange={(e) => (onChange ? onChange(e.nativeEvent.text) : null)}
        onChangeText={setField}
        onFocus={() => setFocus(true)}
      />
    </View>
  );
};

export default SrInput;

const makeStyles = (colors) =>
  StyleSheet.create({
    formControl: {
      width: '100%',
      marginBottom: 8,
    },
    label: {
      color: colors.light,
    },
    inputText: {
      width: '100%',
      height: 48,
      marginTop: 10,
      backgroundColor: colors.black,
      borderColor: colors.lightGrey,
      borderStyle: 'solid',
      borderWidth: 1,
      color: colors.light,
      fontSize: 16,
      borderRadius: 10,
      marginBottom: 10,
      paddingLeft: 8,
    },
    inputOnFocus: { borderColor: colors.primary },
    inputOnBlur: { borderColor: colors.lightGrey },
  });
