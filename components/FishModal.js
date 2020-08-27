import 'react-native-gesture-handler';
import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  Button,
  Image,
} from 'react-native';
import { fishShadows } from '../common/fishshadows';

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
      <Text style={styles.fishHeader}>{`Location: ${fishData.location}`}</Text>
      <Text
        style={styles.fishHeader}
      >{`Shadow Size: ${fishData.shadowSize}`}</Text>
      <Text style={styles.fishHeader}>{`Catchable: ${fishData.stringTime}`}</Text>
      <Text
        style={styles.fishHeader}
      >{`Northern Hemisphere Dates: ${fishData.northDate}`}</Text>
      <Text
        style={styles.fishHeader}
      >{`Southern Hemisphere Dates: ${fishData.southDate}`}</Text>
      <Button title="Close" onPress={handleClose} />
      <Image
        resizeMode="contain"
        style={styles.shadowImg}
        source={fishShadows[fishData.shadowSize]}
      />
      {/* TODO: add an image of the fish location on a map */}
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
  shadowImg: { flex: 1, width: null, height: null },
});
