import * as React from 'react';
import {
  Modal,
  Portal,
  Text,
  Button,
  PaperProvider,
  Avatar,
} from 'react-native-paper';
import {Dimensions, View} from 'react-native';
import Input from '../Input';
import {ScrollView} from 'react-native-gesture-handler';

const GroupCreateModal = ({visible, setVisible, user}) => {
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
          height: '100%',
        }}>
        <View
          style={{
            width: Dimensions.get('window').width - 30,
            display: 'flex',
            // paddingHorizontal: 10,
            maxHeight: '90%',
          }}>
          <ScrollView style={{paddingHorizontal: 5, height: '100%'}}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  flex: 10,
                  alignSelf: 'center',
                  textAlign: 'center',
                  fontSize: 25,
                  fontWeight: '700',
                }}>
                Create Group
              </Text>
              <Button
                style={{backgroundColor: 'gray', flex: 1}}
                onPress={() => {
                  hideModal();
                }}>
                <Text style={{color: 'white'}}>Close</Text>
              </Button>
            </View>
            <Input label="Group Name" leftIcon={'account-group'}></Input>
            <Input label="Search" leftIcon={'account-search'}></Input>

            <Button
              style={{backgroundColor: 'gray', marginTop: 10}}
              onPress={() => {
                hideModal();
              }}>
              <Text style={{color: 'white'}}>Create</Text>
            </Button>
          </ScrollView>
        </View>
      </Modal>
    </Portal>
  );
};

export default GroupCreateModal;
