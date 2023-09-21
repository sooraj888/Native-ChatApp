import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import {IconSource} from 'react-native-paper/lib/typescript/components/Icon';

type inputType = {
  onChangeText?: (((text: string) => void) & Function) | undefined;
  value?: string;
  label?: string;
  leftIcon?: IconSource;
};

export default function Input({
  value,
  onChangeText,
  label,
  leftIcon,
}: inputType) {
  return (
    <TextInput
      accessibilityIgnoresInvertColors={false}
      //   mode="outlined"
      label={label}
      style={[styles.input]}
      value={value}
      left={leftIcon && <TextInput.Icon icon={leftIcon} />}
      onChangeText={onChangeText}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginVertical: 5,
  },
});
