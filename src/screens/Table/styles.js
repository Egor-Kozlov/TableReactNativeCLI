import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  tableContainer: {
    flexDirection: 'row',
  },
  rowContainer: {
    flexDirection: 'row',
  },
  tableContent: {
    paddingBottom: 150,
    paddingTop: 0,
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
  firstColumn: {
    width: 100,
  },
  firstLoadingIndicator: {
    paddingTop: 20,
  },
  idSection: {
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderRightWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
  },
});
