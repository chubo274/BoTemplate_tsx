import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { DeviceEventEmitter, View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { EmitType } from 'src/shared/helpers/constant';
import NavigationService from '../shared/helpers/NavigationService';
import { configureLocalization } from '../shared/localization';
import RootNavigator from './navigations/RootNavigator';
import { persistor, store } from './redux/store';

export const appState = {
  readyForAuth: false,
};

const App = () => {
  const subscription = DeviceEventEmitter.addListener(EmitType.AppReadyForAuth, () => {
    appState.readyForAuth = true;
  });

  useEffect(() => {
    configureLocalization('vn');
    return () => {
      subscription?.remove();
    }
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer ref={(ref: NavigationContainerRef<any>) =>
          NavigationService.setTopLevelNavigator(ref)}>
          <View style={{ flex: 1 }}>
            <RootNavigator />
            {/* <MessageAlert /> */}
            {/* <Toast position={'bottom'} config={toastConfig} /> */}
          </View>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;