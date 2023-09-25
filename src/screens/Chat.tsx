import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState, useRef, memo} from 'react';
import {Alert, Text, View, StatusBar} from 'react-native';
import {Avatar, Button, TextInput} from 'react-native-paper';
import {Image} from 'react-native';
import DEFAULT_PROFILE_IMAGE from '../assets/default_profile.png';
import {
  callListApiType,
  getAllMessageApi,
  getAllMessageApiType,
  sendMessageApi,
  sendMessageApiType,
} from '../api/chatApi';

import {contextDataType, useContextData} from '../context/ContextData';
import io from 'socket.io-client';

import Message from '../components/Chat/Message';
import {API_URL} from '../api/getApi';

var socket: any, selectedChatCompare: any;

const Chat = ({navigation}: any): JSX.Element => {
  const {loggedUser, selectedChat} = useContextData();
  const [allMessage, setAllMessage] = useState<Array<any>>([]);
  const inputRef = useRef<any>();

  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const [typedMessage, setTypedMessage] = useState('');
  const [count, setCount] = useState(0);

  const callAllMessageApi = async (chatId: string) => {
    const {data, error, errorMessage}: getAllMessageApiType =
      await getAllMessageApi(loggedUser?.token, chatId);

    if (data) {
      setAllMessage([...data]?.reverse());
      socket.emit('join room', selectedChat?._id);
    }
  };

  const sendMessage = async () => {
    socket.emit('stop typing', selectedChat?._id);
    setTypedMessage('');
    const {data, error}: sendMessageApiType = await sendMessageApi(
      selectedChat?._id,
      typedMessage,
      loggedUser?.token,
    );
    if (!error && data) {
      socket.emit('new message', data);
      setAllMessage(prev => {
        const updateAllMessage: Array<any> = [...prev];
        updateAllMessage.unshift(data);
        return updateAllMessage;
      });
    }
  };

  const onTypingHandler = (text: string) => {
    setTypedMessage(text);
    if (!socketConnected) {
      return;
    } else {
      if (!typing) {
        setTyping(true);
        socket.emit('typing', selectedChat?._id);
      }
      let lastTypingTime = new Date().getTime();
      var timerLength = 3000;
      setTimeout(() => {
        var timeNow = new Date().getTime();
        var timeDiff = timeNow - lastTypingTime;
        if (timeDiff >= timerLength && typing) {
          socket.emit('stop typing', selectedChat?._id);
          setTyping(false);
        }
      }, timerLength);
    }
  };

  useEffect(() => {
    socket = io(API_URL);
    socket.emit('setup', loggedUser);
    socket.on('connected', () => {
      setSocketConnected(true);
    });
    socket.on('typing', () => {
      setIsTyping(true);
    });
    socket.on('stop typing', () => {
      setIsTyping(false);
    });
  }, []);

  useEffect(() => {
    StatusBar.setBackgroundColor('black');
  }, []);

  useEffect(() => {
    socket.on('message received', (newMessageReceived: any) => {
      console.log(!selectedChatCompare);
      if (
        !selectedChatCompare ||
        selectedChatCompare?._id !== newMessageReceived?.chat?._id
      ) {
        // give notification
      } else {
        setAllMessage(prev => {
          const updateAllMessage: Array<any> = [...prev];
          updateAllMessage.unshift(newMessageReceived);
          return [...updateAllMessage];
        });
      }
    });
  }, []);

  useEffect(() => {
    selectedChatCompare = selectedChat;
    return () => {
      selectedChatCompare = null;
    };
  }, [selectedChat]);

  useEffect(() => {
    if (selectedChat) {
      callAllMessageApi(selectedChat?._id);
    }
  }, []);
  return (
    <View
      style={{
        display: 'flex',
        flex: 1,
        backgroundColor: 'rgb(0, 0, 102)',
      }}>
      <View
        style={{
          height: 50,
          width: '100%',
          backgroundColor: 'rgb(20, 0, 51)',
        }}>
        {/* <Text style={{color: 'white'}}>{String(isTyping)}</Text> */}
      </View>
      <View style={{flex: 1, paddingBottom: 10, paddingTop: 5}}>
        <Message allMessage={allMessage} />
      </View>
      <View
        style={{
          height: 65,
          width: '100%',
          // backgroundColor: 'white',
        }}>
        {isTyping && (
          <View
            style={{
              position: 'absolute',
              left: 15,
              top: -33,
              backgroundColor: 'green',
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: 20,
            }}>
            <Text style={{color: 'white'}}>Typing</Text>
          </View>
        )}
        <TextInput
          ref={inputRef}
          accessibilityIgnoresInvertColors={false}
          mode="outlined"
          placeholder="Type"
          value={typedMessage}
          right={
            <TextInput.Icon
              icon={'send'}
              onPress={() => {
                sendMessage();
              }}
            />
          }
          onChangeText={onTypingHandler}
          style={{marginHorizontal: 10}}
          contentStyle={{margin: 0, padding: 0}}
        />
      </View>
    </View>
  );
};
export default Chat;
{
  /* <Button
        onPress={() => {
          setAllMessage(prev => {
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
      </Button> */
}
