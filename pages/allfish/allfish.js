import 'react-native-gesture-handler';
import React from 'react';
import { fishData } from '../../data/fishdata';
import { StyleSheet, Text, View } from 'react-native';

export const AllFish = () => {
  console.log(fishData);
  return (
    <>
      {Object.keys(fishData).map((key) =>
        <Text key={key }>{fishData[key].name}</Text>
      )}
    </>
  );
};
