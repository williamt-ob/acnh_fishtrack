import 'react-native-gesture-handler';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export const FishEntry = ({
  fishData,
  openAction,
  caught,
  actions,
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
            <Text style={styles.primary}>{fishData.name}</Text>
            <Text style={styles.secondary}>{`  -  ${fishData.location}`}</Text>
            <Text style={styles.secondary}>{`  -  ${fishData.shadowSize} Shadow`}</Text>
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
  primary: { fontSize: 16, textAlignVertical: 'center' },
  secondary: { color: 'grey', fontSize: 12, textAlignVertical: 'center' },
  fishAction: {},
});
