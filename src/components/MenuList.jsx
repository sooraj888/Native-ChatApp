import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, Menu, Divider, PaperProvider} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import UserModal from './Modals/UserModal';
import GroupCreateModal from './Modals/GroupCreateModal';

const MenuList = ({isVisible, user}) => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const [isGroupModalVisible, setIsGroupModalVisible] = useState(false);
  const closeMenu = () => setVisible(false);
  const navigation = useNavigation();

  React.useEffect(() => {
    if (!isVisible) {
      setVisible(false);
    }
  }, [isVisible]);

  return (
    <View
      style={{
        display: 'flex',
        width: 80,
        overflow: 'hidden',
      }}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button onPress={openMenu}>
            <Entypo name={'dots-three-vertical'} size={20} />
          </Button>
        }>
        <Menu.Item
          onPress={() => {
            closeMenu();
            setIsGroupModalVisible(true);
          }}
          title="Create Group"
        />

        <Menu.Item
          onPress={() => {
            closeMenu();
            setIsUserModalVisible(true);
          }}
          title="Profile"
        />

        <Menu.Item
          onPress={async () => {
            closeMenu();
            await AsyncStorage.setItem('user', '');
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'SignIn'}],
              }),
            );
          }}
          title="Logout"
        />
      </Menu>
      <UserModal
        setVisible={setIsUserModalVisible}
        visible={isUserModalVisible}
        user={user}
      />
      <GroupCreateModal
        setVisible={setIsGroupModalVisible}
        visible={isGroupModalVisible}
        user={user}
      />
    </View>
  );
};

export default MenuList;
