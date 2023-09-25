import {View, Text, TouchableHighlight, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Avatar} from 'react-native-paper';
import {useContextData} from '../../context/ContextData';
import {getOppositeUser} from '../../utils/chatLogics';
import UserModal from '../Modals/UserModal';
import UpdateGroupModel from '../Modals/UpdateGroupModel';

export default function ChatHeader() {
  const {selectedChat, loggedUser} = useContextData();

  const isGroupChat = selectedChat.isGroupChat;
  const selectedUser = !isGroupChat
    ? getOppositeUser(selectedChat, loggedUser)
    : null;

  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <TouchableOpacity
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
      onPress={() => {
        setIsModalVisible(true);
      }}>
      {!isGroupChat ? (
        <>
          {/* <TouchableOpacity
            onPress={() => {
              setIsModalVisible(true);
            }}> */}
          <Avatar.Image
            source={{uri: selectedUser?.pic}}
            size={40}
            style={{marginLeft: 10}}
          />
          {/* </TouchableOpacity> */}
          <UserModal
            visible={isModalVisible}
            setVisible={setIsModalVisible}
            user={selectedUser}
          />
          <View>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                paddingHorizontal: 10,
                textTransform: 'capitalize',
              }}>
              {selectedUser.name}
            </Text>
            <Text style={{color: 'grey', fontSize: 11, paddingHorizontal: 10}}>
              {selectedUser.email}
            </Text>
          </View>
        </>
      ) : (
        <>
          <Avatar.Text
            label="Group"
            size={40}
            style={{marginLeft: 10}}
            labelStyle={{fontSize: 11}}
          />
          {/* </TouchableOpacity> */}
          <UpdateGroupModel
            visible={isModalVisible}
            setVisible={setIsModalVisible}
            user={loggedUser}
            group={selectedChat}
          />
          <View>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                paddingHorizontal: 10,
                textTransform: 'capitalize',
              }}>
              {selectedChat?.chatName}
            </Text>
            <Text
              style={{
                color: 'rgba(210,210,210,1)',
                fontSize: 11,
                paddingHorizontal: 10,
              }}>
              Users :{'   '}
              {selectedChat?.users?.map?.((item: any) => {
                return item?.name + ', ';
              })}
            </Text>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
}
