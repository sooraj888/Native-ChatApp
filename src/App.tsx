/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {Children} from 'react';

import {SafeAreaView, Text} from 'react-native';
import Navigation from './routes/Navigation';

function App(): JSX.Element {
  return <Navigation />;
}

export default App;
