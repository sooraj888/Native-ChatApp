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

type userCredentialType = {
  email: {value: string; isVisible: boolean};
  password: {value: string; isVisible: boolean};
};

type id = 'email' | 'password';

const initialUserCredentialState = {
  email: {value: '', isVisible: false},
  password: {value: '', isVisible: true},
};

export default function SignIn({navigation}: any): JSX.Element {
  const [user, setUser] = useState<userCredentialType>(
    initialUserCredentialState,
  );

  const handleOnChange = (text: string, id: id) => {
    setUser(prev => {
      const updateUser = {...prev};
      updateUser[id].value = text;
      return updateUser;
    });
  };

  const handleOnPasswordVisibility = (id: id) =>
    setUser(prev => {
      const updateUser: userCredentialType = {...prev};
      updateUser[id].isVisible = !updateUser[id].isVisible;
      return updateUser;
    });

  const handleOnSubmit = async () => {
    const {isLoggedIn}: any = await callLoginApi(
      user?.email?.value,
      user?.password?.value,
    );
    if (isLoggedIn) {
      navigation.navigate('ChatList');
    }
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://th.bing.com/th/id/OIG.m4EAmpM7rxt_ar91kVeX?pid=ImgGn.png',
      }}
      style={styles.container}>
      <View style={styles.card}>
        <TextInput
          mode="outlined"
          label={'Email'}
          style={[styles.mv, styles.input]}
          value={user?.email?.value}
          keyboardType={'email-address'}
          left={<TextInput.Icon icon={'gmail'} />}
          onChangeText={text => handleOnChange(text, 'email')}
        />
        <TextInput
          mode="outlined"
          label={'Password'}
          style={[styles.mv, styles.input]}
          value={user?.password?.value}
          left={<TextInput.Icon icon={'lock'} />}
          right={
            <TextInput.Icon
              icon={user?.password?.isVisible ? 'eye' : 'eye-off'}
              onPress={() => handleOnPasswordVisibility('password')}
            />
          }
          secureTextEntry={user.password.isVisible}
          onChangeText={text => handleOnChange(text, 'password')}
        />

        <Button
          contentStyle={{flexDirection: 'row-reverse'}}
          style={[styles.button]}
          icon={'arrow-right-thin'}
          mode="contained"
          onPress={handleOnSubmit}>
          Submit
        </Button>
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
    maxWidth: 300,
    minWidth: 200,
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
