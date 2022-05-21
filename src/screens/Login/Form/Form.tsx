import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
//redux
import {useDispatch} from 'react-redux';
import {userLogin} from '../../../store/loginSlice';
//
import AwesomeButton from 'react-native-really-awesome-button';
import Input from '../../../components/Input/Input';
import postRequest from '../../../services/postRequest';
import styles from './styles';
import COLORS from '../../../services/colors';

const LOGIN_URL = 'https://callbook-core.herokuapp.com/v1/auth/sign-in';

const Form: React.FC = ({navigation}) => {
  const [loginInput, setLoginInput] = useState(null);
  const [passwordInput, setPasswordInput] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();

  const loginTry = async (
    DATA: object,
    URL: string,
    buttonEndPoint: any,
  ): Promise<void> => {
    const result = await postRequest(DATA, URL);
    if (result.success === true) {
      setLoginSuccess(true);
      dispatch(userLogin(result.data)); //set data to Redux
      setTimeout(() => {
        console.log('loginSuccess', loginSuccess);
        navigation.navigate('Menu');
      }, 1200);
    }
    if (result.success === false) {
      setErrorMessage('Введены неверные данные');
      console.log(result.error);
    }
    buttonEndPoint();
  };

  useEffect(() => {
    setErrorMessage('');
  }, [loginInput, passwordInput]);

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
      <Text
        style={[
          styles.errorMessage,
          errorMessage ? {opacity: 1} : {opacity: 0},
        ]}>
        {errorMessage}
      </Text>
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
            if (loginInput && passwordInput) {
              await loginTry(
                {login: loginInput, password: passwordInput},
                LOGIN_URL,
                next, //button function for finish loading animation
              );
            } else {
              setErrorMessage('Введите логин и пароль');
              next();
            }
          }}>
          {loginSuccess ? 'Успех' : 'Войти'}
        </AwesomeButton>
      </View>
    </View>
  );
};

export default Form;
