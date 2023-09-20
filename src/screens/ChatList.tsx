import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Alert, Text, View} from 'react-native';
import {Avatar, Button} from 'react-native-paper';
import {Image} from 'react-native';
import DEFAULT_PROFILE_IMAGE from '../assets/default_profile.png';

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
  return (
    <View>
      <Image
        source={user?.pic ? {uri: String(user?.pic)} : DEFAULT_PROFILE_IMAGE}
        width={100}
        height={100}
      />
      <Text>{user?.password}</Text>
      <Button
        mode="contained"
        onPress={() => {
          Alert.alert('Chat');
          navigation.navigate('Chat');
        }}>
        Chat
      </Button>
    </View>
  );
}
