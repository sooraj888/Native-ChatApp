import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState, useRef} from 'react';
import {Alert, Text, View, StatusBar} from 'react-native';
import {Avatar, Button} from 'react-native-paper';
import {Image} from 'react-native';
import DEFAULT_PROFILE_IMAGE from '../assets/default_profile.png';
import {
  callListApiType,
  getAllMessageApi,
  getAllMessageApiType,
} from '../api/chatApi';
import {FlatList} from 'react-native-gesture-handler';

const chatId = '64e09074520ea2bdf8f17d9e';

export default function Chat({navigation}: any): JSX.Element {
  const [user, setUser] = useState<any>(null);
  const [message, setMessage] = useState<Array<any>>([]);
  const FlatListRef = useRef<any>(null);
  // const [count, setCount] = useState(0);
  const getUSer = async () => {
    const data = JSON.parse(String(await AsyncStorage.getItem('user')));
    if (data) {
      setUser(data);
    }
  };
  useEffect(() => {
    getUSer();
    StatusBar.setBackgroundColor('black');
  }, []);

  const callAllMessageApi = async () => {
    const {data, error, errorMessage}: getAllMessageApiType =
      await getAllMessageApi(user?.token, chatId);
    if (data) {
      setMessage(data?.reverse());
      // FlatListRef.current?.scrollToEnd();
    }
  };

  useEffect(() => {
    // callAllMessageApi();
  }, []);

  return (
    <View
      style={{
        display: 'flex',
        flex: 1,
        backgroundColor: 'rgb(0, 0, 102)',
      }}>
      <Button
        onPress={() => {
          callAllMessageApi();
        }}>
        fetch
      </Button>
      <Button
        onPress={() => {
          setMessage(prev => {
            const uD: Array<any> = [...prev];
            uD.unshift({
              _id: '64e3a1785ce076859b229220' + Date.now(),
              sender: {
                _id: '64e051b8b0e5b8e7ec019eb5',
                name: 'guest',
                email: 'guest@user.com',
                pic: 'https://th.bing.com/th/id/OIP.RW6RrwSnGNeX1z44Yg93agHaJQ?pid=ImgDet&w=207&h=258&c=7&dpr=1.6.png',
              },
              content: Date.now(),
            });
            return uD;
          });
        }}>
        add
      </Button>
      <View
        style={{
          height: 50,
          width: '100%',
          backgroundColor: 'rgb(20, 0, 51)',
        }}></View>
      <View style={{flex: 1, paddingBottom: 10, paddingTop: 5}}>
        <FlatList
          inverted
          style={{paddingHorizontal: 10}}
          data={message}
          ref={FlatListRef}
          renderItem={({item, index}) => {
            const isLoggedInUser = user?._id !== item?.sender?._id;
            return (
              <View style={{display: 'flex'}}>
                <View
                  style={{
                    alignSelf: isLoggedInUser ? 'flex-start' : 'flex-end',
                    maxWidth: '70%',
                    paddingVertical: 5,
                    paddingRight: 10,
                    paddingLeft: isLoggedInUser ? 3 : 10,
                    backgroundColor: 'rgba(180,0,140,0.9)',
                    marginVertical: 2,
                    borderRadius: 10,
                    display: 'flex',
                    flexDirection: 'row',
                  }}>
                  {user?._id != item?.sender?._id && (
                    <Avatar.Image
                      source={
                        item?.sender?.pic
                          ? {uri: item?.sender?.pic}
                          : DEFAULT_PROFILE_IMAGE
                      }
                      size={20}
                      style={{marginRight: 8}}
                    />
                  )}
                  <View
                    style={{
                      alignSelf: isLoggedInUser ? 'flex-start' : 'flex-end',
                    }}>
                    <Text
                      style={{
                        color: 'white',
                      }}>
                      {item?.content}
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
          keyExtractor={item => item?._id}
        />
      </View>
    </View>
  );
}
