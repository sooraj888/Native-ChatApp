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

const LOGIN_API = 'http://10.0.2.2:8000/api/user/login';

type userCredentialType = {
  email: {value: string; isVisible: boolean};
  password: {value: string; isVisible: boolean};
};

type id = 'email' | 'password';

const initialUserCredentialState = {
  email: {value: '', isVisible: false},
  password: {value: '', isVisible: true},
};

export default function SignIn(): JSX.Element {
  const [user, setUser] = useState<userCredentialType>(
    initialUserCredentialState,
  );

  const callApi = async () => {
    if (user?.email?.value.trim() && user?.password?.value.trim()) {
      const payload: any = {
        email: user?.email?.value,
        password: user?.password?.value,
      };
      const axiosConfig: AxiosRequestConfig<any> = {
        headers: {'Content-Type': 'application/json'},
      };
      const {data} = await axios.post('', payload, axiosConfig);
    }
  };

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
          onPress={() => callApi()}>
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
