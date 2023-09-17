import {View, Text, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios, {AxiosRequestConfig} from 'axios';
import {TextInput} from 'react-native-paper';

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
    const payload: any = {
      email: 'guest@user.com',
      password: '12345678',
    };
    const axiosConfig: AxiosRequestConfig<any> = {
      headers: {'Content-Type': 'application/json'},
    };
    const {data} = await axios.post('', payload, axiosConfig);
  };

  const handleOnChange = (text: string, id: id) => {
    setUser(prev => {
      const updateUser = {...prev};
      updateUser[id].value = text;
      return updateUser;
    });
  };

  return (
    <View>
      {/* <Text style={{color: 'red'}}>{user}</Text> */}
      <TextInput
        mode="outlined"
        // secureTextEntry={type === 'password' ? isShowPassword : false}
        label={'Email'}
        value={user?.email?.value}
        keyboardType={'email-address'}
        // left={leftIcon && <TextInput.Icon icon={leftIcon} />}
        // right={
        //   type === 'password' && (
        //     <TextInput.Icon
        //       icon={isShowPassword ? 'eye' : 'eye-off'}
        //       onPress={() => setIsShowPassword(prev => !prev)}
        //     />
        //   )
        // }
        onChangeText={text => handleOnChange(text, 'email')}
      />
      <TextInput
        mode="outlined"
        // secureTextEntry={type === 'password' ? isShowPassword : false}
        label={'Password'}
        value={user?.password?.value}
        // left={leftIcon && <TextInput.Icon icon={leftIcon} />}
        right={
          // type === 'password' && (
          <TextInput.Icon
            icon={true ? 'eye' : 'eye-off'}
            onPress={() =>
              setUser(prev => {
                const updateUser: userCredentialType = {...prev};
                updateUser['password'].isVisible =
                  !updateUser['password'].isVisible;
                return updateUser;
              })
            }
          />
          // )
        }
        // secureTextEntry={false}
        secureTextEntry={user['password'].isVisible}
        onChangeText={text => handleOnChange(text, 'password')}
      />
    </View>
  );
}
