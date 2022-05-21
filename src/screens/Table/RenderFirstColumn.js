import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const RenderFirstColumn = ({item}) => {
  return (
    <View style={styles.item}>
      <Text>{item.id}</Text>
    </View>
  );
};

export default RenderFirstColumn;

const styles = StyleSheet.create({
  item: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 5,
    // borderWidth: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderRightWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
