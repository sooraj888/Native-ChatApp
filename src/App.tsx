/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {Children} from 'react';

import {SafeAreaView, Text} from 'react-native';
import Navigation from './routes/Navigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import 'react-native-gesture-handler';

function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Navigation />
    </GestureHandlerRootView>
  );
}

export default App;
