import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Avatar} from 'react-native-paper';
import DEFAULT_PROFILE_IMAGE from '../assets/default_profile.png';
const GROUP_ICON =
  'https://www.clipartmax.com/png/middle/204-2045091_group-together-teamwork-icon-people-icon-flat-png.png';

export default function GroupListItem({
  group,
  selectedUser,
  size,
}: {
  group?: any;
  selectedUser?: (id: any) => void;
  size?: 'sm' | 'md';
}) {
  return (
    <TouchableOpacity
      onPress={() => {
        selectedUser?.(group);
      }}>
      <View style={[styles.item, {height: size == 'sm' ? 50 : 60}]}>
        <Avatar.Text
          size={50}
          labelStyle={{fontSize: 16, color: 'white'}}
          style={{backgroundColor: 'rgba(160,10,120,1)'}}
          label="Group"
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
            {group?.chatName}
          </Text>
          <Text
            style={{
              fontSize: size == 'sm' ? 13 : 15,
            }}>
            {group?.users?.map?.((item: any) => {
              return item?.name + ', ';
            })}
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
