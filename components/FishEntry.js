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

export const FishEntry = ({ fishData, pressAction, ...rest }) => {
  return (
    <View style={styles.entryView}>
      <TouchableHighlight>
        <Text>{fishData.name}</Text>
      </TouchableHighlight>
      <Button title="Caught" onPress={pressAction} />
    </View>
  );
};

const styles = StyleSheet.create({
  entryView: {
    flexDirection: 'row',
  },
});
