import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ItemSection from './ItemSection';

const TableItem = ({item}) => {
  return (
    <View style={styles.rowContainer}>
      {/* {values.map((element) => (
            <Item title={element} />
          ))} */}
      <ItemSection sectionData={item?.id} />
      <ItemSection sectionData={item?.title} />
      <ItemSection sectionData={item?.receivedCallsign} />
      <ItemSection sectionData={item?.band} />
      <ItemSection sectionData={item?.quality} />
      <ItemSection sectionData={item?.receivedQuality} />
      <ItemSection sectionData={item?.modulation} />
      <ItemSection sectionData={item?.receivedLocation} />
      <ItemSection sectionData={item?.description} />
    </View>
  );
};

export default TableItem;

const styles = StyleSheet.create({
  rowContainer: {
    borderWidth: 1,
    flexDirection: 'row',
  },
});
