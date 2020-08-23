import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { fishData } from '../../data/fishdata';
import { FishEntry } from '../../components/FishEntry';
import { FishModal } from '../../components/FishModal';
import { isCatchable } from '../../common/catchablenow';
import AsyncStorage from '@react-native-community/async-storage';

//TODO: abstract the dynamic list stuff into its own hook,
// already resuing it too much

//TODO: make the modal component abstracted as well, maybe nest both

export const Feed = () => {
  //TODO: make the hemisphere dynamic/an option
  const hemisphere = 'north';

  // Object holding caught fish info
  const [caughtFish, setCaughtFish] = useState({});
  // For setting sort type

  const [uncaughtFish, setUncaughtFish] = useState({});

  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  // For setting which data will be sent to modal, prevents using multiple modals
  const [selectedFishData, setSelectedFishData] = useState({});

  const [catchableTodayNotNow, setCatchableTodayNotNow] = useState({});

  const [catchableNow, setCatchableNow] = useState({});

  useEffect((state) => {
    const inner = async (state) => {
      try {
        const value = await AsyncStorage.getItem('caughtFish');
        if (value !== null) {
          setCaughtFish(JSON.parse(value));
        }

        // Dynamically make the uncaught list based off of this
        const uncaughtTmp = {};
        Object.keys(fishData).forEach((key) => {
          if (!(key in caughtFish)) {
            uncaughtTmp[key] = { ...fishData[key] }; //Copy just in-case
          }
        });
        setUncaughtFish(uncaughtTmp);

        // Filters based on date critieria to get a list of catchable
        // for today and right now
        const catchableTodayNotNowTmp = {};
        const catchableNowTmp = {};
        Object.keys(fishData).forEach((key) => {
          const catchable = isCatchable(fishData[key], hemisphere);
          if (catchable.catchableNow) {
            catchableNowTmp[key] = { ...fishData[key] }; //Copy just in-case
          } else if (catchable.catchableToday) {
            catchableTodayNotNowTmp[key] = { ...fishData[key] }; //Copy just in-case
          }
        });
        setCatchableTodayNotNow(catchableTodayNotNowTmp);
        setCatchableNow(catchableNowTmp);
      } catch (e) {
        console.log(e);
        // error reading value
      } finally {
        setLoading(false);
      }
    };
    inner(state);
  }, []);

  const newCatchableNow = 1; //TODO: make this dynamic
  const newCatchableLater = 1;

  const showNewCatchableNow = newCatchableNow > 0;
  const showNewCatchableLater = newCatchableLater > 0;

  console.log(`CatchableNow ${JSON.stringify(catchableNow)}`);
  console.log(`CatchableTodayNotNow ${JSON.stringify(catchableTodayNotNow)}`);

  return (
    <ScrollView>
      {showNewCatchableNow && (
        <>
          <Text
            style={styles.header}
          >{`You can catch ${newCatchableNow} NEW fish right now!`}</Text>
          <ScrollView style={styles.catchableNowView}>
            <Text>TODO: fill this in</Text>
          </ScrollView>
        </>
      )}
      {showNewCatchableLater && (
        <>
          <Text
            style={styles.header}
          >{`You can catch ${newCatchableLater} NEW fish later today now!`}</Text>
          <ScrollView style={styles.catchableNowView}>
            <Text>TODO: fill this in</Text>
          </ScrollView>
        </>
      )}
      {showNewCatchableNow && (
        <>
          <Text
            style={styles.header}
          >{`Best area to fish for the museum now!`}</Text>
          <ScrollView style={styles.bestAreaView}>
            <Text>TODO: fill this in</Text>
          </ScrollView>
        </>
      )}
      <>
        <Text style={styles.header}>{`Best area to fish for money now!`}</Text>
        <ScrollView style={styles.bestAreaView}>
          <Text>TODO: fill this in</Text>
        </ScrollView>
      </>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  catchableNowView: {
    flexDirection: 'row',
  },
  bestAreaView: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  header: {
    fontSize: 24,
  },
});
