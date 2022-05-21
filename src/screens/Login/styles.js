import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    height: '100%',
    backgroundColor: '#F8F8F8',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  headerContainer: {
    marginBottom: '20%',
  },
  title: {
    marginLeft: '10%',
    marginBottom: '2%',
    fontSize: 32,
    fontWeight: '800',
    color: '#07122A',
  },
  subtitle: {
    marginLeft: '10%',
    fontSize: 22,
    fontWeight: '400',
    color: '#4F4F4F',
  },
  formContainer: {
    marginTop: '20%',
  },
  waveContainer: {
    width: '100%',
    height: 15,
    backgroundColor: '#07122A',
  },
  waveSvg: {
    position: 'absolute',
    bottom: 10,
  },
});
