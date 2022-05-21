import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import RectangularBtn from '../../components/RectangularBtn/RectangularBtn';
import BottomWaveSVG from '../../../assets/pictures/bottom-wave.svg';
import {useSelector, useDispatch} from 'react-redux';
import {userLogout} from '../../store/loginSlice';
import partOfDay from '../../services/partOfDay';

const Menu = ({navigation}) => {
  const userName = useSelector(state => state.loginReducer.login);
  const dispatch = useDispatch();

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>
        {partOfDay()}, {userName}
      </Text>
      <View style={styles.buttonsContainer}>
        <Text style={styles.subtitle}>Меню</Text>
        <RectangularBtn
          text={'Таблица'}
          onClickFnc={() => navigation.navigate('Table')}
          margButton={10}
        />
        <RectangularBtn
          text={'Добавить пользователя'}
          onClickFnc={() => navigation.navigate('Table')}
          margButton={10}
        />
        <RectangularBtn
          text={'Выйти из аккаунта'}
          onClickFnc={() => {
            dispatch(userLogout()); //set data to Redux
            navigation.navigate('Login');
          }}
        />
      </View>
      <View style={styles.waveContainer}>
        <BottomWaveSVG
          height={100}
          width={Dimensions.get('screen').width}
          viewBox="0 0 1440 320"
          style={styles.BottomWaveSvg}
        />
      </View>
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: '#07122A',
  },
  subtitle: {
    fontSize: 25,
    fontWeight: '600',
    color: '#07122A',
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonsContainer: {
    paddingBottom: 40,
  },
  button: {
    marginBottom: 20,
  },
  waveContainer: {
    width: '100%',
    height: 15,
    backgroundColor: '#07122A',
  },
  BottomWaveSvg: {
    position: 'absolute',
    bottom: 10,
  },
});
