import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { Picker, Text } from 'react-native';
import { FishContext } from '../FishContext';

const hemOptions = ['North', 'South'];

export const Settings = () => {
  const { hemisphere, _updateHemisphere } = useContext(FishContext);

  return (
    <>
      <Text>Hemisphere</Text>
      <Picker
        selectedValue={hemisphere}
        prompt="Hemisphere"
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => _updateHemisphere(itemValue)}
      >
        {hemOptions.map((option) => (
          <Picker.Item
            key={option}
            label={option}
            value={option.toLowerCase()}
          />
        ))}
      </Picker>
    </>
  );
};
