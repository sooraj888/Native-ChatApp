import {View, Text} from 'react-native';
import React from 'react';
import {getOppositeUser} from '../../utils/chatLogics';
import UserList from '../UserList';
import GroupCreateModal from '../Modals/GroupCreateModal';
import GroupListItem from './GroupListItem';
import {NavigationProp, useNavigation} from '@react-navigation/native';

export default function ChatListItem({
  chat,
  loggedUser,
  handleOnSelectChat,
}: any) {
  const oppositeUser = !chat?.isGroupChat
    ? getOppositeUser(chat, loggedUser)
    : null;
  const navigation: any = useNavigation();

  return chat?.isGroupChat ? (
    <GroupListItem group={chat} selectedUser={handleOnSelectChat} />
  ) : (
    <UserList
      user={oppositeUser}
      chat={chat}
      handleOnSelectChat={handleOnSelectChat}
    />
  );
}
