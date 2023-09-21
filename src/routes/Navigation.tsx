/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SighIn from '../screens/SighIn';
import SignUP from '../screens/SignUP';
import ChatList from '../screens/ChatList';
import Chat from '../screens/Chat';

import SplashScreen from '../screens/SplashScreen';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

const Stack = createStackNavigator();

function Navigation(): JSX.Element {
  return (
    <NavigationContainer>
      <BottomSheetModalProvider>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="SignUP">
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="SignIn" component={SighIn} />
          <Stack.Screen name="SignUP" component={SignUP} />
          <Stack.Screen name="ChatList" component={ChatList} />
          <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
      </BottomSheetModalProvider>
    </NavigationContainer>
  );
}

export default Navigation;
