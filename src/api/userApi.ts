import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosRequestConfig} from 'axios';
import {Alert} from 'react-native';

const LOGIN_API = 'http://10.0.2.2:8000/api/user/login';

export const callLoginApi = async (
  email: string,
  password: string,
): Promise<{isLoggedIn: boolean; message: string} | undefined> => {
  if (email && password) {
    const payload: any = {
      email,
      password,
    };
    const axiosConfig: AxiosRequestConfig<any> = {
      // headers: {'Content-Type': 'application/json'},
    };
    try {
      const {data} = await axios.post(LOGIN_API, payload, axiosConfig);
      if (data) {
        data['password'] = password;

        AsyncStorage.setItem('user', JSON.stringify(data), e => {
          console.log('Error :', e);
        });

        return {isLoggedIn: true, message: ''};
      }
    } catch (e: any) {
      console.log(JSON.stringify(e));
      return {
        isLoggedIn: false,
        message: JSON.stringify(e?.response?.data?.message),
      };
    }
  } else {
    Alert.alert('Please Enter Email and Password');
  }
};

const SIGN_UP_API = 'http://10.0.2.2:8000/api/user';

export const callSignUpApi = async (
  email: string,
  password: string,
  name: string,
  pic?: string,
): Promise<{isLoggedIn: boolean; message: string} | undefined> => {
  if (email && password && name && pic) {
    let payload: any = {
      email,
      password,
      name,
    };
    if (pic) {
      payload = {...payload, pic};
    }
    const axiosConfig: AxiosRequestConfig<any> = {
      headers: {'Content-Type': 'application/json'},
    };
    try {
      const {data} = await axios.post(SIGN_UP_API, payload, axiosConfig);
      if (data) {
        data['password'] = password;

        AsyncStorage.setItem('user', JSON.stringify(data), e => {
          console.log('Error :', e);
        });

        return {isLoggedIn: true, message: ''};
      }
    } catch (e: any) {
      console.log(JSON.stringify(e));
      return {
        isLoggedIn: false,
        message: JSON.stringify(e?.response?.data?.message),
      };
    }
  } else {
    Alert.alert('Please Enter Email and Password');
  }
};
