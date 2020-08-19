import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { fishData } from '../../data/fishdata';
import { Picker, StyleSheet, Text, View } from 'react-native';

const sortOptions = ['Value', 'Name', 'Catchable'];

export const AllFish = () => {
  const [sortBy, setSortBy] = useState('Name');
  console.log(fishData);
  return (
    <>
      <Picker
        selectedValue={sortBy}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setSortBy(itemValue)}
      >
        {sortOptions.map((option) => (
          <Picker.Item key={option} label={option} value={option} />
        ))}
      </Picker>
      {Object.keys(fishData).map((key) => (
        <Text key={key}>{fishData[key].name}</Text>
      ))}
    </>
  );
};
