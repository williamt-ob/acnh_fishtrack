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
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export const FishEntry = ({
  fishData,
  openAction,
  caught,
  actions,
  ...rest
}) => {
  return (
    <>
      <View style={styles.entryView}>
        <TouchableHighlight
          underlayColor="#1F1F1F1F"
          onPress={openAction}
          style={{ width: '100%' }}
        >
          <View style={{ padding: 10, flexDirection: 'row' }}>
            <Text>{fishData.name}</Text>
            <View style={{ flexDirection: 'row', marginLeft: 'auto' }}>
              <TouchableHighlight
                onPress={caught ? actions.uncaughtPress : actions.caughtPress}
              >
                <Ionicons
                  name={caught ? 'md-checkbox' : 'md-checkbox-outline'}
                  onPress={caught ? actions.uncaughtPress : actions.caughtPress}
                  size={32}
                  color="black"
                />
              </TouchableHighlight>
              <TouchableHighlight onPress={openAction}>
                <AntDesign name="questioncircle" size={32} color="black" />
              </TouchableHighlight>
            </View>
          </View>
        </TouchableHighlight>
      </View>
      <View
        style={{
          borderBottomColor: 'black',
          borderBottomWidth: 1,
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  entryView: {
    flexDirection: 'row',
  },
  fishAction: {},
});
