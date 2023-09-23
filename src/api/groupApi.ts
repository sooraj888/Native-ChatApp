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
