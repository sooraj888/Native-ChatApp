import React, {useEffect} from 'react';
import {Alert, ImageBackground, View} from 'react-native';
import SPLASH_SCREEN_IMAGE from '../assets/background/background.jpg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignIn from './SighIn';
import {callLoginApi} from '../api/userApi';
import {CommonActions} from '@react-navigation/native';

type screen = {navigation: any};

export default function SplashScreen({navigation}: screen): JSX.Element {
  const getUserCredentials = async () => {
    const userCredential: string | null = await AsyncStorage.getItem('user');
    const user = JSON.parse(String(userCredential));
    if (user) {
      // call login api
      const {isLoggedIn}: any = await callLoginApi(user?.email, user.password);
      setTimeout(() => {
        if (isLoggedIn) {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'ChatList'}],
            }),
          );
        } else {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'SignIn'}],
            }),
          );
        }
      }, 2000);
    } else {
      // open sign-in page

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'SignIn'}],
        }),
      );
    }
  };

  useEffect(() => {
    getUserCredentials();
  }, []);

  return (
    <ImageBackground
      source={SPLASH_SCREEN_IMAGE}
      style={{flex: 1}}></ImageBackground>
  );
}
