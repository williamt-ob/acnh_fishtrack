import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { fishData } from '../data/fishdata';
import { isCatchable } from '../common/catchablenow';
import { FishModal } from '../components/FishModal';

export const FishContext = React.createContext({});

export const FishContextProvider = (props) => {
  const [count, setCount] = useState(1);

  const [hemisphere, setHemisphere] = useState('south');

  const [loading, setLoading] = useState(false);

  // Handful of state-based objects for computing fish progress
  const [caughtFish, setCaughtFish] = useState({});
  const [uncaughtFish, setUncaughtFish] = useState({});
  const [catchableTodayNotNow, setCatchableTodayNotNow] = useState({});
  const [catchableNow, setCatchableNow] = useState({});

  // For the Fish Modal
  const [selectedFishData, setSelectedFishData] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  useEffect(
    (state) => {
      const inner = async (state) => {
        try {
          const catchableTodayNotNowTmp = {};
          const catchableNowTmp = {};
          Object.keys(fishData).forEach((key) => {
            const catchable = isCatchable(fishData[key], hemisphere);
            if (catchable.catchableNow) {
              catchableNowTmp[key] = { ...fishData[key] }; //Copy just in-case
            } else if (catchable.catchableToday) {
              catchableTodayNotNowTmp[key] = { ...fishData[key] }; //Copy just in-case
            }
          });
          setCatchableTodayNotNow(catchableTodayNotNowTmp);
          setCatchableNow(catchableNowTmp);
        } catch (e) {
          console.log(e);
          // error reading value
        } finally {
          // setLoading(false);
        }
      };
      inner(state);
    },
    [fishData, hemisphere]
  );

  useEffect((state) => {
    setLoading(true);
    const inner = async (state) => {
      try {
        const value = await AsyncStorage.getItem('caughtFish');
        if (value !== null) {
          setCaughtFish(JSON.parse(value));
        }
        const hem = await AsyncStorage.getItem('hemisphere');
        if (hem !== null) {
          setHemisphere(hem);
        }


      } catch (e) {
        console.log(e);
        // error reading value
      } finally {
        // setLoading(false);
        // Filters based on date critieria to get a list of catchable
        // for today and right now
        // Dynamically make the uncaught list based off of this
        const uncaughtTmp = {};
        Object.keys(fishData).forEach((key) => {
          if (!(key in caughtFish)) {
            uncaughtTmp[key] = { ...fishData[key] }; //Copy just in-case
          }
        });
        setUncaughtFish(uncaughtTmp);
        const catchableTodayNotNowTmp = {};
        const catchableNowTmp = {};
        Object.keys(fishData).forEach((key) => {
          const catchable = isCatchable(fishData[key], hemisphere);
          if (catchable.catchableNow) {
            catchableNowTmp[key] = { ...fishData[key] }; //Copy just in-case
          } else if (catchable.catchableToday) {
            catchableTodayNotNowTmp[key] = { ...fishData[key] }; //Copy just in-case
          }
        });
        setCatchableTodayNotNow(catchableTodayNotNowTmp);
        setCatchableNow(catchableNowTmp);
      }
    };
    inner(state);
    setLoading(false);
  }, []);

  const _entryPress = async (key) => {
    setSelectedFishData(fishData[key]);
    setModalOpen(true);
  };

  const _caughtPress = async (value) => {
    // setLoading(true);
    try {
      const newCaught = { ...caughtFish };
      newCaught[value] = {};
      const jsonValue = JSON.stringify(newCaught);
      await AsyncStorage.setItem('caughtFish', jsonValue);
      setCaughtFish(newCaught);
    } catch (e) {
      console.log(e);
    } finally {
      // setLoading(false);
    }
  };

  const _updateHemisphere = async (value) => {
    // setLoading(true);
    try {
      await AsyncStorage.setItem('hemisphere', value);
      setHemisphere(value);
    } catch (e) {
      console.log(e);
    } finally {
      // setLoading(false);
    }
  };

  const _wipeCatchable = async () => {
    const value = {};
    // setLoading(true);
    try {
      await AsyncStorage.setItem('caughtFish', JSON.stringify(value));
      setCaughtFish(value);
    } catch (e) {
      console.log(e);
    } finally {
      // setLoading(false);
    }
  };

  const _uncaughtPress = async (value) => {
    // setLoading(true);
    try {
      const newCaught = { ...caughtFish };
      delete newCaught[value];
      const jsonValue = JSON.stringify(newCaught);
      await AsyncStorage.setItem('caughtFish', jsonValue);
      setCaughtFish(newCaught);
    } catch (e) {
      console.log(e);
    } finally {
      // setLoading(false);
    }
  };

  const context = {
    caughtFish,
    uncaughtFish,
    hemisphere,
    catchableTodayNotNow,
    catchableNow,
    loading,
    _caughtPress,
    _wipeCatchable,
    _uncaughtPress,
    _entryPress,
    _updateHemisphere,
  };

  return (
    <FishContext.Provider value={context}>
      {props.children}
      <FishModal
        open={modalOpen}
        fishData={selectedFishData}
        handleClose={() => setModalOpen(false)}
      />
    </FishContext.Provider>
  );
};
