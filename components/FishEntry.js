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

export const FishEntry = ({ fishData, pressAction, ...rest }) => {
  return (
    <TouchableHighlight onPress={pressAction}>
      <Text>{fishData.name}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  allFishScroll: {
    //paddingVertical: 20,
  },
});
