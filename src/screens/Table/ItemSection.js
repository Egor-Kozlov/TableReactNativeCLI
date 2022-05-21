import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ItemSection = ({sectionData}) => {
  return (
    <View style={[styles.item]}>
      <Text style={styles.title}>{sectionData}</Text>
    </View>
  );
};

export default React.memo(ItemSection);

const styles = StyleSheet.create({
  item: {
    width: 200,
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderTopWidth: 0,
    // borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
