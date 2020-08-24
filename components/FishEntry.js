import 'react-native-gesture-handler';
import React, { useState } from 'react';
import {
  Picker,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Button,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export const FishEntry = ({
  fishData,
  openAction,
  caught,
  actions,
  ...rest
}) => {
  return (
    <View style={styles.entryView}>
      <TouchableHighlight onPress={openAction}>
        <Text>{fishData.name}</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={caught ? actions.uncaughtPress : actions.caughtPress}
      >
        <Ionicons
          name={caught ? 'md-checkbox' : 'md-checkbox-outline'}
          onPress={caught ? actions.uncaughtPress : actions.caughtPress}
          size={32}
          color="black"
        />
      </TouchableHighlight>
      <TouchableHighlight onPress={openAction}>
        <AntDesign name="questioncircle" size={24} color="black" />
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  entryView: {
    flexDirection: 'row',
  },
  fishAction: {},
});
