import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Avatar} from 'react-native-paper';
import DEFAULT_PROFILE_IMAGE from '../assets/default_profile.png';

export default function UserList({
  user,
  selectedUser,
  size,
}: {
  user?: any;
  selectedUser?: (id: any) => void;
  size?: 'sm' | 'md';
}) {
  return (
    <TouchableOpacity
      onPress={() => {
        const {name, email, _id} = user;
        selectedUser?.({name, email, _id});
      }}>
      <View style={[styles.item, {height: size == 'sm' ? 50 : 60}]}>
        <Avatar.Image
          size={size == 'sm' ? 40 : 50}
          source={user?.pic ? {uri: String(user?.pic)} : DEFAULT_PROFILE_IMAGE}
        />
        <View style={styles.details}>
          <Text
            style={[
              {
                fontSize: size == 'sm' ? 13 : 15,
                fontWeight: '600',
                textTransform: 'capitalize',
              },
            ]}>
            {user?.name}
          </Text>
          <Text
            style={{
              fontSize: size == 'sm' ? 13 : 15,
            }}>
            {user?.email}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#5ff6f4',
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 16,
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 5,
  },
  title: {
    fontSize: 15,
  },
  details: {
    paddingLeft: 5,
  },
});
