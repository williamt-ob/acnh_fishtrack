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

export const FishModal = ({ fishData, open, handleClose,...rest }) => {
  return (
    <Modal style={styles.entryView} visible={open}>
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
