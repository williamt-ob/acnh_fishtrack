import 'react-native-gesture-handler';
import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Button,
} from 'react-native';

//TODO: get the back button overwritten to run handleClose

export const FishModal = ({ fishData, open, handleClose, ...rest }) => {
  return (
    <Modal
      style={styles.entryView}
      onRequestClose={handleClose}
      visible={open}
      onBack={handleClose}
    >
      <Text style={styles.fishTitle}>{fishData.name}</Text>
      <Text style={styles.fishHeader}>{fishData.location}</Text>
      <Text
        style={styles.fishHeader}
      >{`${fishData.shadowSize} Shadow Size`}</Text>
      <Text style={styles.fishHeader}>{`Catchable: ${fishData.time}`}</Text>
      <Text
        style={styles.fishHeader}
      >{`Northern Hemisphere Dates: ${fishData.northDate}`}</Text>
      <Text
        style={styles.fishHeader}
      >{`Southern Hemisphere Dates: ${fishData.southDate}`}</Text>
      <Button title="Close" onPress={handleClose} />
      {/* TODO: add an image of the fish location on a map */}
      {/* TODO: add an image of the fish relative shadow size */}
    </Modal>
  );
};

//TODO: improve the styling of the title/headers, find good examples

const styles = StyleSheet.create({
  entryView: {
    flexDirection: 'row',
  },
  fishTitle: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  fishHeader: {
    fontSize: 16,
  },
});
