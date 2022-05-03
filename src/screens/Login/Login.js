import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  Pressable,
  Keyboard,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import Form from './Form/Form';
import BottomWaveSVG from '../../../assets/pictures/bottom-wave.svg';

const Login = ({navigation}) => {
  const [iskKeyboardActive, setIskKeyboardActive] = useState(undefined);
  const inputAnim = useRef(new Animated.Value(0)).current;

  const inputActiveAnim = useCallback(() => {
    Animated.timing(inputAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
      easing: Easing.out(Easing.exp),
    }).start();
  }, [inputAnim]);

  const inputInactiveAnim = useCallback(() => {
    Animated.timing(inputAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
      easing: Easing.bounce,
    }).start();
  }, [inputAnim]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setIskKeyboardActive(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setIskKeyboardActive(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    if (iskKeyboardActive) {
      inputActiveAnim();
    } else {
      inputInactiveAnim();
    }
  }, [iskKeyboardActive, inputActiveAnim, inputInactiveAnim]);

  return (
    <SafeAreaView>
      <Pressable
        style={styles.mainContainer}
        onPressIn={() => Keyboard.dismiss()}>
        <View>
          <Animated.View
            style={{
              marginTop: inputAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['20%', '4%'],
              }),
            }}>
            <View style={styles.headerContainer}>
              <Text style={styles.title}>Добро пожаловать!</Text>
              <Text style={styles.subtitle}>
                Введите данные вашего аккаунта
              </Text>
            </View>
            <Form navigation={navigation} />
          </Animated.View>
        </View>
        <View style={styles.waveContainer}>
          <BottomWaveSVG
            height={100}
            width={Dimensions.get('screen').width}
            viewBox="0 0 1440 320"
            style={styles.waveSvg}
          />
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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

export default Login;
