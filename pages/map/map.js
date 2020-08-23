import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { Picker, StyleSheet, Text, View } from 'react-native';
import { uniqueAreas } from '../../common/uniqueareas';

const catchFilterStatusOptions = ['All', 'Uncaught'];

export const Map = () => {
  const [catchFilterStatus, setCatchFilterStatus] = useState('All');

  return (
    <Picker
      selectedValue={catchFilterStatus}
      style={{ height: 50, width: 150 }}
      onValueChange={(itemValue, itemIndex) => setCatchFilterStatus(itemValue)}
    >
      {catchFilterStatusOptions.map((option) => (
        <Picker.Item key={option} label={option} value={option} />
      ))}
    </Picker>
  );
};
