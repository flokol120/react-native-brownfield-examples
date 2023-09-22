import React from 'react';
import {SafeAreaView} from 'react-native';
import {NetworkProvider} from 'react-native-offline';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from '../redux';

export const withReduxComponent =
  (Component: React.ComponentType<any>): React.FC<any> =>
  (props: any) => (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...props} />
      </PersistGate>
    </Provider>
  );

export const withNetworkProviderComponent =
  (Component: React.ComponentType<any>): React.FC<any> =>
  (props: any) => (
    <NetworkProvider>
      <Component {...props} />
    </NetworkProvider>
  );

export const withSafeAreaComponent =
  (Component: React.ComponentType<any>): React.FC<any> =>
  (props: any) => (
    <SafeAreaView>
      <Component {...props} />
    </SafeAreaView>
  );

export const withDefaultProvider =
  (Component: React.ComponentType<any>): React.FC<any> =>
  (props: any) => {
    return withReduxComponent(
      withNetworkProviderComponent(withSafeAreaComponent(Component)),
    )(props);
  };
