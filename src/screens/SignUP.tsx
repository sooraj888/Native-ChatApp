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
  name: {value: string; isSecuredText: boolean};
  email: {value: string; isSecuredText: boolean};
  password: {value: string; isSecuredText: boolean};
  confirmPassword: {value: string; isSecuredText: boolean};
  pic: {value: string; isSecuredText: boolean};
};

type id = 'email' | 'password' | 'confirmPassword' | 'name';

const initialUserCredentialState = {
  name: {value: '', isSecuredText: false},
  email: {value: '', isSecuredText: false},
  password: {value: '', isSecuredText: true},
  confirmPassword: {value: '', isSecuredText: true},
  pic: {value: '', isSecuredText: false},
};

export default function SignUP(): JSX.Element {
  const [user, setUser] = useState<userCredentialType>(
    initialUserCredentialState,
  );

  const callApi = async () => {
    const payload: any = {
      email: 'guest@user.com',
      password: '12345678',
    };
    const axiosConfig: AxiosRequestConfig<any> = {
      headers: {'Content-Type': 'application/json'},
    };
    const {data} = await axios.post(LOGIN_API, payload, axiosConfig);
    console.log(data);
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
      updateUser[id].isSecuredText = !updateUser[id].isSecuredText;
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
          label={'Name'}
          style={[styles.mv, styles.input]}
          value={user?.name?.value}
          keyboardType={'email-address'}
          left={<TextInput.Icon icon={'account-edit'} />}
          onChangeText={text => handleOnChange(text, 'name')}
        />
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
              icon={user?.password?.isSecuredText ? 'eye' : 'eye-off'}
              onPress={() => handleOnPasswordVisibility('password')}
            />
          }
          secureTextEntry={user.password.isSecuredText}
          onChangeText={text => handleOnChange(text, 'password')}
        />
        <TextInput
          mode="outlined"
          label={'Confirm Password'}
          style={[styles.mv, styles.input]}
          value={user?.confirmPassword?.value}
          left={<TextInput.Icon icon={'lock'} />}
          right={
            <TextInput.Icon
              icon={user?.confirmPassword?.isSecuredText ? 'eye' : 'eye-off'}
              onPress={() => handleOnPasswordVisibility('confirmPassword')}
            />
          }
          secureTextEntry={user.confirmPassword.isSecuredText}
          onChangeText={text => handleOnChange(text, 'confirmPassword')}
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
