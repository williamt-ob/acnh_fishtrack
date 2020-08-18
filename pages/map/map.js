import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const uniqueAreas = [
  'River',
  'Pond',
  'River (Clifftop)',
  'River (mouth)',
  'Sea',
  'Pier',
  'Sea (rainy days)',
];

export const Map = () => {
  const [catchFilterStatus, setCatchFilterStatus] = useState('All');

  return <Text>Map Page</Text>;
};
