import 'react-native-gesture-handler';
import React, { useState, useContext } from 'react';
import {
  ScrollView,
  Picker,
  StyleSheet,
  Text,
  View,
  //Button,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { fishData } from '../../data/fishdata';
import { FishEntriesCard } from '../../components/FishEntriesCard';
import { FishContext } from '../FishContext';

// TODO: import CheckBox from '@react-native-community/react-native-checkbox';

const sortOptions = ['Name', 'Value'];

export const AllFish = () => {
  // Object holding caught fish info
  const { caughtFish, _caughtPress, _uncaughtPress, _entryPress } = useContext(
    FishContext
  );

  // For setting sort type
  const [sortBy, setSortBy] = useState('name');

  const [loading, setLoading] = useState(false);

  // Checkbox for setting what's catchable (will make checkbox)
  const [uncaughtOnly, setUncaughtOnly] = useState(false);
  // TOOD: make a dynamic icon button with up/down
  const [ascending, setAscending] = useState(true);

  const _handleFilters = (key) => {
    if (uncaughtOnly && key in caughtFish) {
      return false;
    }
    return true;
  };

  return (
    <>
      <ScrollView>
        <View style={styles.filterRow}>
          <Text style={{ fontWeight: 'bold' }}>Sort By</Text>
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
          <Ionicons
            name={ascending ? 'md-arrow-round-down' : 'md-arrow-round-up'}
            onPress={() => setAscending(!ascending)}
            size={32}
            color="black"
          />
          <CheckBox
            title="Uncaught Only"
            checked={uncaughtOnly}
            onPress={() => setUncaughtOnly(!uncaughtOnly)}
          />
        </View>

        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <>
            <FishEntriesCard
              fishData={fishData}
              keys={Object.keys(fishData)
                .filter((key) => _handleFilters(key))
                .sort((a, b) => {
                  if (ascending) {
                    return fishData[a][sortBy] > fishData[b][sortBy];
                  } else {
                    return fishData[a][sortBy] < fishData[b][sortBy];
                  }
                })}
              caughtCheck={(key) => key in caughtFish}
              openAction={(key) => _entryPress(key)}
              actions={(key) => {
                return {
                  caughtPress: () => _caughtPress(key),
                  uncaughtPress: () => _uncaughtPress(key),
                };
              }}
            />

            {/* TODO: incorporate some way to sort ascending/descending, no one wants price ascending */}
          </>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  allFishScroll: {
    //paddingVertical: 20,
  },
  primary: { fontSize: 16, textAlignVertical: 'center' },
  filterRow: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
