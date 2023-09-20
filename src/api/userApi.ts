import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosRequestConfig} from 'axios';

const LOGIN_API = 'http://10.0.2.2:8000/api/user/login';

export const callLoginApi = async (
  email: string,
  password: string,
): Promise<{isLoggedIn: boolean; message: string} | undefined> => {
  if (email.trim() && password.trim()) {
    const payload: any = {
      email,
      password,
    };
    const axiosConfig: AxiosRequestConfig<any> = {
      headers: {'Content-Type': 'application/json'},
    };
    const {data} = await axios.post(LOGIN_API, payload, axiosConfig);
    if (data) {
      data['password'] = password;

      AsyncStorage.setItem('user', JSON.stringify(data), e => {
        console.log('Error :', e);
      });
    }

    return data
      ? {isLoggedIn: true, message: ''}
      : {isLoggedIn: false, message: ''};
  }
};
