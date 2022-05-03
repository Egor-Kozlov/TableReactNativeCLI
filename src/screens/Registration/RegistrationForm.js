import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Input from '../../components/Input/Input';

const RegistrationForm = ({navigation}) => {
  return (
    <View>
      <Text>Registration</Text>
      <Input placeholder={'Ваш логин'} secureText={false} />
      <Input placeholder={'Пароль'} secureText={true} />
    </View>
  );
};

export default RegistrationForm;

const styles = StyleSheet.create({});
