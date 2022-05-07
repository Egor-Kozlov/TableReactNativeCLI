import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  rowContainer: {
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
  },
  tableContent: {
    paddingLeft: 20,
    paddingBottom: 150,
    paddingTop: 0,
  },
  headerScroll: {
    paddingLeft: 20,
  },
  loaderContainer: {
    position: 'absolute',
    bottom: 60,
    left: 185,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 85,
    borderRadius: 80,
  },
  textAddButton: {
    color: 'white',
    fontSize: 40,
  },
});
