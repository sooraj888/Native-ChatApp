import {View, Text, StatusBar, Image, ToastAndroid, Alert} from 'react-native';
import React, {useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';

import {TouchableOpacity} from 'react-native-gesture-handler';
import {useCallback, useMemo, useRef} from 'react';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

import DEFAULT_PROFILE_IMAGE from '../assets/default_profile.png';
import SelectImage from './SelectImage';

export default function ImagePickerModal({
  bottomSheetCloseViewRef,
  bottomSheetRef,
  setFile,
  image,
  setImage,
}) {
  const [fileResponse, setFileResponse] = useState(null);
  // variables
  const snapPoints = useMemo(() => [100], []);

  const handleSheetChanges = useCallback(index => {}, []);

  return (
    <View style={{padding: 5, zIndex: 2, elevation: 3}}>
      <View
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            bottomSheetRef.current.present();
            bottomSheetCloseViewRef?.current?.setNativeProps?.({
              display: 'flex',
            });
          }}>
          <Image
            source={image}
            resizeMode="contain"
            onError={() => {
              ToastAndroid.show(
                'Please select a proper image.',
                ToastAndroid.SHORT,
              );
              setImage(DEFAULT_PROFILE_IMAGE);
            }}
            style={[
              {
                width: 140,
                height: 140,
                borderRadius: 100,
                backgroundColor: 'rgba(210,210,210,0.3)',
                borderWidth: 1,
                borderColor: 'gray',
              },
            ]}
          />
        </TouchableOpacity>
      </View>

      <BottomSheetModal
        handleIndicatorStyle={{
          borderRadius: 0,
          padding: 0,
          margin: 0,
          height: 0,
          zIndex: 5,
          elevation: 3,
        }}
        backgroundStyle={{
          borderRadius: 0,
          padding: 0,
          margin: 0,
          zIndex: 0,
          elevation: 3,
        }}
        style={{zIndex: 20}}
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <SelectImage
          setFile={setFile}
          bottomSheetRef={bottomSheetRef}
          bottomSheetCloseViewRef={bottomSheetCloseViewRef}
          setImage={setImage}
          setFileResponse={setFileResponse}
        />
      </BottomSheetModal>
    </View>
  );
}
