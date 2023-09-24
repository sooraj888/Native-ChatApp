/**
 * @format
 */
import 'react-native-gesture-handler';

import {AppRegistry, StatusBar, Text} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
// import store from './src/redux/store';
import {Provider} from 'react-redux';
// const App
const AppRedux = () => {
  return (
    // <Provider store={store}>
    <>
      {/* <StatusBar
        hidden={true}
        // barStyle={'dark-content'}
        translucent={true}
        backgroundColor={'rgba(0,0,0,0)'}
      /> */}
      <App />
    </>
    // </Provider>
  );
};

AppRegistry.registerComponent(appName, () => AppRedux);
