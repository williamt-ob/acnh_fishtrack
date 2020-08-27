import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export const FishEntry = ({ fishData, openAction, caught, actions }) => {
  return (
    <>
      <View style={styles.entryView}>
        <TouchableHighlight
          underlayColor="#1F1F1F1F"
          onPress={openAction}
          style={{ width: '100%' }}
        >
          <View
            style={{
              padding: 10,
              flexDirection: 'row',
            }}
          >
            <Text style={styles.primary}>{fishData.name}</Text>
            <Text style={styles.secondary}>{`  -  ${fishData.location}`}</Text>
            <Text
              style={styles.secondary}
            >{`  -  ${fishData.shadowSize} Shadow`}</Text>
            <View
              style={{
                flexDirection: 'row',
                marginLeft: 'auto',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CheckBox
                title="Caught"
                checked={caught}
                onPress={caught ? actions.uncaughtPress : actions.caughtPress}
              />
              <MaterialCommunityIcons
                name="chevron-right"
                size={32}
                color="black"
                onPress={openAction}
              />
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
  secondary: { color: 'grey', fontSize: 10, textAlignVertical: 'center' },
  fishAction: {},
});
