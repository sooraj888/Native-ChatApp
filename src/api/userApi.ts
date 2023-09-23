import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosRequestConfig} from 'axios';
import {Alert} from 'react-native';
import {API_URL} from './getApi';

const LOGIN_API = API_URL + '/api/user/login';

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

        AsyncStorage.setItem('user', JSON.stringify(data), e => {});

        return {isLoggedIn: true, message: ''};
      }
    } catch (e: any) {
      return {
        isLoggedIn: false,
        message: JSON.stringify(e?.response?.data?.message),
      };
    }
  } else {
    Alert.alert('Please Enter Email and Password');
  }
};

const SIGN_UP_API = API_URL + '/api/user';

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

        AsyncStorage.setItem('user', JSON.stringify(data), e => {});

        return {isLoggedIn: true, message: ''};
      }
    } catch (e: any) {
      return {
        isLoggedIn: false,
        message: JSON.stringify(e?.response?.data?.message),
      };
    }
  } else {
    Alert.alert('Please Enter Email and Password');
  }
};

const SEARCH_API = API_URL + '/api/user?search=';

export type callSearchApiType = {
  data: any;
  error: boolean;
  errorMessage: string;
};

export const callSearchApi = async (
  searchText: string,
  token: string,
): Promise<callSearchApiType> => {
  const axiosConfig: AxiosRequestConfig<any> = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const {data} = await axios.get(SEARCH_API + searchText.trim(), axiosConfig);

    return {data: data, error: false, errorMessage: ''};
  } catch (e: any) {
    return {data: '', error: true, errorMessage: e.message};
  }
};
