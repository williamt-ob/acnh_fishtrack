import 'react-native-gesture-handler';
import React, { useState, useContext } from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import { fishData } from '../../data/fishdata';
import { FishEntriesCard } from '../../components/FishEntriesCard';
import { FishContext } from '../FishContext';

//TODO: abstract the dynamic list stuff into its own hook,
// already retyping it too much

//TODO: make the modal component abstracted as well, maybe nest both

export const Feed = () => {
  //TODO: make the hemisphere dynamic/an option

  const {
    caughtFish,
    catchableTodayNotNow,
    catchableNow,
    _caughtPress,
    _entryPress,
  } = useContext(FishContext);

  // Object holding caught fish info
  // For setting sort type

  const [loading, setLoading] = useState(false);
  // For setting which data will be sent to modal, prevents using multiple modals

  const newCatchableNow = Object.keys(catchableNow).filter(
    (key) => !(key in caughtFish)
  ).length;
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
          <FishEntriesCard
            fishData={fishData}
            keys={Object.keys(catchableNow).filter(
              (key) => !(key in caughtFish)
            )}
            caughtCheck={(key) => key in caughtFish}
            openAction={(key) => _entryPress(key)}
            actions={(key) => {
              return {
                caughtPress: () => _caughtPress(key),
              };
            }}
          />
        </>
      )}
      {showNewCatchableLater && (
        <>
          <Text
            style={styles.header}
          >{`You can catch ${newCatchableLater} NEW fish later today!`}</Text>
          <FishEntriesCard
            fishData={fishData}
            keys={Object.keys(catchableTodayNotNow).filter(
              (key) => !(key in caughtFish)
            )}
            caughtCheck={(key) => key in caughtFish}
            openAction={(key) => _entryPress(key)}
            actions={(key) => {
              return {
                caughtPress: () => _caughtPress(key),
              };
            }}
          />
        </>
      )}
      {showNewCatchableNow && (
        <>
          <Text
            style={styles.header}
          >{`Best area to fish for the museum now!`}</Text>
          <ScrollView style={styles.bestAreaView}>
            {Object.keys(catchablePerArea).map((area) => (
              <Text
                key={area}
              >{`${catchablePerArea[area]} catchable in ${area}`}</Text>
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
