import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Alert, Text, View} from 'react-native';
import {Avatar, Button} from 'react-native-paper';
import {Image} from 'react-native';
import DEFAULT_PROFILE_IMAGE from '../assets/default_profile.png';
import MenuList from '../components/MenuList';
import {useIsFocused} from '@react-navigation/native';
import UserModal from '../components/Modals/UserModal';

export default function ChatList({navigation}: any): JSX.Element {
  const [user, setUser] = useState<any>(null);

  const getUser = async () => {
    const data = JSON.parse(String(await AsyncStorage.getItem('user')));
    if (data) {
      setUser(data);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  const isFocused = useIsFocused();
  return (
    <View>
      <MenuList isVisible={isFocused} user={user} />
    </View>
  );
}
