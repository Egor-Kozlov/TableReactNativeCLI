import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Login,
  Menu,
  Table,
  RegistrationForm,
  RegistrationWelcome,
  screensNames,
} from './screensList';

const Stack = createNativeStackNavigator();
const options = {
  headerShown: false,
};

function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={screensNames.Login}
        screenOptions={options}>
        <Stack.Screen name={screensNames.Login} component={Login} />
        <Stack.Screen name={screensNames.Menu} component={Menu} />
        <Stack.Screen
          name={screensNames.Table}
          component={Table}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name={screensNames.RegistrationWelcome}
          component={RegistrationWelcome}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;
