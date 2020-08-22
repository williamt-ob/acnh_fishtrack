import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { fishData } from '../../data/fishdata';
import { Picker, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const sortOptions = ['Value', 'Name', 'Catchable'];

export const AllFish = () => {
  const [caughtFish, setCaughtFish] = useState({});
  const [sortBy, setSortBy] = useState('Name');
  const [loading, setLoading] = useState(false);

  useEffect((state) => {
    const inner = async (state) => {
      try {
        const value = await AsyncStorage.getItem('caughtFish');
        if (value !== null) {
          setCaughtFish(JSON.parse(value));
        }
      } catch (e) {
        console.log(e);
        // error reading value
      }
    };
    inner(state);
  }, []);

  const caughtPress = async (value) => {
    console.log('here');
    try {
      const newCaught = { ...caughtFish };
      newCaught[value] = {};
      const jsonValue = JSON.stringify(newCaught);
      await AsyncStorage.setItem('caughtFish', jsonValue);
      setCaughtFish(newCaught);
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

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
      {Object.keys(fishData)
        .filter((key) => !(key in caughtFish))
        .map((key) => (
          <Text onPress={() => caughtPress(fishData[key].name)} key={key}>
            {fishData[key].name}
          </Text>
        ))}
    </>
  );
};
