import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Card = (props) => {
  const navigation = useNavigation();

  let provider = '';
  if (props.provider === 'uber') {
    provider = require('../../assets/uber.png');
  } else if (props.provider === 'bolt') {
    provider = require('../../assets/bolt.png');
  } else if (props.provider === 'heetch') {
    provider = require('../../assets/heetch.png');
  }
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.card}
      onPress={() => navigation.navigate('Map')}
    >
      <View style={styles.firstRow}>
        <Text style={styles.textFirstRow}>
          {props.timeToPickup} min - {props.distanceToPickup} m
        </Text>
        <View style={styles.clientNote}>
          <Ionicons name="star" color={colors.light} size={16} />
          <Text style={styles.textFirstRow}>{props.clientNote}</Text>
        </View>
        <View style={styles.markup}>
          <Ionicons name="flash" color={colors.light} size={16} />
          <Text style={styles.textFirstRow}>{props.markup}</Text>
        </View>
      </View>
      <View style={styles.secondRow}>
        <Text style={styles.textLeft}>{props.price}€ </Text>
        <Text style={styles.textLeft}>{props.duration} min</Text>
        <Image style={styles.cardLogo} source={provider} />
      </View>
      <View style={styles.thirdRow}>
        <View style={styles.textRow}>
          <Ionicons
            name="pin-outline"
            color={colors.light}
            size={24}
            style={{ paddingRight: 5 }}
          />
          <Text style={styles.textRight}>{props.pickupAddress}</Text>
        </View>
        <View style={styles.textRow}>
          <Ionicons
            name="flag-outline"
            color={colors.light}
            size={24}
            style={{ paddingRight: 5 }}
          />
          <Text style={styles.textRight}>{props.arrivalAddress}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const makeStyles = (colors) =>
  StyleSheet.create({
    card: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around',
      width: '90%',
      height: 180,
      backgroundColor: '#2B2D2E',
      borderColor: colors.lightGrey,
      borderStyle: 'solid',
      borderWidth: 1,
      padding: 10,
      borderRadius: 10,
      marginBottom: 10,
    },
    firstRow: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: 10,
    },
    secondRow: {
      flexDirection: 'row',
      height: '100%',
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    cardLogo: {
      width: 85,
      height: 71,
      marginTop: 10,
      borderRadius: 10,
    },
    textLeft: {
      color: colors.light,
      fontSize: 28,
      fontWeight: '900',
    },
    textRight: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      color: colors.light,
    },
    textFirstRow: {
      fontSize: 16,
      color: colors.light,
      padding: 5,
    },
    thirdRow: {
      width: '100%',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      paddingVertical: 20,
      flexWrap: 'wrap',
    },
    textRow: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'flex-start',
      alignContent: 'center',
      flexWrap: 'wrap',
    },
    clientNote: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    markup: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
