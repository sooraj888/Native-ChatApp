import * as React from 'react';
import {
  Modal,
  Portal,
  Text,
  Button,
  PaperProvider,
  Avatar,
} from 'react-native-paper';
import {View} from 'react-native';
import DEFAULT_PROFILE_IMAGE from '../../assets/default_profile.png';

const UserModal = ({visible, setVisible, user}) => {
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', borderRadius: 10};
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
        }}>
        <View
          style={{
            maxWidth: 400,
            minWidth: 300,
            borderRadius: 50,
            display: 'flex',
            alignItems: 'center',
            paddingTop: 15,
            paddingBottom: 10,
          }}>
          <Avatar.Image
            size={70}
            source={
              user?.pic ? {uri: String(user?.pic)} : DEFAULT_PROFILE_IMAGE
            }
          />
          <Text>{user?.name}</Text>
          <Text style={{marginBottom: 30}}>{user?.email}</Text>
          <Button
            style={{backgroundColor: 'gray'}}
            onPress={() => {
              hideModal();
            }}>
            <Text style={{color: 'white'}}>close</Text>
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

export default UserModal;
