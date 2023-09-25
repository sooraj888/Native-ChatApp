import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState, useRef} from 'react';
import {FlatList, Text, View, TouchableOpacity} from 'react-native';
import {Avatar, Button, TextInput} from 'react-native-paper';
import {Image} from 'react-native';
import DEFAULT_PROFILE_IMAGE from '../assets/default_profile.png';
import MenuList from '../components/MenuList';
import {useIsFocused} from '@react-navigation/native';
import UserModal from '../components/Modals/UserModal';
import Input from '../components/Input';
import {callSearchApi, callSearchApiType} from '../api/userApi';
import UserList from '../components/UserList';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {callListApi, callListApiType} from '../api/chatApi';
import ChatListItem from '../components/Chat/ChatListItem';
import {contextDataType, useContextData} from '../context/ContextData';

export default function ChatList({navigation}: any): JSX.Element {
  const [user, setUser] = useState<any>(null);
  const [searchText, setSearchText] = useState('');
  const [searchData, setSearchData] = useState<any>([]);
  const [isSearchListSelected, setIsSearchListSelected] = useState(false);

  const isFocused = useIsFocused();
  const inputRef = useRef<any>();
  const [chatList, setChatList] = useState<Array<any>>([]);

  const {loggedUser, setSelectedChat}: contextDataType = useContextData();

  const getSearchData = async (searchText: string) => {
    const {data, error, errorMessage}: callSearchApiType = await callSearchApi(
      searchText,
      user?.token,
    );
    if (data) {
      setSearchData(data);
    }
  };

  const handleOnSearchType = (text: string) => {
    setIsSearchListSelected(true);
    getSearchData(searchText.trim());

    setSearchText(text);
  };

  const getChatList = async () => {
    // hideModal();

    const {data, error, errorMessage}: callListApiType = await callListApi(
      user?.token,
    );
    if (data && !error) {
      setChatList(data);
    }
  };

  const getUser = async () => {
    const data = JSON.parse(String(await AsyncStorage.getItem('user')));
    if (data) {
      setUser(data);
    }
  };

  useEffect(() => {
    if (user) {
      getChatList();
    }
  }, [user]);

  const handleOnSelectChat = (selectedChat: any) => {
    setSelectedChat(selectedChat);
    navigation.navigate('Chat');
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={{display: 'flex', flex: 1}}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          height: 50,
          alignItems: 'center',
          backgroundColor: 'rgba(200,200,200,1)',
        }}>
        <View
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            // paddingVertical: 5,
          }}>
          <TextInput
            ref={inputRef}
            accessibilityIgnoresInvertColors={false}
            onFocus={() => {
              setIsSearchListSelected(true);
            }}
            label="Search"
            value={searchText}
            left={<TextInput.Icon icon={'account-search'} />}
            onChangeText={handleOnSearchType}
          />
        </View>
        <MenuList isVisible={isFocused} user={user} />
      </View>
      {isSearchListSelected && (
        <View style={{width: '100%', height: 20, display: 'flex'}}>
          <TouchableOpacity
            style={{alignSelf: 'flex-end', paddingRight: 30}}
            onPress={() => {
              setIsSearchListSelected(false);
              inputRef.current.blur();
            }}>
            <MaterialCommunityIcons size={25} name="close" />
          </TouchableOpacity>
        </View>
      )}
      <View
        style={{
          display: 'flex',
          flex: 1,
          width: '100%',
          height: 30,
          paddingVertical: 5,
        }}>
        {isSearchListSelected ? (
          <FlatList
            style={{marginTop: 5}}
            data={searchData}
            renderItem={({item}) => (
              <UserList
                size="md"
                user={item}
                selectedUser={handleOnSelectChat}
              />
            )}
            keyExtractor={item => item?._id}
          />
        ) : (
          <FlatList
            style={{marginTop: 5}}
            data={chatList}
            renderItem={({item}) => (
              <ChatListItem
                chat={item}
                loggedUser={user}
                handleOnSelectChat={handleOnSelectChat}
              />
            )}
            keyExtractor={item => item?._id}
          />
        )}
      </View>
    </View>
  );
}
