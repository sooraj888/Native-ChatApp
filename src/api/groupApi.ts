import axios, {AxiosRequestConfig} from 'axios';
import {API_URL} from './getApi';

const CREATE_GROUP_API = API_URL + '/api/chat/group';

export type createGroupApiType = {
  data: any;
  error: boolean;
  errorMessage: string;
};

export const createGroupApi = async (
  name: string,
  users: string,
  token: string,
): Promise<createGroupApiType> => {
  const axiosConfig: AxiosRequestConfig<any> = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const {data} = await axios.post(
      CREATE_GROUP_API,
      {name, users},
      axiosConfig,
    );
    return {data: data, error: false, errorMessage: ''};
  } catch (e: any) {
    return {data: '', error: true, errorMessage: e?.response?.data?.message};
  }
};

const RENAME_GROUP_API = API_URL + '/api/chat/renameGroup';

export type ApiType = {
  data: any;
  error: boolean;
  errorMessage: string;
};

export const renameGroupApi = async (
  chatName: string,
  chatId: string,
  token: string,
): Promise<ApiType> => {
  const axiosConfig: AxiosRequestConfig<any> = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const {data} = await axios.put(
      RENAME_GROUP_API,
      {chatName, chatId},
      axiosConfig,
    );
    return {data: data, error: false, errorMessage: ''};
  } catch (e: any) {
    return {
      data: '',
      error: true,
      errorMessage: e?.response?.data?.message || e?.message,
    };
  }
};

const ADD_TO_GROUP_API = API_URL + '/api/chat/groupAdd';

export const addToGroupApi = async (
  userId: string,
  chatId: string,
  token: string,
): Promise<ApiType> => {
  const axiosConfig: AxiosRequestConfig<any> = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const {data} = await axios.put(
      ADD_TO_GROUP_API,
      {userId, chatId},
      axiosConfig,
    );
    return {data: data, error: false, errorMessage: ''};
  } catch (e: any) {
    return {
      data: '',
      error: true,
      errorMessage: e?.response?.data?.message || e?.message,
    };
  }
};

const REMOVE_FROM_GROUP_API = API_URL + '/api/chat/groupRemove';

export const removeFromGroupApi = async (
  userId: string,
  chatId: string,
  token: string,
): Promise<ApiType> => {
  const axiosConfig: AxiosRequestConfig<any> = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const {data} = await axios.put(
      REMOVE_FROM_GROUP_API,
      {userId, chatId},
      axiosConfig,
    );
    return {data: data, error: false, errorMessage: ''};
  } catch (e: any) {
    return {
      data: '',
      error: true,
      errorMessage: e?.response?.data?.message || e?.message,
    };
  }
};
