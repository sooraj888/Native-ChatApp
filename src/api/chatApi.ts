import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosRequestConfig} from 'axios';
import {Alert} from 'react-native';
import {API_URL} from './getApi';

const LIST_API = API_URL + '/api/chat';

export type callListApiType = {
  data: any;
  error: boolean;
  errorMessage: string;
};

export const callListApi = async (token: string): Promise<callListApiType> => {
  const axiosConfig: AxiosRequestConfig<any> = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const {data} = await axios.get(LIST_API, axiosConfig);
    return {data: data, error: false, errorMessage: ''};
  } catch (e: any) {
    return {data: '', error: true, errorMessage: e.message};
  }
};

const GET_ALL_MESSAGE = API_URL + '/api/message/';

export type getAllMessageApiType = {
  data: any;
  error: boolean;
  errorMessage: string;
};

export const getAllMessageApi = async (
  token: string,
  chatId: string,
): Promise<getAllMessageApiType> => {
  const axiosConfig: AxiosRequestConfig<any> = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const {data} = await axios.get(GET_ALL_MESSAGE + chatId, axiosConfig);
    return {data: data, error: false, errorMessage: ''};
  } catch (e: any) {
    return {data: '', error: true, errorMessage: e.message};
  }
};
