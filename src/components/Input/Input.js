import React, {useState, useEffect, useRef, useCallback} from 'react';
import {View, TextInput, Animated, Pressable} from 'react-native';
import HideIconSVG from '../../../assets/pictures/hide-icon.svg';
import styles from './styles';

const Input = ({placeholder, secureText, state, setState}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isHideSecureText, setIsHideSecureText] = useState(true);
  const inputAnim = useRef(new Animated.Value(0)).current;

  const inputActiveAnim = useCallback(() => {
    Animated.timing(inputAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, [inputAnim]);

  const inputInactiveAnim = useCallback(() => {
    Animated.timing(inputAnim, {
      toValue: state ? 1 : 0,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, [inputAnim, state]);

  useEffect(() => {
    if (isFocused) {
      inputActiveAnim();
    } else {
      inputInactiveAnim();
    }
  }, [isFocused, inputActiveAnim, inputInactiveAnim]);

  return (
    <View style={styles.inputContainer}>
      <Animated.Text
        style={[
          styles.placeholder,
          {
            top: inputAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [10, -10],
            }),
          },
          {
            fontSize: inputAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [19, 13],
            }),
          },
          {
            color: inputAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['#aaa', '#000'],
            }),
          },
        ]}>
        {placeholder}
      </Animated.Text>
      <TextInput
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={styles.input}
        secureTextEntry={secureText && isHideSecureText}
        // onEndEditing={(text) => setInputValue(text)}
        value={state}
        onChangeText={text => setState(text)}
      />
      {secureText ? (
        <Pressable
          onPressIn={() => setIsHideSecureText(false)}
          onPressOut={() => setIsHideSecureText(true)}
          hitSlop={{bottom: 10, left: 5, right: 10, top: 10}}
          style={styles.hideIconContainer}>
          <HideIconSVG width={60} />
        </Pressable>
      ) : null}
    </View>
  );
};

export default React.memo(Input);
