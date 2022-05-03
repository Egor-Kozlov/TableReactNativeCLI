import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
//redux
import {useSelector, useDispatch} from 'react-redux';
import {userLogin} from '../../../store/loginSlice';
//
import AwesomeButton from 'react-native-really-awesome-button';
import Input from '../../../components/Input/Input';
import postRequest from '../../../services/postRequest';
import styles from './styles';
import COLORS from '../../../services/colors';

const LOGIN_URL = 'https://callbook-core.herokuapp.com/v1/auth/sign-in';

const Form = ({navigation}) => {
  const [loginInput, setLoginInput] = useState(null);
  const [passwordInput, setPasswordInput] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const dispatch = useDispatch();
  // console.log(useSelector(state => state.loginReducer));

  const loginRequest = async (inputsData, URL) => {
    const result = await postRequest(inputsData, URL);
    if (result) {
      setLoginSuccess(true);
      dispatch(userLogin(result)); //set data to Redux
    }
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder={'Ваш логин'}
        secureText={false}
        state={loginInput}
        setState={setLoginInput}
      />
      <Input
        placeholder={'Пароль'}
        secureText={true}
        state={passwordInput}
        setState={setPasswordInput}
      />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('RegistrationWelcome')}>
          <Text>Регистрация</Text>
        </TouchableOpacity>
        <AwesomeButton
          style={styles.loginButton}
          width={82}
          height={83}
          borderRadius={82}
          backgroundColor={loginSuccess ? COLORS.green : COLORS.blue}
          backgroundProgress={loginSuccess ? COLORS.green : COLORS.orange}
          backgroundDarker={'#072947'}
          progress={true}
          progressLoadingTime={3000}
          onPress={async next => {
            await loginRequest(
              {login: loginInput, password: passwordInput},
              LOGIN_URL,
            );
            next();
            if (loginSuccess) {
              setTimeout(() => {
                console.log('loginSuccess', loginSuccess);
                navigation.navigate('Menu');
              }, 1200);
            }
            // setTimeout(() => {
            //   console.log('loginSuccess', loginSuccess);
            //   navigation.navigate('Menu');
            // }, 1200);
          }}>
          {loginSuccess ? 'Успех' : 'Войти'}
        </AwesomeButton>
      </View>
    </View>
  );
};

export default Form;
