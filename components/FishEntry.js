import 'react-native-gesture-handler';
import React, { useState } from 'react';
import {
  Picker,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Button,
} from 'react-native';

export const FishEntry = ({
  fishData,
  openAction,
  caught,
  actions,
  ...rest
}) => {
  return (
    <View style={styles.entryView}>
      <TouchableHighlight onPress={openAction}>
        <Text>{fishData.name}</Text>
      </TouchableHighlight>
      {!caught ? (
        <Button title="Caught" onPress={actions.caughtPress} />
      ) : (
        <Button title="UnCaught" onPress={actions.uncaughtPress} />
      )}

      <Button title="?" onPress={openAction} />
    </View>
  );
};

const styles = StyleSheet.create({
  entryView: {
    flexDirection: 'row',
  },
});
