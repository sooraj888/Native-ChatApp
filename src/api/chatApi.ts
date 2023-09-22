import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosRequestConfig} from 'axios';
import {Alert} from 'react-native';

const LIST_API = 'http://10.0.2.2:8000/api/chat';

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
