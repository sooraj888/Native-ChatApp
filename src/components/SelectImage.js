import {View, Text, Image} from 'react-native';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {useCallback, useMemo, useRef} from 'react';
import {StyleSheet} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import {creamBackground} from '../assets/colors/color.js';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DocumentPicker from 'react-native-document-picker';
import DEFAULT_PROFILE_IMAGE from '../assets/default_profile.png';

import RNImageToBase64 from 'react-native-image-base64';

import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';

export default function SelectImage({
  bottomSheetRef,
  bottomSheetCloseViewRef,
  setImage,
  setFileResponse,
  setFile,
}) {
  const closeBottomTab = () => {
    bottomSheetRef.current.close();
    bottomSheetCloseViewRef?.current?.setNativeProps({display: 'none'});
  };

  const pickPicture = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.4,
    }).then(image => {
      handleConvertImageToBase64(image?.path);

      setImage({uri: image?.path});
    });
  };

  const handleConvertImageToBase64 = imgURI => {
    // const imagePath = 'path_to_your_image.jpg'; // Replace this with the path to your image

    const imagePath = imgURI;
    RNImageToBase64.getBase64String(imagePath)
      .then(base64String => {
        // setBase64Image(base64String);
        setFile(`data:image/png;base64,{${base64String}}`);
      })
      .catch(err => console.log(err));
  };
  return (
    <View style={styles.contentContainer}>
      <View style={styles.center}>
        <TouchableOpacity
          onPress={() => {
            // handleDocumentSelection();
            pickPicture();
            closeBottomTab();
          }}>
          <View style={[styles.buttons, styles.center]}>
            <MaterialCommunityIcons
              size={25}
              name={'folder-image'}
              color={'gray'}></MaterialCommunityIcons>
          </View>
        </TouchableOpacity>
        <Text>upload</Text>
      </View>
      <View style={styles.center}>
        <TouchableOpacity
          onPress={() => {
            setFileResponse([]);
            setImage(DEFAULT_PROFILE_IMAGE);
            closeBottomTab();
          }}>
          <View style={[styles.buttons, styles.center]}>
            <MaterialCommunityIcons
              size={25}
              name={'delete'}
              color={'gray'}></MaterialCommunityIcons>
          </View>
        </TouchableOpacity>
        <Text>Remove</Text>
      </View>
      <View style={styles.center}>
        <TouchableOpacity onPress={() => closeBottomTab()}>
          <View style={[styles.buttons, styles.center]}>
            <AntDesign size={25} name={'close'} color={'gray'}></AntDesign>
          </View>
        </TouchableOpacity>
        <Text>Cancel</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttons: {
    width: 50,
    height: 50,
    backgroundColor: creamBackground,
    borderRadius: 50,
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
