import React, {useEffect} from 'react';
import {Alert, ImageBackground, View} from 'react-native';
import SPLASH_SCREEN_IMAGE from '../assets/background/background.jpg';
import AsyncStorage from '@react-native-async-storage/async-storage';

type screen = {navigation: any};

export default function SplashScreen({navigation}: screen): JSX.Element {
  const getUserCredentials = async () => {
    const userCredential = await AsyncStorage.getItem('user');
    Alert.alert(String(userCredential));
    if (userCredential) {
      navigation.navigate('ChatList');
    } else {
      navigation.navigate('SignIn');
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
