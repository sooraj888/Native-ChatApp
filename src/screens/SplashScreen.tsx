import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import SPLASH_SCREEN_IMAGE from '../assets/background/background.jpg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignIn from './SighIn';
import {callLoginApi} from '../api/userApi';
import {CommonActions} from '@react-navigation/native';

type screen = {navigation: any};

export default function SplashScreen({navigation}: screen): JSX.Element {
  const [isLoading, setISLoading] = useState<boolean>(false);
  const getUserCredentials = async () => {
    const userCredential: string | null = await AsyncStorage.getItem('user');
    const user = JSON.parse(String(userCredential));
    try {
      setISLoading(true);
      if (user) {
        // call login api
        const {isLoggedIn}: any = await callLoginApi(
          user?.email,
          user.password,
        );

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
      } else {
        // open sign-in page

        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'SignIn'}],
          }),
        );
      }
    } catch (e) {
    } finally {
      setISLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => getUserCredentials(), 2000);
  }, []);

  return (
    <ImageBackground
      source={SPLASH_SCREEN_IMAGE}
      style={[styles.container, styles.horizontal]}>
      {isLoading && (
        <ActivityIndicator
          style={{alignSelf: 'flex-end', marginBottom: 80}}
          size="large"
          color="#ffffff"
        />
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
