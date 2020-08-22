import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  Picker,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import { fishData } from '../../data/fishdata';
import { FishEntry } from '../../components/FishEntry';
import { FishModal } from '../../components/FishModal';
import AsyncStorage from '@react-native-community/async-storage';
// TODO: import CheckBox from '@react-native-community/react-native-checkbox';

const sortOptions = ['Value', 'Name'];

export const AllFish = () => {
  // Object holding caught fish info
  const [caughtFish, setCaughtFish] = useState({});
  // For setting sort type
  const [sortBy, setSortBy] = useState('Name');

  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  // For setting which data will be sent to modal, prevents using multiple modals
  const [selectedFishData, setSelectedFishData] = useState({});

  // Checkbox for setting what's catchable (will make checkbox)
  const [uncaughtOnly, setUncaughtOnly] = useState(false);

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

  const _caughtPress = async (value) => {
    setLoading(true);
    try {
      const newCaught = { ...caughtFish };
      newCaught[value] = {};
      const jsonValue = JSON.stringify(newCaught);
      await AsyncStorage.setItem('caughtFish', jsonValue);
      setCaughtFish(newCaught);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const _entryPress = async (key) => {
    setSelectedFishData(fishData[key]);
    setModalOpen(true);
  };

  const _handleFilters = (key) => {
    if (uncaughtOnly && key in caughtFish) {
      return false;
    }
    return true;
  };

  return (
    <>
      <View style={{ flexDirection: 'row' }}>
        <Picker
          selectedValue={sortBy}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) => setSortBy(itemValue)}
        >
          {sortOptions.map((option) => (
            <Picker.Item
              key={option}
              label={option}
              value={option.toLowerCase()}
            />
          ))}
        </Picker>
        {uncaughtOnly ? (
          <Button
            title="Only Uncaught"
            onPress={() => setUncaughtOnly(false)}
          />
        ) : (
          <Button title="All Fish" onPress={() => setUncaughtOnly(true)} />
        )}
      </View>

      <FishModal
        open={modalOpen}
        fishData={selectedFishData}
        handleClose={() => setModalOpen(false)}
      />

      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <ScrollView contentContainerStyle={styles.allFishScroll}>
            {Object.keys(fishData)
              .filter((key) => _handleFilters(key))
              .map((key) => (
                <FishEntry
                  fishData={fishData[key]}
                  key={key}
                  pressAction={() => _caughtPress(fishData[key].name)}
                  openAction={() => _entryPress(key)}
                ></FishEntry>
              ))}
          </ScrollView>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  allFishScroll: {
    //paddingVertical: 20,
  },
});
