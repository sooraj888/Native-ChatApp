import {View, Text, VirtualizedList} from 'react-native';
import React, {memo} from 'react';
import {useContextData} from '../../context/ContextData';
import {isSameSender} from '../../utils/chatLogics';
import {Avatar} from 'react-native-paper';
import DEFAULT_PROFILE_IMAGE from '../../assets/default_profile.png';
import {FlatList} from 'react-native-gesture-handler';
const Message = ({allMessage}: {allMessage: Array<any>}) => {
  const {loggedUser} = useContextData();

  const getItem = (data: any, index: number): any => data?.[index];

  return (
    <FlatList
      inverted
      style={{paddingHorizontal: 6}}
      data={allMessage}
      renderItem={({item, index}: any) => {
        const isLoggedInUser = loggedUser?._id === item?.sender?._id;
        return (
          <View
            key={item?._id}
            style={{
              display: 'flex',
              marginBottom: isSameSender(allMessage, item, index, 'INVALID_ID')
                ? 15
                : 0,
            }}>
            <View
              style={{
                alignSelf: isLoggedInUser ? 'flex-end' : 'flex-start',
                maxWidth: '70%',
                marginVertical: 2,
                display: 'flex',
                flexDirection: 'row',
              }}>
              {isSameSender(allMessage, item, index, loggedUser?._id) ? (
                <Avatar.Image
                  source={
                    item?.sender?.pic
                      ? {uri: item?.sender?.pic}
                      : DEFAULT_PROFILE_IMAGE
                  }
                  size={18}
                  style={{marginRight: 8}}
                />
              ) : (
                <View style={{marginRight: 8, width: 17}}></View>
              )}
              <View
                style={{
                  alignSelf: isLoggedInUser ? 'flex-start' : 'flex-end',
                  backgroundColor: isLoggedInUser
                    ? 'rgba(180,0,160,0.8)'
                    : 'rgba(180,0,140,0.9)',
                  paddingLeft: 10,
                  paddingVertical: 5,
                  paddingRight: 10,
                  borderRadius: 10,
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
      //   getItemCount={data => data.length}
      keyExtractor={(item: any) => item?._id}
      //   getItem={getItem}
    />
  );
};
export default Message;
