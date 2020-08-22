import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { ScrollView, Picker, StyleSheet, Text, View } from 'react-native';
import { fishData } from '../../data/fishdata';
import { FishEntry } from '../../components/FishEntry';
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
      <ScrollView contentContainerStyle={styles.allFishScroll}>
        {Object.keys(fishData)
          .filter((key) => !(key in caughtFish))
          .map((key) => (
            <FishEntry
              fishData={fishData[key]}
              key={key}
              onPress={() => caughtPress(fishData[key].name)}
            ></FishEntry>
          ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  allFishScroll: {
    //paddingVertical: 20,
  },
});
