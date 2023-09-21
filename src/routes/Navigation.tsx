/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import SighIn from '../screens/SighIn';
import SignUP from '../screens/SignUP';
import ChatList from '../screens/ChatList';
import Chat from '../screens/Chat';

import SplashScreen from '../screens/SplashScreen';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {TransitionPresets} from '@react-navigation/stack';

const Stack = createStackNavigator();

const config: any = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

function Navigation(): JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="SplashScreen">
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="SignIn" component={SighIn} />
      <Stack.Screen name="SignUp" component={SignUP} />
      <Stack.Screen
        name="ChatList"
        component={ChatList}
        options={{
          headerShown: false,
          gestureEnabled: true,
          cardOverlayEnabled: true,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{
          headerShown: false,
          gestureEnabled: true,
          cardOverlayEnabled: true,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
    </Stack.Navigator>
  );
}

export default Navigation;
