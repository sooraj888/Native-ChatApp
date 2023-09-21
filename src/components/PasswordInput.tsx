import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';

// const
type passwordInputType = {
  onChangeText?: (((text: string) => void) & Function) | undefined;
  value?: string;
  label?: string;
};

export default function PasswordInput({
  value,
  onChangeText,
  label,
}: passwordInputType) {
  const [isSecuredText, setIsSecuredText] = useState(true);
  return (
    <TextInput
      // mode="outlined"
      label={'Confirm Password'}
      style={[styles.input]}
      value={value}
      left={<TextInput.Icon icon={'lock'} />}
      right={
        <TextInput.Icon
          icon={isSecuredText ? 'eye' : 'eye-off'}
          onPress={() => setIsSecuredText(prev => !prev)}
        />
      }
      secureTextEntry={isSecuredText}
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
