import 'react-native-gesture-handler';
import React from 'react';
import { Card } from 'react-native-elements';
import { FishEntry } from './FishEntry';

export const FishEntriesCard = ({
  fishData,
  keys,
  caughtCheck,
  openAction,
  actions,
  ...rest
}) => {
  console.log(keys);
  return (
    <Card containerStyle={{ padding: 0 }} style={{ flex: 1 }}>
      {keys.map((key) => (
        <FishEntry
          fishData={fishData[key]}
          key={key}
          openAction={() => openAction(key)}
          caught={caughtCheck(key)}
          actions={actions(key)}
        />
      ))}
    </Card>
  );
};
