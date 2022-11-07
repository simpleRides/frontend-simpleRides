import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { addAddress } from '../../reducers/map';

const Card = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // fake driver ID pour l'instant à la place de l'id dynamique de l'user connecté
  const driver_id = 'Joe le taxi';

  const mapAddress = (address) => {
    dispatch(addAddress(address));
  };

  // affiche le bon logo
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
      onPress={() => {
        fetch(
          `https://providers-sooty.vercel.app/${props.provider}/ridesTaken`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              course_id: props.course_id,
              driver_id: driver_id,
            }),
          }
        );
        navigation.navigate('Map');
        mapAddress({
          pickupAddress: props.pickupAddress,
          arrivalAddress: props.arrivalAddress,
          pickupCoordinates: props.pickupCoordinates,
          arrivalCoordinates: props.arrivalCoordinates,
        });
      }}
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
      width: '95%',
      height: 200,
      backgroundColor: '#2B2D2E',
      borderColor: colors.lightGrey,
      borderStyle: 'solid',
      borderWidth: 1,
      padding: 10,
      borderRadius: 10,
      marginBottom: 10,
      paddingTop: 24,
    },
    firstRow: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      // paddingTop: 10,
      // borderWidth: 5
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
      color: colors.light,
      paddingTop: 4,
      fontSize: 13,
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
