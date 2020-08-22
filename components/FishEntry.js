import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { Picker, StyleSheet, Text, View } from 'react-native';


export const FishEntry = ({fishData, ...rest}) => {
  return (
    <Text>{fishData.name}</Text>
  );
};
