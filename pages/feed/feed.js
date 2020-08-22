import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { fishData } from '../../data/fishdata';
import { FishEntry } from '../../components/FishEntry';
import { FishModal } from '../../components/FishModal';
import AsyncStorage from '@react-native-community/async-storage';

export const Feed = () => {
  const newCatchableNow = 1; //TODO: make this dynamic
  const newCatchableLater = 1;

  const showNewCatchableNow = newCatchableNow > 0;
  const showNewCatchableLater = newCatchableLater > 0;

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
