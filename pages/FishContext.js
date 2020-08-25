import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { fishData } from '../data/fishdata';
import { isCatchable } from '../common/catchablenow';

export const FishContext = React.createContext({});

export const FishContextProvider = (props) => {
  const [count, setCount] = useState(1);

  // Handful of state-based objects for computing fish progress
  const [caughtFish, setCaughtFish] = useState({});
  const [uncaughtFish, setUncaughtFish] = useState({});
  const [catchableTodayNotNow, setCatchableTodayNotNow] = useState({});
  const [catchableNow, setCatchableNow] = useState({});

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };
  const hemisphere = 'north';

  useEffect((state) => {
    const inner = async (state) => {
      try {
        const value = await AsyncStorage.getItem('caughtFish');
        if (value !== null) {
          setCaughtFish(JSON.parse(value));
        }

        // Dynamically make the uncaught list based off of this
        const uncaughtTmp = {};
        Object.keys(fishData).forEach((key) => {
          if (!(key in caughtFish)) {
            uncaughtTmp[key] = { ...fishData[key] }; //Copy just in-case
          }
        });
        setUncaughtFish(uncaughtTmp);

        // Filters based on date critieria to get a list of catchable
        // for today and right now
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
  }, []);

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
    catchableTodayNotNow,
    catchableNow,
    _caughtPress,
    _uncaughtPress,
  };

  return (
    <FishContext.Provider value={context}>
      {props.children}
    </FishContext.Provider>
  );
};