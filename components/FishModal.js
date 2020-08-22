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

export const FishModal = ({ fishData, open, handleClose,...rest }) => {
  return (
    <Modal style={styles.entryView} visible={open} onBack={handleClose}>
      <TouchableHighlight>
        <Text>{fishData.name}</Text>
      </TouchableHighlight>
      <Button title="Close" onPress={handleClose} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  entryView: {
    flexDirection: 'row',
  },
});
