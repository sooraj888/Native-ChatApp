import {View, Text} from 'react-native';
import React from 'react';
import {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Context = createContext<any>({});

export type contextDataType = {
  loggedUser: any;
  saveUserData: React.Dispatch<any>;
  selectedChat: any;
  setSelectedChat: React.Dispatch<any>;
  isListRefresh: boolean;
  setIsListRefresh: React.Dispatch<any>;
};

export default function ContextData({children}: {children: React.ReactNode}) {
  const [loggedUser, setLoggedUser] = useState<any>(null);
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [isListRefresh, setIsListRefresh] = useState<boolean>(false);

  const getUser = async () => {
    const data = JSON.parse(String(await AsyncStorage.getItem('user')));
    if (data) {
      setLoggedUser(data);
    }
  };

  const saveUserData = async (payload: any) => {
    await AsyncStorage.setItem('user', JSON.stringify(payload), () => {
      getUser();
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Context.Provider
      value={{
        loggedUser,
        saveUserData,
        selectedChat,
        setSelectedChat,
        isListRefresh,
        setIsListRefresh,
      }}>
      {children}
    </Context.Provider>
  );
}

export const useContextData = (): contextDataType => {
  return useContext(Context);
};
