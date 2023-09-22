import {View, Text, StyleSheet, StyleProp, TextStyle} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import {IconSource} from 'react-native-paper/lib/typescript/components/Icon';

type inputType = {
  onChangeText?: (((text: string) => void) & Function) | undefined;
  value?: string;
  label?: string;
  leftIcon?: IconSource;
  style?: StyleProp<TextStyle>;
  onFocus?: () => void;
};

export default function Input({
  value,
  onChangeText,
  label,
  leftIcon,
  style,
  onFocus,
}: inputType) {
  return (
    <TextInput
      accessibilityIgnoresInvertColors={false}
      //   mode="outlined"
      onFocus={onFocus}
      label={label}
      style={[styles.input]}
      value={value}
      left={leftIcon && <TextInput.Icon icon={leftIcon} />}
      onChangeText={onChangeText}
      contentStyle={style}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginVertical: 5,
  },
});
