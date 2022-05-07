import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ItemSection from './ItemSection';

const TableHeader = () => {
  return (
    <View style={styles.rowContainer}>
      {/* {values.map((element) => (
                <Item title={element} />
              ))} */}
      <ItemSection sectionData={'ID'} />
      <ItemSection sectionData={'Title'} />
      <ItemSection sectionData={'ReceivedCallsign'} />
      <ItemSection sectionData={'Band'} />
      <ItemSection sectionData={'Quality'} />
      <ItemSection sectionData={'ReceivedQuality'} />
      <ItemSection sectionData={'Modulation'} />
      <ItemSection sectionData={'ReceivedLocation'} />
      <ItemSection sectionData={'Description'} />
    </View>
  );
};

export default TableHeader;

const styles = StyleSheet.create({
  rowContainer: {
    backgroundColor: 'gray',
    borderWidth: 1,
    flexDirection: 'row',
  },
});
