import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { fishData } from '../../data/fishdata';
import { FishEntry } from '../../components/FishEntry';
import { FishModal } from '../../components/FishModal';
import { isCatchable } from '../../common/catchablenow';
import { uniqueAreas } from '../../common/uniqueareas';

//TODO: abstract the dynamic list stuff into its own hook,
// already retyping it too much

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



  const newCatchableNow = Object.keys(catchableNow).length; //TODO: make this dynamic
  const newCatchableLater = Object.keys(catchableTodayNotNow).length;

  const showNewCatchableNow = newCatchableNow > 0;
  const showNewCatchableLater = newCatchableLater > 0;

  const catchablePerArea = {};
  Object.keys(catchableNow).forEach((key) => {
    if (!(catchableNow[key].location in catchablePerArea)) {
      catchablePerArea[catchableNow[key].location] = 1;
    } else {
      catchablePerArea[catchableNow[key].location] += 1;
    }
  });

  return (
    <ScrollView>
      {showNewCatchableNow && (
        <>
          <Text
            style={styles.header}
          >{`You can catch ${newCatchableNow} NEW fish right now!`}</Text>
          <ScrollView style={styles.catchableNowView}>
            {Object.keys(catchableNow)
              .filter((key) => !(key in caughtFish))
              .map((key) => (
                <FishEntry
                  fishData={catchableNow[key]}
                  key={key}
                  openAction={() => _entryPress(key)}
                  caught={key in caughtFish}
                  actions={{
                    caughtPress: () => _caughtPress(key),
                    //uncaughtPress: () => _uncaughtPress(key),
                  }}
                />
              ))}
          </ScrollView>
        </>
      )}
      {showNewCatchableLater && (
        <>
          <Text
            style={styles.header}
          >{`You can catch ${newCatchableLater} NEW fish later today now!`}</Text>
          <ScrollView style={styles.catchableNowView}>
            <ScrollView style={styles.catchableNowView}>
              {Object.keys(catchableTodayNotNow)
                .filter((key) => !(key in caughtFish))
                .map((key) => (
                  <Text key={key}>{catchableTodayNotNow[key].name}</Text>
                ))}
            </ScrollView>
          </ScrollView>
        </>
      )}
      {showNewCatchableNow && (
        <>
          <Text
            style={styles.header}
          >{`Best area to fish for the museum now!`}</Text>
          <ScrollView style={styles.bestAreaView}>
            {Object.keys(catchablePerArea).map((area) => (
              <Text key={area}>{`${catchablePerArea[area]} catchable in ${area}`}</Text>
            ))}
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
