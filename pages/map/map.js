import 'react-native-gesture-handler';
import React, { useState, useContext } from 'react';
import {
  Picker,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Overlay } from 'react-native-elements';
import { uniqueAreas } from '../../common/uniqueareas';
import { fishData } from '../../data/fishdata';
import { FishEntriesCard } from '../../components/FishEntriesCard';
import { fishMap } from '../../common/map';
import { FishContext } from '../FishContext';
import { Ionicons } from '@expo/vector-icons';

const catchFilterStatusOptions = ['All', 'Uncaught'];

export const Map = () => {
  const { caughtFish, catchableNow, _entryPress, _caughtPress } = useContext(
    FishContext
  );

  const [catchFilterStatus, setCatchFilterStatus] = useState('All');

  const [selectedRegionFish, setSelectedRegionFish] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');

  const [open, setOpen] = useState(false);

  const windowWidth = Dimensions.get('window').width;

  const ratio = windowWidth / 1280; //541 is actual image width

  const windowHeight = 720 * ratio;

  const imageOptions = {
    mapImg: {
      position: 'absolute',
      height: windowHeight,
      width: windowWidth,
      top: 0,
      left: 0,
    },
  };

  const regions = {
    riverMouthRegion: {
      minX: 0,
      minY: 0,
      maxX: windowWidth / 7,
      maxY: windowHeight,
      name: 'riverMouth',
      location: 'River (mouth)',
    },
    riverClifftopRegion: {
      minX: windowWidth / 7,
      minY: 0,
      maxX: windowWidth / 7 + (windowWidth / 7) * 3,
      maxY: windowHeight / 3,
      name: 'riverClifftop',
      location: 'River (Clifftop)',
    },
    pierRegion: {
      minX: (windowWidth / 7) * 1.5,
      minY: (windowHeight / 4) * 3,
      maxX: (windowWidth / 7) * 4,
      maxY: windowHeight,
      name: 'pierRegion',
      location: 'Pier',
    },
    pondRegion: {
      minX: windowWidth / 2,
      minY: (windowHeight / 6) * 1.5,
      maxX: (windowWidth / 7) * 5.5,
      maxY: (windowHeight / 6) * 3,
      name: 'pondRegion',
      location: 'Pond',
    },
    riverRegion: {
      minX: (windowWidth / 10) * 3.8,
      minY: (windowHeight / 5) * 2,
      maxX: (windowWidth / 10) * 6.2,
      maxY: (windowHeight / 5) * 4,
      name: 'riverRegion',
      location: 'River', //TODO: handle the river and pond cases
    },
    seaRainy: {
      minX: (windowWidth / 7) * 6,
      minY: 0,
      maxX: windowWidth,
      maxY: windowHeight / 2,
      name: 'seaRainyRegion',
      location: 'Sea (rainy days)',
    },
    seaRegion: {
      minX: (windowWidth / 7) * 6,
      minY: windowHeight / 2,
      maxX: windowWidth,
      maxY: windowHeight,
      name: 'seaRegion',
      location: 'Sea',
    },
  };

  const catchablePerArea = {};
  Object.keys(catchableNow).forEach((key) => {
    if (!(catchableNow[key].location in catchablePerArea)) {
      catchablePerArea[catchableNow[key].location] = [key];
    } else {
      catchablePerArea[catchableNow[key].location].push(key);
    }
  });
  uniqueAreas.forEach((location) => {
    if (!(location in catchablePerArea)) {
      catchablePerArea[location] = [];
    }
  });

  const imagePress = (e) => {
    const x = e.nativeEvent.locationX;
    const y = e.nativeEvent.locationY;

    const regionList = Object.keys(regions);

    regionList.forEach((region) => {
      if (
        x >= regions[region].minX &&
        x <= regions[region].maxX &&
        y >= regions[region].minY &&
        y <= regions[region].maxY
      ) {
        setSelectedRegionFish(catchablePerArea[regions[region].location]);
        setSelectedRegion(regions[region].location);
        setOpen(true);
      }
    });
  };

  return (
    <>
      <Overlay isVisible={open} onBackdropPress={() => setOpen(false)}>
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              alignItems: 'center',
            }}
          >
            <Ionicons
              onPress={() => setOpen(false)}
              style={{ padding: 10 }}
              name="md-arrow-back"
              size={24}
              color="black"
            />
            <Text
              style={{ fontSize: 18, fontWeight: 'bold' }}
            >{`Catchable Fish in ${selectedRegion}`}</Text>
          </View>

          <FishEntriesCard
            fishData={catchableNow}
            keys={selectedRegionFish}
            caughtCheck={(key) => key in caughtFish}
            openAction={(key) => _entryPress(key)}
            actions={(key) => {
              return {
                caughtPress: () => _caughtPress(key),
              };
            }}
          />
        </ScrollView>
      </Overlay>
      {/* <Picker
        selectedValue={catchFilterStatus}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) =>
          setCatchFilterStatus(itemValue)
        }
      >
        {catchFilterStatusOptions.map((option) => (
          <Picker.Item key={option} label={option} value={option} />
        ))}
      </Picker> */}
      <Text style={styles.header}>{`Catchable Fish in Each Area`}</Text>
      {Object.keys(catchablePerArea).map((area) => (
        <Text
          key={area}
        >{`${catchablePerArea[area].length} catchable in ${area}`}</Text>
      ))}
      <TouchableOpacity
        style={{
          marginTop: 0,
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          alignContent: 'flex-start',
          flexWrap: 'nowrap',
        }}
        activeOpacity={0.5}
        onPress={(e) => imagePress(e)}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            // height: 720, width: 1280,
            justifyContent: 'flex-start',
            alignContent: 'flex-start',
            alignItems: 'flex-start',
            flexWrap: 'nowrap',
          }}
        >
          <Image
            source={fishMap}
            resizeMode="stretch"
            style={imageOptions.mapImg}
          />
          {/* {Object.keys(regions).map((region) => (
            <View
              style={{
                postion: 'absolute',
                top: regions[region].minY,
                left: regions[region].minX,
                margin: 0,
                padding: 0,
                margin: 0,
                width: regions[region].maxX - regions[region].minX,
                height: regions[region].maxY - regions[region].minY,
                backgroundColor: 'red',
              }}
            >
              <Text>{region}</Text>
            </View>
          ))} */}
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  mapImg: {
    position: 'absolute',
    flex: 1,

    top: 0,
    left: 0,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
