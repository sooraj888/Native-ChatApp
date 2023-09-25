import {
  View,
  Text,
  Alert,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import axios, {AxiosRequestConfig} from 'axios';
import {TextInput, Button} from 'react-native-paper';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import ImagePickerModal from '../components/ImagePickerModal';
import DEFAULT_PROFILE_IMAGE from '../assets/default_profile.png';
import PasswordInput from '../components/PasswordInput';
import Input from '../components/Input';
import BottomSigningNav from '../components/BottomSigningNav';
import {callSignUpApi} from '../api/userApi';
import {CommonActions} from '@react-navigation/native';

const LOGIN_API = 'http://10.0.2.2:8000/api/user';

type userCredentialType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type id = 'email' | 'password' | 'confirmPassword' | 'name';

const initialUserCredentialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export default function SignUP({navigation}: any): JSX.Element {
  const bottomSheetRef = useRef<any>(null);
  const bottomSheetCloseViewRef = useRef<any>();
  const [file, setFile] = useState<string>('');

  const [user, setUser] = useState<userCredentialType>(
    initialUserCredentialState,
  );

  const [image, setImage] = useState(DEFAULT_PROFILE_IMAGE);

  const {email, name, password, confirmPassword} = user;

  const [isLoading, setIsLoading] = useState(false);

  const callApi = async () => {
    setIsLoading(true);
    if (!email && !name && !password && !confirmPassword) {
      Alert.alert('Enter all filed');
      return;
    }
    const {isLoggedIn, message}: any = await callSignUpApi(
      email,
      password,
      name,
      file,
    );
    if (isLoggedIn) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'ChatList'}],
        }),
      );
    } else {
      Alert.alert(message);
    }
    setIsLoading(false);
  };

  const handleOnChange = (text: string, id: id) => {
    setUser(prev => {
      const updateUser = {...prev};
      updateUser[id] = text;
      return updateUser;
    });
  };

  const closeBottomTab = () => {
    bottomSheetRef.current?.close();
    bottomSheetCloseViewRef?.current?.setNativeProps({display: 'none'});
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://th.bing.com/th/id/OIG.m4EAmpM7rxt_ar91kVeX?pid=ImgGn.png',
      }}
      style={styles.container}>
      <View style={{alignItems: 'center', marginBottom: 20}}>
        <ImagePickerModal
          bottomSheetRef={bottomSheetRef}
          bottomSheetCloseViewRef={bottomSheetCloseViewRef}
          setFile={setFile}
          image={image}
          setImage={setImage}
        />
      </View>

      <Input
        leftIcon={'account-edit'}
        label={'Name'}
        value={user?.name}
        onChangeText={text => handleOnChange(text, 'name')}
      />

      <Input
        leftIcon={'gmail'}
        label={'Email'}
        value={user?.email}
        onChangeText={text => handleOnChange(text, 'email')}
      />

      <PasswordInput
        label={'Password'}
        value={user?.password}
        onChangeText={text => handleOnChange(text, 'password')}
      />
      <PasswordInput
        label={'Confirm Password'}
        value={user?.confirmPassword}
        onChangeText={text => handleOnChange(text, 'confirmPassword')}
      />

      <Button
        contentStyle={{flexDirection: 'row-reverse'}}
        style={[styles.button]}
        icon={'arrow-right-thin'}
        mode="contained"
        loading={isLoading}
        disabled={isLoading}
        onPress={() => callApi()}>
        Submit
      </Button>

      {!isLoading && (
        <BottomSigningNav
          style={{flex: 7, paddingHorizontal: 30}}
          message={'Already have an account ? '}
          buttonText={'Sign In'}
          navigateScreenName={'SignIn'}
        />
      )}

      <View
        ref={bottomSheetCloseViewRef}
        style={{
          backgroundColor: 'rgba(0,0,0,0.4)',
          position: 'absolute',
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          display: 'none',
          flex: 1,
          elevation: 1,
        }}>
        <TouchableWithoutFeedback
          onPress={() => {
            closeBottomTab();
          }}>
          <View style={{flex: 1, zIndex: 100}}></View>
        </TouchableWithoutFeedback>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    flex: 1,
  },
  card: {
    maxWidth: 500,
    display: 'flex',
    zIndex: 1,
  },
  button: {
    maxWidth: 300,
    minWidth: 200,
    alignSelf: 'center',
    marginVertical: 10,
  },
  mv: {
    marginVertical: 5,
  },
  input: {
    backgroundColor: 'transparent',
  },
});
