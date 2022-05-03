import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WelcomeSVG from '../../../assets/pictures/welcome-person.svg';
import COLORS from '../../services/colors';
import RectangularBtn from '../../components/RectangularBtn/RectangularBtn';

const RegistrationWelcome = ({navigation}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.personSVGContainer}>
        <WelcomeSVG width={'100%'} />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Привет, Егор!</Text>
        <Text style={styles.title}>Твой аккаунт успешно зарегистрирован</Text>
      </View>
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>
          В будущем ты можешь редактировать свой аккаунт в настройках
        </Text>
      </View>
      <RectangularBtn
        text={'Завершить регистрацию!'}
        onClickFnc={() =>
          setTimeout(() => {
            navigation.navigate('Menu');
          }, 400)
        }
      />
    </View>
  );
};

export default RegistrationWelcome;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingTop: 50,
  },
  personSVGContainer: {
    width: 310,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    color: COLORS.darkBlue,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitleContainer: {
    justifyContent: 'center',
    marginBottom: 32,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '400',
  },
});
