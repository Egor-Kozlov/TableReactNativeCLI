import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
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
import styles from './styles';

const Login: React.FC<any> = ({navigation}) => {
  const [iskKeyboardActive, setIskKeyboardActive] = useState<boolean>(false);
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

export default Login;
