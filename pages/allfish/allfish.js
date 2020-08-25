import 'react-native-gesture-handler';
import React, { useState, useEffect, useContext } from 'react';
import {
  ScrollView,
  Picker,
  StyleSheet,
  Text,
  View,
  //Button,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { fishData } from '../../data/fishdata';
import { FishEntry } from '../../components/FishEntry';
import { FishModal } from '../../components/FishModal';
import { FishContext } from '../FishContext';

// TODO: import CheckBox from '@react-native-community/react-native-checkbox';

const sortOptions = ['Value', 'Name'];

export const AllFish = () => {
  // Object holding caught fish info
  const {
    caughtFish,
    uncaughtFish,
    catchableTodayNotNow,
    catchableNow,
    _caughtPress,
    _uncaughtPress,
  } = useContext(FishContext);

  // For setting sort type
  const [sortBy, setSortBy] = useState('name');

  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  // For setting which data will be sent to modal, prevents using multiple modals
  const [selectedFishData, setSelectedFishData] = useState({});

  // Checkbox for setting what's catchable (will make checkbox)
  const [uncaughtOnly, setUncaughtOnly] = useState(false);
  // TOOD: make a dynamic icon button with up/down
  const [ascending, setAscending] = useState(true);


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
      <View style={styles.filterRow}>
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

        <Ionicons
          name={ascending ? 'md-arrow-round-up' : 'md-arrow-round-down'}
          onPress={() => setAscending(!ascending)}
          size={32}
          color="black"
        />
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
          {/* TODO: incorporate some way to sort ascending/descending, no one wants price ascending */}
          <ScrollView contentContainerStyle={styles.allFishScroll}>
            <Card containerStyle={{ padding: 0 }} style={{ flex: 1 }}>
              {Object.keys(fishData)
                .filter((key) => _handleFilters(key))
                .sort((a, b) => {
                  if (ascending) {
                    return fishData[a][sortBy] > fishData[b][sortBy];
                  } else {
                    return fishData[a][sortBy] < fishData[b][sortBy];
                  }
                })
                .map((key) => (
                  <FishEntry
                    fishData={fishData[key]}
                    key={key}
                    openAction={() => _entryPress(key)}
                    caught={key in caughtFish}
                    actions={{
                      caughtPress: () => _caughtPress(key),
                      uncaughtPress: () => _uncaughtPress(key),
                    }}
                  />
                ))}
            </Card>
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
  filterRow: {
    flexDirection: 'row',
  },
});
