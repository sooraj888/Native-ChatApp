import React, {useState, useEffect} from 'react';
import {Modal, Portal, Button, PaperProvider, Avatar} from 'react-native-paper';
import {
  Dimensions,
  View,
  StyleSheet,
  Text,
  FlatList,
  Alert,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import Input from '../Input';
import UserList from '../UserList';
import {callSearchApi, callSearchApiType} from '../../api/userApi';
import {
  ApiType,
  addToGroupApi,
  createGroupApi,
  createGroupApiType,
  removeFromGroupApi,
  renameGroupApi,
} from '../../api/groupApi';
import axios, {AxiosHeaders} from 'axios';
import {useContextData} from '../../context/ContextData';

const UpdateGroupModel = ({visible, setVisible, user, group}: any) => {
  const {setSelectedChat, setIsListRefresh} = useContextData();
  const hideModal = () => setVisible(false);
  const [editGroupName, setEditGroupName] = useState('');
  const [searchText, setSearchText] = useState('');
  const [searchData, setSearchData] = useState<any>([]);
  const [selectedUserList, setSelectedUserList] = useState<Array<any>>(
    group?.users,
  );

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
    getSearchData(searchText.trim());

    setSearchText(text);
  };

  const handleOnSelectedUser = async (selectedUser: any) => {
    if (
      !selectedUserList?.find((item: any) => {
        return item?._id == selectedUser?._id;
      })
    ) {
      // const {data}= await renameGroupApi();
      setSelectedUserList(prev => [...prev, selectedUser]);
      const {data, error, errorMessage}: ApiType = await addToGroupApi(
        selectedUser?._id,
        group._id,
        user.token,
      );
      if (data) {
        setSelectedChat(data);
        setIsListRefresh((prev: boolean) => !prev);
        ToastAndroid.showWithGravityAndOffset(
          `${selectedUser.name} is Added to Group Successfully`,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      } else {
        Alert.alert(errorMessage);
      }
    }
  };

  const handleOnUpdateGroup = async () => {
    // hideModal();
    const selectedUsers = selectedUserList?.map((item: any) => item?._id);

    const {data, error, errorMessage}: ApiType = await renameGroupApi(
      editGroupName,
      group._id,
      user?.token,
    );
    if (data) {
      setSelectedChat(data);
      setIsListRefresh((prev: boolean) => !prev);
    } else {
      Alert.alert(errorMessage);
    }
    if (!error) {
      ToastAndroid.showWithGravityAndOffset(
        `Group Renamed to ${data.chatName} Successfully`,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }

    hideModal();
  };

  const handleOnRemoveUserFromGroup = async (id: string) => {
    const updatedUserList = selectedUserList.filter(
      (item: any) => item?._id != id,
    );
    setSelectedUserList(updatedUserList);

    const {data, error, errorMessage}: ApiType = await removeFromGroupApi(
      id,
      group._id,
      user.token,
    );
    if (data) {
      setSelectedChat(data);
      setIsListRefresh((prev: boolean) => !prev);
      ToastAndroid.showWithGravityAndOffset(
        `User Deleted From Group Successfully`,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else {
      Alert.alert(errorMessage);
    }
  };

  useEffect(() => {
    if (!visible) {
      setSelectedUserList([]);
      setEditGroupName('');
      setSearchText('');
      setSearchData([]);
    } else {
      setSelectedUserList(group?.users);
    }
  }, [visible]);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.containerStyle}
        style={styles.modal}>
        <View style={styles.container}>
          <View style={[styles.scrollContainer]}>
            <View style={styles.heading}>
              <Text style={styles.title}>{group?.chatName}</Text>
              <Button
                style={styles.closeButton}
                onPress={() => {
                  hideModal();
                }}>
                <Text style={styles.btnText}>Close</Text>
              </Button>
            </View>
            <Input
              label="Edit Group Name"
              value={editGroupName}
              leftIcon={'account-group'}
              onChangeText={e => setEditGroupName(e)}
              style={[styles.input]}></Input>
            <Input
              label="Search Users"
              leftIcon={'account-search'}
              value={searchText}
              onChangeText={handleOnSearchType}
              style={[styles.input]}></Input>
            <Button style={styles.createButton} onPress={handleOnUpdateGroup}>
              <Text style={styles.btnText}>Update</Text>
            </Button>
            <View
              style={{
                maxHeight: 100,
                padding: selectedUserList?.length > 0 ? 5 : 0,
                marginTop: 5,
                backgroundColor: 'rgba(223,220,220,0.9)',
                borderRadius: 10,
              }}>
              <FlatList
                horizontal={false}
                columnWrapperStyle={{justifyContent: 'center'}}
                numColumns={Math.floor(Dimensions.get('window').width / 110)}
                data={selectedUserList}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => {
                      handleOnRemoveUserFromGroup(item?._id);
                    }}>
                    <View
                      style={{
                        width: 100,
                        height: 30,
                        paddingHorizontal: 5,
                        backgroundColor: 'purple',
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        margin: 5,
                        borderRadius: 10,
                        flexDirection: 'row',
                      }}>
                      <Text style={{color: 'white'}}>{item?.name}</Text>
                      <Text style={{color: 'white'}}>X</Text>
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={item => item?._id}
              />
            </View>
            <FlatList
              style={{marginTop: 5}}
              data={searchData}
              renderItem={({item}) => (
                <UserList
                  size="sm"
                  user={item}
                  selectedUser={handleOnSelectedUser}
                />
              )}
              keyExtractor={item => item?._id}
            />
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export default UpdateGroupModel;

const styles = StyleSheet.create({
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    height: '100%',
  },
  container: {
    width: Dimensions.get('window').width - 30,
    display: 'flex',
    maxHeight: '90%',
  },
  scrollContainer: {paddingHorizontal: 5, height: '100%'},
  heading: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    flex: 10,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '700',
  },
  closeButton: {backgroundColor: 'gray', flex: 1},
  createButton: {backgroundColor: 'gray', marginTop: 10},
  btnText: {color: 'white'},
  input: {
    marginBottom: 5,
  },
  containerStyle: {backgroundColor: 'white', borderRadius: 10},
});
