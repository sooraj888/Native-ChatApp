import {
  View,
  Text,
  Alert,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios, {AxiosRequestConfig} from 'axios';
import {TextInput, Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {callLoginApi} from '../api/userApi';
import Input from '../components/Input';
import PasswordInput from '../components/PasswordInput';
import {CommonActions} from '@react-navigation/native';
import BottomSigningNav from '../components/BottomSigningNav';
import {contextDataType, useContextData} from '../context/ContextData';

type userCredentialType = {
  email: string;
  password: string;
};

type id = 'email' | 'password';

const initialUserCredentialState = {
  email: '',
  password: '',
};

export default function SignIn({navigation}: any): JSX.Element {
  const [user, setUser] = useState<userCredentialType>(
    initialUserCredentialState,
  );
  const [isLoading, setIsLoading] = useState(false);
  const {saveUserData}: contextDataType = useContextData();

  const handleOnChange = (text: string, id: id) => {
    setUser(prev => {
      const updateUser = {...prev};
      updateUser[id] = text;
      return updateUser;
    });
  };

  const handleOnSubmit = async () => {
    if (!user?.email.trim() || !user?.password.trim()) {
      Alert.alert('Please Fill All Fields');
      return;
    }

    setIsLoading(true);
    const {isLoggedIn, message, data}: any = await callLoginApi(
      user?.email.trim(),
      user?.password.trim(),
    );
    if (isLoggedIn && data) {
      saveUserData(data);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'ChatList'}],
        }),
      );
    } else {
      Alert.alert(message);
    }
    setIsLoading(false);
  };

  const handleOnGuestCredentials = () => {
    setUser({email: 'guest@user.com', password: '12345678'});
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://th.bing.com/th/id/OIG.m4EAmpM7rxt_ar91kVeX?pid=ImgGn.png',
      }}
      style={styles.container}>
      <View style={styles.card}>
        <Input
          leftIcon={'gmail'}
          label={'Email'}
          value={user?.email}
          onChangeText={text => handleOnChange(text, 'email')}
        />

        <PasswordInput
          label={'Password'}
          value={user?.password}
          onChangeText={text => handleOnChange(text, 'password')}
        />

        <Button
          contentStyle={{flexDirection: 'row-reverse'}}
          style={[styles.button]}
          icon={'arrow-right-thin'}
          mode="contained"
          onPress={handleOnSubmit}
          loading={isLoading}
          disabled={isLoading}>
          Login
        </Button>
        <Button
          contentStyle={{flexDirection: 'row-reverse'}}
          style={[styles.button, {backgroundColor: 'rgba(190,0,0,1)'}]}
          icon={'arrow-right-thin'}
          mode="contained"
          onPress={handleOnGuestCredentials}
          disabled={isLoading}>
          Login Using Guest Credentials
        </Button>
        {!isLoading && (
          <BottomSigningNav
            style={{flex: 7, paddingHorizontal: 30}}
            message={"Don't have account ? "}
            buttonText={'Sign Up'}
            navigateScreenName={'SignUp'}
          />
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    flex: 1,
  },
  card: {
    maxWidth: 500,
    display: 'flex',
    height: 200,
  },
  button: {
    maxWidth: 400,
    minWidth: 300,
    alignSelf: 'center',
    marginVertical: 10,
  },
  mv: {
    marginVertical: 5,
  },
  input: {
    backgroundColor: 'transparent',
  },
});
