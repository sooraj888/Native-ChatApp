/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import Navigation from './routes/Navigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import 'react-native-gesture-handler';
import {PaperProvider} from 'react-native-paper';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {NavigationContainer} from '@react-navigation/native';
import ContextData from './context/ContextData';
function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <BottomSheetModalProvider>
          <PaperProvider>
            <ContextData>
              <Navigation />
            </ContextData>
          </PaperProvider>
        </BottomSheetModalProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;

// import React, {useCallback, useMemo, useRef} from 'react';
// import {View, Text, StyleSheet} from 'react-native';
// import BottomSheet from '@gorhom/bottom-sheet';
// import {GestureHandlerRootView} from 'react-native-gesture-handler';

// const App = () => {
//   // ref
//   const bottomSheetRef = useRef<BottomSheet>(null);

//   // variables
//   const snapPoints = useMemo(() => ['25%', '50%'], []);

//   // callbacks
//   const handleSheetChanges = useCallback((index: number) => {
//
//   }, []);

//   // renders
//   return (
//     <GestureHandlerRootView style={{flex: 1}}>
//       <View style={styles.container}>
//         <BottomSheet
//           ref={bottomSheetRef}
//           index={1}
//           snapPoints={snapPoints}
//           onChange={handleSheetChanges}>
//           <View style={styles.contentContainer}>
//             <Text>Awesome 🎉</Text>
//           </View>
//         </BottomSheet>
//       </View>
//     </GestureHandlerRootView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 24,
//     backgroundColor: 'red',
//   },
//   contentContainer: {
//     flex: 1,
//     alignItems: 'center',
//   },
// });

// export default App;
